import mongoose from "mongoose";

const stationSchema = new mongoose.Schema({
  station_id: { type: Number, required: true, unique: true },
  station_name: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
});

export default mongoose.model("Station", stationSchema);
