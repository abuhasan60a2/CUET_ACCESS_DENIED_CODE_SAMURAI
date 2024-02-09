import express from "express";
import {
  getWalletBalance,
  addWalletBalance,
} from "../controllers/walletController.js";

const router = express.Router();

router.get("/:wallet_id", getWalletBalance);
router.put("/:wallet_id", addWalletBalance);

export default router;
