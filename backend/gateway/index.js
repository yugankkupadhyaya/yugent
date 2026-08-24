import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { clerkClient, clerkMiddleware } from '@clerk/express';

import { isAuth } from './middleware/isAuth.js';
import { proxyWithHeaders } from './utils/proxyWithHeaders.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Clerk must run before isAuth / protected routes
app.use(clerkMiddleware());

app.use(morgan('dev'));
app.use(cookieParser());

const PORT = process.env.PORT || 6000;

app.get('/', (req, res) => {
  res.send('Hello from Gateway');
});

const addClerkIdentity = async (req, res, next) => {
  try {
    const clerkUser = await clerkClient.users.getUser(req.userId);
    req.clerkIdentity = {
      email:
        clerkUser.emailAddresses?.find(
          (address) => address.id === clerkUser.primaryEmailAddressId
        )?.emailAddress || clerkUser.emailAddresses?.[0]?.emailAddress || '',
      name: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' '),
    };
    next();
  } catch (error) {
    console.error('Unable to load Clerk user profile:', error?.message || error);
    res.status(401).json({ success: false, message: 'Unable to authenticate user.' });
  }
};

app.use('/api/auth', isAuth, addClerkIdentity, proxyWithHeaders(process.env.AUTH_SERVICE_URL));
// Protected routes
app.use('/api/resume', isAuth, proxyWithHeaders(process.env.RESUME_SERVICE_URL));

app.use('/api/interview', isAuth, proxyWithHeaders(process.env.INTERVIEW_SERVICE_URL));

app.use('/api/roadmap', isAuth, proxyWithHeaders(process.env.ROADMAP_SERVICE_URL));

app.use('/api/billing', isAuth, proxyWithHeaders(process.env.BILLING_SERVICE_URL));

app.get(
  '/api/me',
  isAuth,
  addClerkIdentity,
  proxyWithHeaders(process.env.AUTH_SERVICE_URL, () => '/me')
);

app.listen(PORT, () => {
  console.log(`Gateway Started on ${PORT}`);
});
