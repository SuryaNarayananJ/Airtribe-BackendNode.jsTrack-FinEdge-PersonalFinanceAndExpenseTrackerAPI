const calculateBalance = (transactions) => {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((t) => {
    if (t.type === 'income') {
      totalIncome += t.amount;
    } else if (t.type === 'expense') {
      totalExpense += t.amount;
    }
  });

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense
  };
};

module.exports = {
  calculateBalance
};
