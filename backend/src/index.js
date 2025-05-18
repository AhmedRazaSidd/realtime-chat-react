import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import { app, server } from './lib/socket.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

// Database Connection
(async () => {
    try {
        await connectDB();

        // Middleware
        app.use(express.json({ limit: "5mb" }));
        app.use(express.urlencoded({ limit: "5mb", extended: true }));  
        app.use(cookieParser());
        app.use(cors({
            origin: process.env.FRONTEND_URL || 'https://realtime-chat-react.vercel.app',
            credentials: true,
        }));

        // Routes
        app.use('/api/auth', authRoutes);
        app.use('/api/messages', messageRoutes);

        // Server Start
        server.listen(PORT, () => {
            console.log('====================================');
            console.log(`Server is Running on Port ${PORT}`);
            console.log('====================================');
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
})();
