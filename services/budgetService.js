const budgetsModel = require("../models/budgetsModel");
const transactionsModel = require("../models/transactionsModel");
const cacheService = require("../services/cacheService");

const createBudget = async (budget, userId) => {
  budget.user = userId;
  return await budgetsModel.create(budget);
};

const getSummary = async (userId) => {
  const cacheKey = `summary_${userId}`;
  const cachedSummary = cacheService.get(cacheKey);

  if (cachedSummary) {
    console.log("CACHE HIT");
    return cachedSummary;
  }

  console.log("CACHE MISS");
  const budgets = await budgetsModel.find({ user: userId });
  const transactions = await transactionsModel.find({ user: userId });
  
  const transactionSummary = {};
  
  transactions.forEach(t => {
    const d = new Date(t.date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const monthYear = `${year}-${month}`;
    
    if (!transactionSummary[monthYear]) {
      transactionSummary[monthYear] = { income: 0, expenses: 0 };
    }
    
    if (t.type === 'income') {
      transactionSummary[monthYear].income += t.amount;
    } else if (t.type === 'expense') {
      transactionSummary[monthYear].expenses += t.amount;
    }
  });
  
  const summaryData = budgets.map(b => {
    const m_y = b.month_year;
    const actual_income = transactionSummary[m_y] ? transactionSummary[m_y].income : 0;
    const actual_expenses = transactionSummary[m_y] ? transactionSummary[m_y].expenses : 0;
    
    return {
      month_year: m_y,
      income_goal: b.monthly_goal,
      actual_income: actual_income,
      actual_expenses: actual_expenses,
      saving_target: b.saving_target,
      actual_saving: actual_income - actual_expenses
    };
  });
  
  cacheService.set(cacheKey, summaryData, 60); // TTL 60 seconds
  return summaryData;
};

module.exports = {
  createBudget,
  getSummary
};
