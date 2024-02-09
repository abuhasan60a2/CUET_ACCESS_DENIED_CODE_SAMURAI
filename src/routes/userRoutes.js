// src/routes/userRoutes.js
import express from "express";
import { addUser } from "../controllers/useController.js";

const router = express.Router();

router.post("/", addUser);

export default router;
