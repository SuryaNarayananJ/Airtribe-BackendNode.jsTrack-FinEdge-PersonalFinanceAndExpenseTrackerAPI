const transactionService = require("../services/transactionService");
const { calculateBalance } = require("../utils/analytics");
const { generateSavingTips } = require("../utils/aiHelper");

const getBalance = async (userId) => {
  // Pass userId and empty queryParams to the updated transactionService
  const transactions = await transactionService.getAllTransactions(userId, {});
  return calculateBalance(transactions);
};

const getTips = async (userId) => {
  const transactions = await transactionService.getAllTransactions(userId, {});
  const tip = generateSavingTips(transactions);
  return { tip };
};

module.exports = {
  getBalance,
  getTips
};
