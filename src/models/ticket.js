import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  ticket_id: { type: Number, required: true, unique: true },
  wallet_id: { type: Number, required: true },
  stations: [
    {
      station_id: { type: Number, required: true },
      train_id: { type: Number, required: true },
      arrival_time: { type: String },
      departure_time: { type: String },
    },
  ],
  balance: { type: Number, required: true },
});

export default mongoose.model("Ticket", ticketSchema);
