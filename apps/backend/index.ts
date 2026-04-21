import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Auth Mock
app.post('/api/signup', (req: Request, res: Response) => {
  res.json({ message: "Signup successful (skeleton)", user: req.body });
});

app.post('/api/login', (req: Request, res: Response) => {
  res.json({ message: "Login successful (skeleton)", token: "mock-jwt-token" });
});

// Events Mock
app.get('/api/events', (req: Request, res: Response) => {
  res.json([
    {
      id: "1",
      title: "Food Drive - Downtown",
      description: "Gathering essential supplies for local shelters.",
      location: { lat: 34.0522, lng: -118.2437 },
      progress: 65,
      needs: ["Canned Goods", "Dry Pasta", "Volunteers"]
    },
    {
      id: "2",
      title: "Medical Camp - Harbor",
      description: "Providing basic health checkups for the community.",
      location: { lat: 33.7743, lng: -118.1937 },
      progress: 40,
      needs: ["First Aid Kits", "Masks", "Medical Volunteers"]
    }
  ]);
});

app.post('/api/events', (req: Request, res: Response) => {
  res.json({ message: "Event created (skeleton)", event: req.body });
});

// Donations Mock
app.post('/api/donate', (req: Request, res: Response) => {
  res.json({ message: "Donation received (skeleton)", donation: req.body });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
