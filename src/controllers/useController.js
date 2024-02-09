import User from "../models/user.js";

export const addUser = async (req, res) => {
  try {
    const { user_id, user_name, balance } = req.body;
    const user = new User({ user_id, user_name, balance });
    await user.save();
    res.status(201).json({ user_id, user_name, balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
