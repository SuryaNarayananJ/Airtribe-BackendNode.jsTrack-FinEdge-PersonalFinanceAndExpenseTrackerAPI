const generateSavingTips = (transactions) => {
  if (!transactions || transactions.length === 0) {
    return "Start logging your transactions to get personalized saving tips!";
  }

  // Calculate total expenses by category
  const expenseByCategory = {};
  let totalExpense = 0;

  transactions.forEach((t) => {
    if (t.type === 'expense') {
      totalExpense += t.amount;
      expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;
    }
  });

  if (totalExpense === 0) {
    return "Great job keeping expenses at zero! Remember to save for a rainy day.";
  }

  // Find the category with the highest expense
  let maxCategory = '';
  let maxAmount = 0;

  for (const [category, amount] of Object.entries(expenseByCategory)) {
    if (amount > maxAmount) {
      maxAmount = amount;
      maxCategory = category;
    }
  }

  const percentage = Math.round((maxAmount / totalExpense) * 100);

  if (percentage > 40) {
    return `Smart Tip: You spent ${percentage}% of your expenses on ${maxCategory}. Consider cutting back on ${maxCategory} to increase your savings this month!`;
  }

  return "Smart Tip: Your expenses are well-distributed. Try following the 50/30/20 rule to optimize your savings!";
};

module.exports = {
  generateSavingTips
};
