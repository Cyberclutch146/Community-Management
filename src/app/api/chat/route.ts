import { NextResponse } from "next/server";
import {
  getAllEvents,
  getDonationGuidance,
  getGeneralHelp,
  getOrganizeGuidance,
  getUnknownReply,
  getVolunteerGuidance,
  formatEventList,
} from "@/services/aiTools";

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages || [];
    const latestMessage =
      messages[messages.length - 1]?.content?.toLowerCase?.().trim() || "";

    let reply = getGeneralHelp();

    const events = await getAllEvents();

    const wantsEvents = includesAny(latestMessage, [
      "event",
      "events",
      "show me events",
      "upcoming",
      "discover",
      "find events",
      "nearby events",
    ]);

    const wantsVolunteer = includesAny(latestMessage, [
      "volunteer",
      "help out",
      "join",
      "join event",
      "i want to help",
      "support physically",
    ]);

    const wantsDonate = includesAny(latestMessage, [
      "donate",
      "donation",
      "fund",
      "contribute",
      "give money",
      "support financially",
    ]);

    const wantsOrganize = includesAny(latestMessage, [
      "organize",
      "create event",
      "host event",
      "start event",
      "make event",
      "plan event",
      "set up event",
    ]);

    const wantsHow = includesAny(latestMessage, [
      "how",
      "how do i",
      "what can i do",
      "help me",
      "guide me",
    ]);

    if (wantsOrganize) {
      reply = getOrganizeGuidance();
    } else if (wantsDonate && wantsHow) {
      reply = getDonationGuidance(events);
    } else if (wantsVolunteer && wantsHow) {
      reply = getVolunteerGuidance(events);
    } else if (wantsDonate) {
      reply = [
        "These are some events you may be able to support:",
        formatEventList(events, 3),
        "To donate, open an event and use the donation panel on its details page."
      ].join("\n");
    } else if (wantsVolunteer) {
      reply = [
        "Here are some events where you can potentially volunteer:",
        formatEventList(events, 3),
        "Open any event to view details and check how you can support it."
      ].join("\n");
    } else if (wantsEvents) {
      reply = [
        "Here are some current events on the platform:",
        formatEventList(events, 3),
        "You can open any of them to view details, donate, or join."
      ].join("\n");
    } else if (wantsHow) {
      reply = getGeneralHelp();
    } else {
      reply = getUnknownReply();
    }

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong while generating a response." },
      { status: 500 }
    );
  }
}
