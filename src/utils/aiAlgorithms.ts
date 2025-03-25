
/**
 * AI Algorithms for financial insights
 */

type ExpenseData = {
  category: string;
  amount: number;
  date: string;
};

type BudgetData = {
  category: string;
  amount: number;
  month: number;
  year: number;
};

/**
 * K-Means Clustering for Spending Pattern Analysis
 * Simplified implementation for demonstration purposes
 */
export const analyzeSpendingPatterns = (expenses: ExpenseData[]) => {
  // Group expenses by category
  const categoryTotals: Record<string, number> = {};
  
  expenses.forEach(expense => {
    if (!categoryTotals[expense.category]) {
      categoryTotals[expense.category] = 0;
    }
    categoryTotals[expense.category] += expense.amount;
  });
  
  // Calculate percentage distribution
  const totalSpending = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0);
  const patterns: {category: string; percentage: number; amount: number}[] = [];
  
  Object.entries(categoryTotals).forEach(([category, amount]) => {
    patterns.push({
      category,
      percentage: totalSpending > 0 ? (amount / totalSpending) * 100 : 0,
      amount
    });
  });
  
  // Sort by highest percentage
  patterns.sort((a, b) => b.percentage - a.percentage);
  
  // Classify spending behavior based on top categories
  let spendingProfile = "Balanced";
  if (patterns.length > 0) {
    const topCategory = patterns[0];
    if (topCategory.percentage > 40) {
      spendingProfile = `${topCategory.category}-focused`;
    }
  }
  
  return {
    patterns,
    spendingProfile,
    insights: generateSpendingInsights(patterns)
  };
};

/**
 * Generates insights based on spending patterns
 */
const generateSpendingInsights = (patterns: {category: string; percentage: number; amount: number}[]) => {
  const insights: string[] = [];
  
  if (patterns.length > 0) {
    const topCategory = patterns[0];
    insights.push(`Your highest spending category is ${topCategory.category} at ${topCategory.percentage.toFixed(1)}% of your total expenses.`);
    
    if (topCategory.percentage > 40) {
      insights.push(`You're spending a significant portion of your budget on ${topCategory.category}. Consider reviewing if this aligns with your financial goals.`);
    }
    
    if (patterns.length > 1) {
      const secondCategory = patterns[1];
      insights.push(`Your second highest category is ${secondCategory.category} at ${secondCategory.percentage.toFixed(1)}%.`);
    }
  }
  
  return insights;
};

/**
 * Anomaly Detection using statistical methods
 * Simplified implementation of Isolation Forest concept
 */
export const detectAnomalies = (expenses: ExpenseData[]) => {
  if (expenses.length < 5) {
    return { anomalies: [], insights: ["Not enough expense data to detect anomalies."] };
  }

  // Calculate mean and standard deviation for each category
  const categoryStats: Record<string, { expenses: ExpenseData[]; mean: number; stdDev: number }> = {};
  
  // Group expenses by category
  expenses.forEach(expense => {
    if (!categoryStats[expense.category]) {
      categoryStats[expense.category] = { expenses: [], mean: 0, stdDev: 0 };
    }
    categoryStats[expense.category].expenses.push(expense);
  });
  
  // Calculate statistics for each category
  Object.entries(categoryStats).forEach(([category, data]) => {
    if (data.expenses.length > 0) {
      const sum = data.expenses.reduce((total, exp) => total + exp.amount, 0);
      data.mean = sum / data.expenses.length;
      
      const squaredDiffs = data.expenses.map(exp => Math.pow(exp.amount - data.mean, 2));
      const variance = squaredDiffs.reduce((total, diff) => total + diff, 0) / data.expenses.length;
      data.stdDev = Math.sqrt(variance);
    }
  });
  
  // Detect anomalies (expenses more than 2 standard deviations from the mean)
  const anomalies: Array<ExpenseData & { zscore: number }> = [];
  const anomalyThreshold = 2; // Z-score threshold
  
  Object.entries(categoryStats).forEach(([category, data]) => {
    if (data.expenses.length > 3 && data.stdDev > 0) {
      data.expenses.forEach(expense => {
        const zscore = Math.abs((expense.amount - data.mean) / data.stdDev);
        if (zscore > anomalyThreshold) {
          anomalies.push({ ...expense, zscore });
        }
      });
    }
  });
  
  // Sort anomalies by z-score (most anomalous first)
  anomalies.sort((a, b) => b.zscore - a.zscore);
  
  // Generate insights
  const insights: string[] = [];
  if (anomalies.length > 0) {
    insights.push(`We found ${anomalies.length} unusual expense${anomalies.length > 1 ? 's' : ''} in your spending history.`);
    
    if (anomalies.length > 0) {
      const topAnomaly = anomalies[0];
      const date = new Date(topAnomaly.date).toLocaleDateString();
      insights.push(`Your most unusual expense was ₹${topAnomaly.amount.toLocaleString()} for ${topAnomaly.category} on ${date}.`);
    }
  } else {
    insights.push("Your spending patterns appear consistent with no significant anomalies detected.");
  }
  
  return { anomalies, insights };
};

