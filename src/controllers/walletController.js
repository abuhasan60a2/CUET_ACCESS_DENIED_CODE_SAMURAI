import User from "../models/user.js";

export const addWalletBalance = async (req, res) => {
  const { wallet_id } = req.params;
  const { recharge } = req.body;

  try {
    const user = await User.findOne({ user_id: wallet_id });
    if (!user) {
      return res
        .status(404)
        .json({ message: `wallet with id: ${wallet_id} was not found` });
    }

    if (recharge < 100 || recharge > 10000) {
      return res.status(400).json({ message: `invalid amount: ${recharge}` });
    }

    // Update balance
    user.balance += recharge;
    await user.save();

    res.status(200).json({
      wallet_id: user.user_id,
      balance: user.balance,
      wallet_user: {
        user_id: user.user_id,
        user_name: user.user_name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getWalletBalance = async (req, res) => {
  const { wallet_id } = req.params;

  try {
    const user = await User.findOne({ user_id: wallet_id });
    if (!user) {
      return res
        .status(404)
        .json({ message: `wallet with id: ${wallet_id} was not found` });
    }

    res.status(200).json({
      wallet_id: user.user_id,
      balance: user.balance,
      wallet_user: {
        user_id: user.user_id,
        user_name: user.user_name,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
