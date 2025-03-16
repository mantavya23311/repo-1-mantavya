// Calculate total income and total expense
export function calculateInsights(transactions) {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
  
    const totalExpense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
  
    return { totalIncome, totalExpense };
  }
  