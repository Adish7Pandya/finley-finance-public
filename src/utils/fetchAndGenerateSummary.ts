
import { supabase } from '@/integrations/supabase/client';

export const fetchAndGenerateSummary = async (userId: string) => {
  if (!userId) return null;
  
  try {
    // We'll first check if we have any summaries
    // Use proper type assertion for the records_summary table
    const { data: existingSummaries, error: summariesError } = await supabase
      .from('records_summary')
      .select('*')
      .eq('user_id', userId);
      
    if (summariesError) {
      console.error('Error fetching summaries:', summariesError);
      return null;
    }
    
    // If we already have summaries, let's just return those
    if (existingSummaries && existingSummaries.length > 0) {
      return existingSummaries;
    }
    
    // If we don't have any summaries, let's generate them for the past 6 months
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // 1-12
    const currentYear = currentDate.getFullYear();
    
    const summaries = [];
    
    // Generate summaries for the past 6 months
    for (let i = 0; i < 6; i++) {
      let month = currentMonth - i;
      let year = currentYear;
      
      if (month <= 0) {
        month += 12;
        year -= 1;
      }
      
      try {
        // Get monthly income (using fixed value for demo)
        const income = 50000;
        
        // Get monthly expenses
        const startOfMonth = new Date(year, month - 1, 1).toISOString();
        const endOfMonth = new Date(year, month, 0).toISOString();
        
        const { data: expenses, error: expensesError } = await supabase
          .from('expenses')
          .select('amount')
          .eq('user_id', userId)
          .gte('date', startOfMonth)
          .lte('date', endOfMonth);
          
        if (expensesError) {
          console.error('Error fetching expenses:', expensesError);
          continue;
        }
        
        // Calculate total expenses
        const totalExpenses = expenses ? expenses.reduce((sum, expense) => {
          const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
          return sum + amount;
        }, 0) : 0;
        
        // Get budget for this month
        const { data: budgets, error: budgetsError } = await supabase
          .from('budgets')
          .select('amount')
          .eq('user_id', userId)
          .eq('year', year)
          .eq('month', month);
          
        if (budgetsError) {
          console.error('Error fetching budgets:', budgetsError);
          continue;
        }
        
        // Calculate total budget
        const totalBudget = budgets ? budgets.reduce((sum, budget) => {
          const amount = typeof budget.amount === 'string' ? parseFloat(budget.amount) : budget.amount;
          return sum + amount;
        }, 0) : 0;
        
        // Calculate budget utilization
        const budgetUtilization = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;
        
        // Calculate savings
        const savings = income - totalExpenses;
        
        // Create the summary record
        const { data: insertResult, error: insertError } = await supabase
          .from('records_summary')
          .insert({
            user_id: userId,
            year,
            month,
            total_income: income,
            total_expenses: totalExpenses,
            total_savings: savings,
            budget_utilization_percentage: budgetUtilization
          })
          .select();
          
        if (insertError) {
          console.error('Error inserting summary:', insertError);
          continue;
        }
        
        if (insertResult && insertResult.length > 0) {
          summaries.push(insertResult[0]);
        }
      } catch (err) {
        console.error(`Error generating summary for ${month}/${year}:`, err);
      }
    }
    
    return summaries;
  } catch (error) {
    console.error('Error in fetchAndGenerateSummary:', error);
    return null;
  }
};
