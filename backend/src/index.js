import express from 'express';
import dotenv from 'dotenv';
import cookiesParser from 'cookie-parser';
import cors from 'cors';

// import path from 'path'

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import { app, server } from './lib/socket.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

(async () => {
    try {
        // Connect to the Database
        await connectDB();
        // Middleware
        app.use(express.json({ limit: "5mb" }));
        app.use(express.urlencoded({ limit: "5mb", extended: true }));
        app.use(cookiesParser());
        app.use(cors({
            origin: 'https://realtime-chat-react.vercel.app',
            credentials: true,
        }));


        // Routes
        app.use('/api/auth', authRoutes);
        app.use('/api/messages', messageRoutes);

        // if (process.env.NODE_ENV==='production') {
        //     app.use(express.static(path.json(__dirname,'../frontend/public/dist')));

        //     app.get('*',(req,res)=>{
        //         res.sendFile(path.join(__dirname,'../frontend/public','dist','index.html'));
        //     })
        // }

        // Start Server
        server.listen(PORT, async () => {
            console.log('====================================');
            console.log(`Server is Running on Port ${PORT}`);
            console.log('====================================');
        });

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
})();