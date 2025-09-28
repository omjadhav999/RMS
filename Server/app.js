import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import adminRoutes from './routes/adminRoute.js';
import userRoutes from './routes/userRoute.js';
import StudentRoutes from "./routes/studentRoute.js"

dotenv.config();

// Initialize express app
const app = express();

// Dynamic CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, etc.)
        if (!origin) return callback(null, true);
        
        // List of allowed origins
        const allowedOrigins = [
            'http://localhost:5173',           // Local development
            'http://localhost:3000',           // Alternative local port
            'https://rms-sand-eight.vercel.app' // Your Vercel deployment
        ];
        
        // Allow any vercel.app domain for preview deployments
        const isVercelDomain = origin.endsWith('.vercel.app');
        
        if (allowedOrigins.includes(origin) || isVercelDomain) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // Parse incoming JSON data

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/student', StudentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal server error', 
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong' 
    });
});

export default app;