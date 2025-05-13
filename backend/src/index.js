import express from 'express';
import dotenv from 'dotenv';
import cookiesParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import messageRotues from './routes/message.route.js';
import { connectDB } from './lib/db.js';


dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookiesParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/auth', messageRotues);

app.listen(PORT, () => {
    console.log('====================================');
    console.log(`Server is Running on Port ${PORT}`);
    console.log('====================================');
    connectDB();
})