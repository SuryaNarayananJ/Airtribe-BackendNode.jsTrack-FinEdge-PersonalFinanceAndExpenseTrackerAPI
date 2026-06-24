const budgetService = require("../services/budgetService");

const createBudget = async (req, res, next) => {
  try {
    const newBudget = await budgetService.createBudget(req.body, req.user.id);
    res.send(newBudget);
  } catch (error) {
    next(error);
  }
};

const getSummary = async (req, res, next) => {
  try {
    const summary = await budgetService.getSummary(req.user.id);
    res.json({
      status: "success",
      data: summary
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBudget,
  getSummary
};
