import Station from "../models/station.js";
import Train from "../models/train.js";

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

export const getTrainsByStationId = async (req, res) => {
  const { station_id } = req.params;

  try {
    const station = await Station.findOne({ station_id });
    if (!station) {
      return res
        .status(404)
        .json({ message: `station with id: ${station_id} was not found` });
    }

    const trains = await Train.find({ "stops.station_id": station_id });

    trains.sort((a, b) => {
      const aStop = a.stops.find(
        (stop) => stop.station_id === parseInt(station_id)
      );
      const bStop = b.stops.find(
        (stop) => stop.station_id === parseInt(station_id)
      );

      // Sort by departure time (ascending order)
      if (aStop.departure_time === null && bStop.departure_time === null) {
        // If both have null departure times, sort by arrival time (ascending order)
        return (aStop.arrival_time || "").localeCompare(
          bStop.arrival_time || ""
        );
      } else if (aStop.departure_time === null) {
        // If only a has null departure time, it should come before b
        return -1;
      } else if (bStop.departure_time === null) {
        // If only b has null departure time, it should come before a
        return 1;
      } else {
        // Sort by departure time (ascending order)
        const departureComparison = (aStop.departure_time || "").localeCompare(
          bStop.departure_time || ""
        );
        if (departureComparison !== 0) {
          return departureComparison;
        }
        // If departure times are equal, sort by arrival time (ascending order)
        return (aStop.arrival_time || "").localeCompare(
          bStop.arrival_time || ""
        );
      }
    });

    // Format the response
    const formattedTrains = trains.map((train) => {
      const stop = train.stops.find(
        (stop) => stop.station_id === parseInt(station_id)
      );
      return {
        train_id: train.train_id,
        arrival_time: stop.arrival_time,
        departure_time: stop.departure_time,
      };
    });

    res
      .status(200)
      .json({ station_id: parseInt(station_id), trains: formattedTrains });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
