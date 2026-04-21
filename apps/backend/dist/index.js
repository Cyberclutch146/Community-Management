"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Auth Mock
app.post('/api/signup', (req, res) => {
    res.json({ message: "Signup successful (skeleton)", user: req.body });
});
app.post('/api/login', (req, res) => {
    res.json({ message: "Login successful (skeleton)", token: "mock-jwt-token" });
});
// Events Mock
app.get('/api/events', (req, res) => {
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
app.post('/api/events', (req, res) => {
    res.json({ message: "Event created (skeleton)", event: req.body });
});
// Donations Mock
app.post('/api/donate', (req, res) => {
    res.json({ message: "Donation received (skeleton)", donation: req.body });
});
app.get('/api/health', (req, res) => {
    res.status(200).send('OK');
});
app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
