import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";
import { sendEmail } from "@/services/emailService";
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
const firestoreDb: any = require("../../../../config/firebase");

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const message = formData.get("message") as string;
    const campaignId = formData.get("campaignId") as string;
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "CSV file required" }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 🚀 Robust CSV Parsing with PapaParse (Handles BOM, Encoding, Delimiters automatically)
    const text = await file.text();
    const emails: string[] = [];
    
    console.log('API: Processing file:', file.name, 'Size:', file.size);

    const parsedData = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.toLowerCase().trim()
    });

    console.log("API: PapaParse Output Metadata:", parsedData.meta);
    console.log("API: First Row Parsed:", parsedData.data[0]);

    if (parsedData.errors.length > 0) {
      console.warn("API: PapaParse found issues:", parsedData.errors);
    }

    parsedData.data.forEach((row: any) => {
      // 🔍 Find the email column no matter what it's called
      const emailValue = row.email || row['email address'] || row.address || row['email_address'] || row.contact;
      
      if (emailValue) {
        const trimmedEmail = String(emailValue).trim();
        if (isValidEmail(trimmedEmail)) {
          emails.push(trimmedEmail);
        } else {
          console.log("API: Skipped invalid email format:", trimmedEmail);
        }
      }
    });

    if (emails.length === 0) {
      return NextResponse.json({ 
        error: "No valid emails found in CSV",
        debug: {
          headersSeen: parsedData.meta.fields,
          firstRowSeen: parsedData.data[0],
          errors: parsedData.errors
        }
      }, { status: 400 });
    }

    // 🚀 Send emails in parallel and log each one individually
    const results = await Promise.allSettled(
      emails.map(async (email) => {
        try {
          await sendEmail(email, message);
          
          try {
            await firestoreDb.collection("promotion_logs").add({
              campaignId: campaignId || "unknown",
              email,
              status: "sent",
              createdAt: new Date()
            });
          } catch (logErr) {
            console.error(`Failed to log success for ${email}:`, logErr);
          }
          
          return email;
        } catch (error: any) {
          try {
            await firestoreDb.collection("promotion_logs").add({
              campaignId: campaignId || "unknown",
              email,
              status: "failed",
              error: error.message || "Unknown error",
              createdAt: new Date()
            });
          } catch (logErr) {
            console.error(`Failed to log error for ${email}:`, logErr);
          }
          throw error;
        }
      })
    );

    const success = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    // 🔥 Save master summary log in Firestore
    try {
      await firestoreDb.collection("promotions").add({
        campaignId: campaignId || "unknown",
        total: emails.length,
        success,
        failed,
        message,
        createdAt: new Date()
      });
      console.log('API: Master log saved to Firestore successfully.');
    } catch (dbErr) {
      console.error("Failed to save master log to Firestore:", dbErr);
    }

    return NextResponse.json({
      total: emails.length,
      success,
      failed
    });

  } catch (err: any) {
    console.error("Promotion API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
