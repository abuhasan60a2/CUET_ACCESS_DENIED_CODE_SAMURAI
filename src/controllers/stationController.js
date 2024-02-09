import Station from "../models/station.js";

export const addStation = async (req, res) => {
  try {
    const { station_id, station_name, longitude, latitude } = req.body;
    const station = new Station({
      station_id,
      station_name,
      longitude,
      latitude,
    });
    await station.save();
    res.status(201).json({ station_id, station_name, longitude, latitude });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
