// src/routes/stationRoutes.js
import express from "express";
import {
  addStation,
  getAllStations,
} from "../controllers/stationController.js";

const router = express.Router();

router.post("/", addStation);
router.get("/", getAllStations);

export default router;
