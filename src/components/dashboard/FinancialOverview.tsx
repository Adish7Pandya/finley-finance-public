
import React, { useEffect } from 'react';
import { IndianRupee, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { ChipBadge } from '@/components/ui/ChipBadge';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const OverviewCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  isGlass = false,
  isLoading = false
}: { 
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | null;
  trendValue?: string;
  isGlass?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <Card isGlass={isGlass} className="overflow-hidden hover-lift">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-finley-purple-light/40 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-8 animate-pulse bg-gray-200 rounded"></div>
        ) : (
          <div className="text-2xl font-bold flex items-center">
            <IndianRupee className="h-4 w-4 mr-1" />
            {value.toLocaleString('en-IN')}
          </div>
        )}
        
        {trend && trendValue && (
          <div className="mt-2 flex items-center text-xs">
            <span className={cn(
              "mr-1 rounded-full p-1",
              trend === 'up' ? "bg-green-100" : "bg-red-100"
            )}>
              {trend === 'up' ? 
                <TrendingUp className="h-3 w-3 text-green-600" /> : 
                <TrendingDown className="h-3 w-3 text-red-600" />
              }
            </span>
            <span className={trend === 'up' ? "text-green-600" : "text-red-600"}>
              {trendValue}
            </span>
            <span className="ml-1 text-muted-foreground">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const FinancialOverview = () => {
  const { user } = useAuth();
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const currentYear = new Date().getFullYear();
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const previousMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  // Get current month expenses
  const { data: currentExpenses = [], isLoading: isLoadingExpenses } = useQuery({
    queryKey: ['expenses', 'overview', currentMonth, currentYear],
    queryFn: async () => {
      const startOfMonth = new Date(currentYear, currentMonth - 1, 1).toISOString();
      const endOfMonth = new Date(currentYear, currentMonth, 0).toISOString();
      
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .gte('date', startOfMonth)
        .lte('date', endOfMonth);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Get previous month expenses
  const { data: previousExpenses = [], isLoading: isLoadingPrevExpenses } = useQuery({
    queryKey: ['expenses', 'overview', previousMonth, previousMonthYear],
    queryFn: async () => {
      const startOfMonth = new Date(previousMonthYear, previousMonth - 1, 1).toISOString();
      const endOfMonth = new Date(previousMonthYear, previousMonth, 0).toISOString();
      
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .gte('date', startOfMonth)
        .lte('date', endOfMonth);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Get current month income (assuming we'd have an incomes table, for now we'll use a placeholder)
  const monthlyIncome = 50000; // Placeholder value
  
  // Get goals (for savings)
  const { data: goals = [], isLoading: isLoadingGoals } = useQuery({
    queryKey: ['goals', 'overview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('goals')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Calculate total expenses for current month
  const totalExpenses = currentExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  
  // Calculate total expenses for previous month
  const totalPrevExpenses = previousExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  
  // Calculate expense trend
  const expenseTrend = totalPrevExpenses === 0 ? null : 
    totalExpenses > totalPrevExpenses ? 'up' : 'down';
  
  let expenseTrendValue = '0%';
  if (totalPrevExpenses > 0) {
    const percentChange = ((totalExpenses - totalPrevExpenses) / totalPrevExpenses) * 100;
    expenseTrendValue = `${Math.abs(percentChange).toFixed(1)}%`;
  }

  // Calculate total savings (total of all goal current_amounts)
  const totalSavings = goals.reduce((sum, goal) => sum + parseFloat(goal.current_amount), 0);
  
  // Calculate balance (income - expenses)
  const balance = monthlyIncome - totalExpenses;

  // Get current month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthName = monthNames[currentMonth - 1];

  const isLoading = isLoadingExpenses || isLoadingPrevExpenses || isLoadingGoals;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Financial Overview</h2>
          <p className="text-sm text-muted-foreground">Your financial summary for this month</p>
        </div>
        
        <ChipBadge variant="purple">
          {currentMonthName} {currentYear}
        </ChipBadge>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard 
          title="Total Balance" 
          value={balance} 
          icon={<IndianRupee className="h-4 w-4 text-finley-purple" />}
          isGlass={true}
          isLoading={isLoading}
        />
        <OverviewCard 
          title="Monthly Income" 
          value={monthlyIncome} 
          icon={<TrendingUp className="h-4 w-4 text-finley-teal-dark" />}
          trend="up"
          trendValue="0%"
          isLoading={isLoading}
        />
        <OverviewCard 
          title="Monthly Expenses" 
          value={totalExpenses} 
          icon={<TrendingDown className="h-4 w-4 text-finley-purple-dark" />}
          trend={expenseTrend}
          trendValue={expenseTrendValue}
          isLoading={isLoading}
        />
        <OverviewCard 
          title="Total Savings" 
          value={totalSavings} 
          icon={<PiggyBank className="h-4 w-4 text-finley-teal" />}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default FinancialOverview;
