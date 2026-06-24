const transactionsModel = require("../models/transactionsModel");

const createTransaction = async (transaction, userId) => {
  transaction.user = userId;
  return await transactionsModel.create(transaction);
};

const getAllTransactions = async (userId, queryParams) => {
  const filter = { user: userId };
  
  if (queryParams.category) {
    filter.category = queryParams.category;
  }
  
  if (queryParams.startDate || queryParams.endDate) {
    filter.date = {};
    if (queryParams.startDate) filter.date.$gte = new Date(queryParams.startDate);
    if (queryParams.endDate) filter.date.$lte = new Date(queryParams.endDate);
  }

  return await transactionsModel.find(filter).sort({ date: -1 });
};

const getTransactionById = async (id, userId) => {
  return await transactionsModel.findOne({ _id: id, user: userId });
};

const updateTransaction = async (id, updateData, userId) => {
  return await transactionsModel.findOneAndUpdate({ _id: id, user: userId }, updateData, { new: true });
};

const deleteTransaction = async (id, userId) => {
  return await transactionsModel.findOneAndDelete({ _id: id, user: userId });
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
