const analyticsService = require("../services/analyticsService");

const getBalance = async (req, res, next) => {
  try {
    const balanceData = await analyticsService.getBalance(req.user.id);
    res.json({ status: "success", data: balanceData });
  } catch (error) {
    next(error);
  }
};

const getTips = async (req, res, next) => {
  try {
    const tipData = await analyticsService.getTips(req.user.id);
    res.json({ status: "success", data: tipData });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBalance,
  getTips
};
