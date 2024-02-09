import User from "../models/user.js";
import Train from "../models/train.js";
import Ticket from "../models/ticket.js";

export const purchaseTicket = async (req, res) => {
  const { wallet_id, time_after, station_from, station_to } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ user_id: wallet_id });
    if (!user) {
      return res
        .status(404)
        .json({ message: `wallet with id: ${wallet_id} was not found` });
    }

    // Find trains passing through station_from
    const trainsFrom = await Train.find({ "stops.station_id": station_from });

    // Find trains passing through station_to
    const trainsTo = await Train.find({ "stops.station_id": station_to });

    // Combine the trains passing through both start and destination stations
    const allTrains = [...trainsFrom, ...trainsTo];

    // Remove duplicates (if any)
    const uniqueTrains = Array.from(
      new Set(allTrains.map((train) => train._id))
    ).map((trainId) => {
      return allTrains.find((train) => train._id === trainId);
    });

    console.log(uniqueTrains);

    // Check if there are any trains available between station_from and station_to
    if (uniqueTrains.length === 0) {
      return res.status(403).json({
        message: `no ticket available for station: ${station_from} to station: ${station_to}`,
      });
    }

    // Calculate ticket cost
    let ticketCost = 0;
    uniqueTrains.forEach((train) => {
      const startIndex = train.stops.findIndex(
        (stop) => stop.station_id === station_from
      );
      const endIndex = train.stops.findIndex(
        (stop) => stop.station_id === station_to
      );
      for (let i = startIndex; i < endIndex; i++) {
        ticketCost += train.stops[i].fare;
      }
    });

    // Check if user has sufficient balance
    if (user.balance < ticketCost) {
      const shortageAmount = ticketCost - user.balance;
      return res.status(402).json({
        message: `recharge amount: ${shortageAmount} to purchase the ticket`,
      });
    }

    // Deduct ticket cost from user's balance
    user.balance -= ticketCost;
    await user.save();

    // Generate ticket response
    const stations = [];
    uniqueTrains.forEach((train) => {
      const startIndex = train.stops.findIndex(
        (stop) => stop.station_id === station_from
      );
      const endIndex = train.stops.findIndex(
        (stop) => stop.station_id === station_to
      );
      stations.push(...train.stops.slice(startIndex, endIndex + 1));
    });
    const ticketId = (await Ticket.countDocuments()) + 1;

    const ticket = new Ticket({
      ticket_id: ticketId,
      wallet_id,
      balance: user.balance,
      stations,
    });
    await ticket.save();

    res.status(201).json({
      ticket_id: ticketId,
      balance: user.balance,
      wallet_id,
      stations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
