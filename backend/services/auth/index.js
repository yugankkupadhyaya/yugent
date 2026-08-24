import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { connectDb } from './configs/db.js';
import authRouter from './routes/auth.route.js';

const app = express();

app.use(express.json());

app.use(cookieParser());

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.use((req, res, next) => {
  if (
    !process.env.AUTH_SERVICE_SECRET ||
    req.headers['x-gateway-auth'] !== process.env.AUTH_SERVICE_SECRET
  ) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
});

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
