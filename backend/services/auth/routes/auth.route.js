import express from "express";
import { addCoins, login, logout, me, useInterviewCoins } from '../controllers/auth.controller.js';




const authRouter = express.Router();

authRouter.post("/login",login);

authRouter.get('/me', me);

authRouter.get("/logout",logout)

authRouter.post("/add-coins",addCoins)

authRouter.post(
  "/use-coins",
  useInterviewCoins
);

export default authRouter;
