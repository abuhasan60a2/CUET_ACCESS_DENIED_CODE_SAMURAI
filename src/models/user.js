import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  user_name: { type: String, required: true },
  balance: { type: Number, required: true },
});

export default mongoose.model("User", userSchema);
