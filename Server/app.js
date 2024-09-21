import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import adminRoutes from './routes/adminRoute.js';
import userRoutes from './routes/userRoute.js';
import StudentRoutes from "./routes/studentRoute.js"

dotenv.config();

// Initialize express app
const app = express();


app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
  }));

// Middleware
app.use(express.json()); // Parse incoming JSON data

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/student', StudentRoutes);

export default app;
