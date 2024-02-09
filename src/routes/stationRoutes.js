// src/routes/stationRoutes.js
import express from "express";
import {
  addStation,
  getAllStations,
  getTrainsByStationId,
} from "../controllers/stationController.js";

const router = express.Router();

router.post("/", addStation);
router.get("/", getAllStations);
router.get("/:station_id/trains", getTrainsByStationId);

export default router;