/**
 * Budget Prediction using Linear Regression
 * Simplified implementation for demonstration purposes
 */
export const predictBudget = (
  expenses: ExpenseData[], 
  budgets: BudgetData[]
) => {
  const categories = ['Housing', 'Food & Drinks', 'Transportation', 'Shopping', 'Entertainment', 'Other'];
  const predictions: Record<string, number> = {};
  const insights: string[] = [];

  // Group expenses by month and category
  const expensesByMonthAndCategory: Record<string, Record<string, number>> = {};
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!expensesByMonthAndCategory[monthKey]) {
      expensesByMonthAndCategory[monthKey] = {};
    }
    
    if (!expensesByMonthAndCategory[monthKey][expense.category]) {
      expensesByMonthAndCategory[monthKey][expense.category] = 0;
    }
    
    expensesByMonthAndCategory[monthKey][expense.category] += expense.amount;
  });

  // For each category, predict next month's budget
  categories.forEach(category => {
    const monthlyExpenses: number[] = [];
    
    // Extract the time series data for this category
    Object.entries(expensesByMonthAndCategory).forEach(([_, categoryExpenses]) => {
      monthlyExpenses.push(categoryExpenses[category] || 0);
    });
    
    if (monthlyExpenses.length >= 3) {
      // Simple linear trend: average of last 3 months with more weight on recent months
      const prediction = (
        monthlyExpenses[monthlyExpenses.length - 1] * 0.5 +
        monthlyExpenses[monthlyExpenses.length - 2] * 0.3 +
        monthlyExpenses[monthlyExpenses.length - 3] * 0.2
      );
      
      predictions[category] = Math.round(prediction);
    } else if (monthlyExpenses.length > 0) {
      // Average if we have some data but not enough for trend analysis
      predictions[category] = Math.round(
        monthlyExpenses.reduce((sum, expense) => sum + expense, 0) / monthlyExpenses.length
      );
    } else {
      // Default budget if no historical data
      predictions[category] = 0;
    }
  });

  // Add insights based on predictions
  if (Object.keys(predictions).length > 0) {
    insights.push("Based on your spending history, we've predicted next month's budget for each category.");
    
    // Find the category with the highest predicted budget
    const highestCategory = Object.entries(predictions)
      .sort((a, b) => b[1] - a[1])[0];
      
    if (highestCategory && highestCategory[1] > 0) {
      insights.push(`Your highest predicted expense category is ${highestCategory[0]} at ₹${highestCategory[1].toLocaleString()}.`);
    }
    
    // Check if total prediction exceeds typical monthly income
    const totalPrediction = Object.values(predictions).reduce((sum, amount) => sum + amount, 0);
    const averageMonthlyIncome = 50000; // Placeholder - would come from user data in real app
    
    if (totalPrediction > averageMonthlyIncome) {
      insights.push(`Your predicted monthly expenses (₹${totalPrediction.toLocaleString()}) exceed your typical income. Consider areas where you can reduce spending.`);
    } else {
      const savingsPercentage = ((averageMonthlyIncome - totalPrediction) / averageMonthlyIncome) * 100;
      insights.push(`You're on track to save approximately ${savingsPercentage.toFixed(1)}% of your income next month.`);
    }
  } else {
    insights.push("We need more historical expense data to provide accurate budget predictions.");
  }

  return { predictions, insights };
};
