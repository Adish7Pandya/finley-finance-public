import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronDown, ShoppingBag, Coffee, Home, Car, Film, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { ChipBadge } from '@/components/ui/ChipBadge';
import { cn } from '@/lib/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useRealtimeData } from '@/hooks/useRealtimeData';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';

interface ExpenseItemProps {
  category: string;
  description: string;
  amount: number;
  date: string;
  icon: React.ReactNode;
  iconBg: string;
}

const ExpenseItem = ({ category, description, amount, date, icon, iconBg }: ExpenseItemProps) => {
  return (
    <div className="flex items-center py-3">
      <div className={cn("h-10 w-10 rounded-full flex items-center justify-center mr-3", iconBg)}>
        {icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{category}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      
      <div className="flex flex-col items-end">
        <p className="text-sm font-medium flex items-center">
          <span className="mr-0.5">₹</span>
          {amount.toLocaleString('en-IN')}
        </p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
    </div>
  );
};

const getCategoryIcon = (category: string) => {
  switch(category.toLowerCase()) {
    case 'shopping':
      return { 
        icon: <ShoppingBag className="h-4 w-4 text-red-500" />, 
        iconBg: "bg-red-100" 
      };
    case 'housing':
      return { 
        icon: <Home className="h-4 w-4 text-blue-500" />, 
        iconBg: "bg-blue-100" 
      };
    case 'food & drinks':
      return { 
        icon: <Coffee className="h-4 w-4 text-yellow-500" />, 
        iconBg: "bg-yellow-100" 
      };
    case 'transportation':
      return { 
        icon: <Car className="h-4 w-4 text-green-500" />, 
        iconBg: "bg-green-100" 
      };
    case 'entertainment':
      return { 
        icon: <Film className="h-4 w-4 text-purple-500" />, 
        iconBg: "bg-purple-100" 
      };
    default:
      return { 
        icon: <MoreHorizontal className="h-4 w-4 text-gray-500" />, 
        iconBg: "bg-gray-100" 
      };
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    month: 'short', 
    day: 'numeric',
    year: '2-digit'
  });
};

type PeriodType = 'week' | 'month';

const ExpenseTracker = () => {
  const { user } = useAuth();
  const [periodType, setPeriodType] = useState<PeriodType>('week');
  const queryClient = useQueryClient();
  
  // Calculate date ranges
  const currentDate = new Date();
  
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  startOfMonth.setHours(0, 0, 0, 0);
  
  const periodStart = periodType === 'week' ? startOfWeek : startOfMonth;
  
  // Use real-time updates
  useRealtimeData('expenses', ['INSERT', 'UPDATE', 'DELETE'], () => {
    queryClient.invalidateQueries({ queryKey: ['expenses'] });
  });
  
  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ['expenses', 'recent', periodType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .gte('date', periodStart.toISOString())
        .order('date', { ascending: false })
        .limit(periodType === 'week' ? 5 : 10);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const totalSpent = expenses.reduce((total, expense) => 
    total + (typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount), 
    0
  );

  const { data: categoryExpenses = [] } = useQuery({
    queryKey: ['expenses', 'by-category', periodType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .gte('date', periodStart.toISOString());
      
      if (error) throw error;
      
      const categories = ['Shopping', 'Housing', 'Food & Drinks', 'Transportation', 'Entertainment', 'Other'];
      const result = categories.map(category => {
        const categoryExpenses = data.filter(
          expense => expense.category.toLowerCase() === category.toLowerCase() || 
                   (category === 'Other' && !categories.slice(0, 5).map(c => c.toLowerCase()).includes(expense.category.toLowerCase()))
        );
        return {
          category,
          total: categoryExpenses.reduce((sum, expense) => {
            const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
            return sum + amount;
          }, 0),
          count: categoryExpenses.length
        };
      });
      
      // Sort by total amount in decreasing order
      return result.sort((a, b) => b.total - a.total);
    },
    enabled: !!user,
  });

  const totalCategoryExpenses = categoryExpenses.reduce((sum, cat) => sum + cat.total, 0);

  const formattedExpenses = expenses.map(expense => {
    const { icon, iconBg } = getCategoryIcon(expense.category);
    return {
      ...expense,
      icon,
      iconBg,
      date: formatDate(expense.date)
    };
  });
  
  const { data: monthlyExpenses = [] } = useQuery({
    queryKey: ['expenses', 'monthly', periodType],
    queryFn: async () => {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      threeMonthsAgo.setHours(0, 0, 0, 0);

      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .gte('date', threeMonthsAgo.toISOString())
        .order('date', { ascending: true });
      
      if (error) throw error;
      
      // Group expenses by month
      const monthlyData = data.reduce((acc: { [key: string]: number }, expense) => {
        const date = new Date(expense.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
        acc[monthKey] = (acc[monthKey] || 0) + amount;
        return acc;
      }, {});

      // Convert to array format for the chart
      return Object.entries(monthlyData).map(([month, total]) => ({
        month,
        total
      }));
    },
    enabled: !!user,
  });

  return (
    <div className="space-y-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Recent Expenses</h2>
          <p className="text-sm text-muted-foreground">Track your most recent spending</p>
        </div>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm text-finley-purple-dark hover:text-finley-purple flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {periodType === 'week' ? 'This Week' : 'This Month'}
              <ChevronDown className="h-3 w-3 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setPeriodType('week')}>
                This Week
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriodType('month')}>
                This Month
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Expenses</CardTitle>
          <CardDescription>
            {periodType === 'week' ? 'Your transactions this week' : 'Your transactions this month'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-finley-purple"></div>
            </div>
          ) : formattedExpenses.length > 0 ? (
            <div className="space-y-2">
              {formattedExpenses.map((expense, index) => (
                <ExpenseItem key={expense.id} {...expense} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="h-16 w-16 rounded-full bg-finley-neutral-light flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-finley-neutral-dark" />
              </div>
              <h3 className="text-lg font-medium mb-1">No expenses yet</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Start tracking your expenses to gain insights into your spending habits.
              </p>
              <Link to="/expenses">
                <button className="mt-4 bg-finley-purple text-white px-4 py-2 rounded-lg hover:bg-finley-purple-dark transition-colors">
                  Add Expense
                </button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Categories</span>
              <ChipBadge variant="neutral">{periodType === 'week' ? 'This Week' : 'This Month'}</ChipBadge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryExpenses.map((category) => {
                const { icon, iconBg } = getCategoryIcon(category.category);
                const percentage = totalCategoryExpenses === 0 ? 0 : 
                  Math.round((category.total / totalCategoryExpenses) * 100);
                  
                return (
                  <div className="flex items-center" key={category.category}>
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center mr-3", iconBg)}>
                      {icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{category.category}</span>
                        <span className="text-sm">₹{category.total.toLocaleString()}</span>
                      </div>
                      <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            category.category === 'Shopping' ? "bg-red-400" :
                            category.category === 'Housing' ? "bg-blue-400" :
                            category.category === 'Food & Drinks' ? "bg-yellow-400" :
                            category.category === 'Transportation' ? "bg-green-400" :
                            category.category === 'Entertainment' ? "bg-purple-400" :
                            "bg-gray-400"
                          )} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Spending Trend</span>
              <ChipBadge variant="teal">Last 3 Months</ChipBadge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {monthlyExpenses.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyExpenses}>
                    <XAxis 
                      dataKey="month"
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-IN', { month: 'short' });
                      }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `₹${value.toLocaleString()}`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Total']}
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">Not enough data available yet</p>
                  <p className="text-sm text-muted-foreground">Continue tracking your expenses to see trends</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseTracker;
