const transactionService = require("../services/transactionService");

const createTransaction = async (req, res, next) => {
  try {
    const newTransaction = await transactionService.createTransaction(req.body, req.user.id);
    res.status(201).send(newTransaction);
  } catch (error) {
    next(error);
  }
};

const getAllTransactions = async (req, res, next) => {
  try {
    const AllTransactions = await transactionService.getAllTransactions(req.user.id, req.query);
    res.send(AllTransactions);
  } catch (error) {
    next(error);
  }
};

const getTransaction = async (req, res, next) => {
  try {
    const transaction = await transactionService.getTransactionById(req.params.id, req.user.id);
    res.send(transaction);
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const updatedTransaction = await transactionService.updateTransaction(
      req.params.id,
      req.body,
      req.user.id
    );
    res.send(updatedTransaction);
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const deletedTransaction = await transactionService.deleteTransaction(
      req.params.id,
      req.user.id
    );
    res.send(deletedTransaction);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
};
