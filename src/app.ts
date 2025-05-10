// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import authRoutes from './routes/auth'; // 👈 import auth routes

import { connectToDynamoDB } from './config/dynamodb';
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('My Sports Manager Backend is Running!');
});

const PORT = process.env.PORT || 5000;

// Only connect to DynamoDB
connectToDynamoDB()
  .then(() => {
    console.log('✅ Connected to DynamoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to DynamoDB:', err);
    process.exit(1);
  });

// Auth routes
app.use('/api/auth', authRoutes);
