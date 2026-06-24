const AppError = require('../utils/AppError');

const validateTransaction = (req, res, next) => {
  const { type, category, amount, date } = req.body;

  if (!type || !['income', 'expense'].includes(type)) {
    return next(new AppError('Invalid or missing type. Must be "income" or "expense".', 400));
  }

  if (!category || typeof category !== 'string' || category.trim() === '') {
    return next(new AppError('Invalid or missing category.', 400));
  }

  if (amount === undefined || isNaN(amount) || amount <= 0) {
    return next(new AppError('Invalid amount. Must be a positive number.', 400));
  }

  if (!date || isNaN(Date.parse(date))) {
    return next(new AppError('Invalid date format. Provide a valid ISO date string.', 400));
  }

  next();
};

module.exports = {
  validateTransaction
};
