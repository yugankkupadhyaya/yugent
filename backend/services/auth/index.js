import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDb } from './configs/db.js';
import dns from 'dns';
import authRouter from './routes/auth.route.js';
dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT || 6001;

app.use('/', authRouter);

const start = async () => {
  try {
    await connectDb();
  } catch {
    console.error('Auth Service shutting down: database connection failed.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Auth Service Started on ${PORT}`);
  });
};

start();
