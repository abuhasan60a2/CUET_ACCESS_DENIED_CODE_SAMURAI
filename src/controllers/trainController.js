import Train from "../models/train.js";

export const addTrain = async (req, res) => {
  try {
    const { train_id, train_name, capacity, stops } = req.body;
    const train = new Train({ train_id, train_name, capacity, stops });
    await train.save();

    let service_start = null;
    let service_ends = null;
    for (const stop of stops) {
      if (!service_start && stop.departure_time !== null) {
        service_start = stop.departure_time;
      }
      if (stop.arrival_time !== null) {
        service_ends = stop.arrival_time;
      }
    }

    res.status(201).json({
      train_id,
      train_name,
      capacity,
      service_start,
      service_ends,
      num_stations: stops.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
