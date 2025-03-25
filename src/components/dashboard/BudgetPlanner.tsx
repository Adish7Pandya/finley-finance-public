import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { IndianRupee, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { ChipBadge } from '@/components/ui/ChipBadge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const COLORS = ['#9B87F5', '#ECEDF0'];

const BudgetPlanner = () => {
  const { user } = useAuth();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // 1-based month
  const currentYear = currentDate.getFullYear();
  const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });

  // Fetch current month's budgets
  const { data: budgets = [], isLoading } = useQuery({
    queryKey: ['budgets', currentMonth, currentYear],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', user?.id)
        .eq('month', currentMonth)
        .eq('year', currentYear)
        .order('category');
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Fetch current month's expenses
  const { data: currentExpenses = [] } = useQuery({
    queryKey: ['expenses', currentMonth, currentYear],
    queryFn: async () => {
      const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
      const endOfMonth = new Date(currentYear, currentMonth, 0);
      
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user?.id)
        .gte('date', startOfMonth.toISOString())
        .lte('date', endOfMonth.toISOString());
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Calculate total budget and spent amounts
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = currentExpenses.reduce((sum, expense) => 
    sum + (typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount), 0
  );
  const remainingBudget = totalBudget - totalSpent;

  // Calculate percentage spent for the pie chart
  const percentageSpent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const chartData = [
    { name: 'Spent', value: percentageSpent },
    { name: 'Available', value: 100 - percentageSpent },
  ];

  // Calculate spent amount per category
  const spentByCategory = currentExpenses.reduce((acc, expense) => {
    const category = expense.category;
    const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);

  // Get budget amount per category
  const budgetByCategory = budgets.reduce((acc, budget) => {
    acc[budget.category] = budget.amount;
    return acc;
  }, {} as Record<string, number>);

  // Category colors
  const categoryColors = {
    'Shopping': 'bg-red-400',
    'Housing': 'bg-blue-400',
    'Food & Drinks': 'bg-yellow-400',
    'Transportation': 'bg-green-400',
    'Entertainment': 'bg-purple-400',
    'Other': 'bg-gray-400'
  };

  return (
    <div className="space-y-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Budget Planning</h2>
          <p className="text-sm text-muted-foreground">Manage and track your monthly budget</p>
        </div>
        
        <Link to="/budget">
          <button className="inline-flex items-center justify-center rounded-lg bg-finley-teal px-4 py-2 text-sm font-medium text-white hover:bg-finley-teal-dark transition-colors">
            <Plus className="mr-2 h-4 w-4" />
            Create Budget
          </button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1 row-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Monthly Budget</CardTitle>
            <CardDescription>{currentMonthName} {currentYear}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground">Available</span>
                <div className="text-2xl font-bold flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1" />
                  {remainingBudget.toLocaleString()}
                </div>
                <span className="text-xs text-muted-foreground mt-1">of ₹{totalBudget.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="space-y-4 mt-6">
              <div>
                <div className="flex items-center justify-between text-sm font-medium mb-1">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-finley-purple mr-2"></div>
                    <span>Spent</span>
                  </div>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3 mr-0.5" />
                    <span>{totalSpent.toLocaleString()}</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-finley-neutral-light overflow-hidden">
                  <div 
                    className="h-full bg-finley-purple rounded-full" 
                    style={{ width: `${percentageSpent}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm font-medium mb-1">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-finley-neutral mr-2"></div>
                    <span>Remaining</span>
                  </div>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3 mr-0.5" />
                    <span>{remainingBudget.toLocaleString()}</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-finley-neutral-light overflow-hidden">
                  <div 
                    className="h-full bg-finley-neutral rounded-full" 
                    style={{ width: `${100 - percentageSpent}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Category Budgets</span>
              <ChipBadge variant="purple">This Month</ChipBadge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(categoryColors).map(([category, color]) => {
                const budget = budgetByCategory[category] || 0;
                const spent = spentByCategory[category] || 0;
                const percentage = budget > 0 ? (spent / budget) * 100 : 0;
                
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">{category}</span>
                      <div className="flex items-center">
                        <IndianRupee className="h-3 w-3 mr-0.5" />
                        <span>{spent.toLocaleString()} of ₹{budget.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                      <div 
                        className={`h-full ${color} rounded-full`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Budget Insights</span>
              <ChipBadge variant="teal">AI Powered</ChipBadge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6 text-center px-4">
              <div className="h-12 w-12 rounded-full bg-finley-teal-light flex items-center justify-center mb-4">
                <span className="text-finley-teal-dark text-lg font-medium">AI</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Track Your {currentMonthName} Budget</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Set up your budget for {currentMonthName} {currentYear} to get personalized insights and track your spending patterns.
              </p>
              <Link to="/budget">
                <button className="mt-4 bg-finley-teal text-white px-4 py-2 rounded-lg hover:bg-finley-teal-dark transition-colors">
                  Set Up Budget
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetPlanner;
