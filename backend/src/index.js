import express from 'express';
import dotenv from 'dotenv';
import cookiesParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookiesParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Start Server
app.listen(PORT, () => {
    console.log('====================================');
    console.log(`Server is Running on Port ${PORT}`);
    console.log('====================================');
    connectDB();
});
