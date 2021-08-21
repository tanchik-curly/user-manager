import { Router } from "express";
import userRouter from "./user.js";

const router = Router();

userRouter(router);

export default router;
