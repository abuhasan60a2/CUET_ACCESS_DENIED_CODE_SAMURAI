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

export const getAllStations = async (req, res) => {
  try {
    const stations = await Station.find().sort({ station_id: 1 });
    if (stations.length === 0) {
      return res.status(200).json({ stations: [] });
    }
    const formattedStations = stations.map((station) => ({
      station_id: station.station_id,
      station_name: station.station_name,
      longitude: station.longitude,
      latitude: station.latitude,
    }));
    res.status(200).json({ stations: formattedStations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
