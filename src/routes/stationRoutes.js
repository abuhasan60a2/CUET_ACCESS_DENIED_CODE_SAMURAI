// src/routes/stationRoutes.js
import express from "express";
import { addStation } from "../controllers/stationController.js";

const router = express.Router();

router.post("/", addStation);

export default router;
