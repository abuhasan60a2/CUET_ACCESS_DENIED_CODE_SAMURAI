import express from "express";
import { addTrain } from "../controllers/trainController.js";

const router = express.Router();

router.post("/", addTrain);

export default router;
