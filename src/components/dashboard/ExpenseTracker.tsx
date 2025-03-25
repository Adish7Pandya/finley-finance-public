
import React from 'react';
import { Calendar, ShoppingBag, Coffee, Home, Car, Film, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { ChipBadge } from '@/components/ui/ChipBadge';
import { cn } from '@/lib/utils';

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

const ExpenseTracker = () => {
  // This would normally hold actual expense data
  const expenses: ExpenseItemProps[] = [];
  
  return (
    <div className="space-y-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Recent Expenses</h2>
          <p className="text-sm text-muted-foreground">Track your most recent spending</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="text-sm text-finley-purple-dark hover:text-finley-purple flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            This Week
          </button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Expenses</CardTitle>
          <CardDescription>Your most recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {expenses.length > 0 ? (
            <div className="space-y-2">
              {expenses.map((expense, index) => (
                <ExpenseItem key={index} {...expense} />
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
              <button className="mt-4 bg-finley-purple text-white px-4 py-2 rounded-lg hover:bg-finley-purple-dark transition-colors">
                Add Expense
              </button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Categories</span>
              <ChipBadge variant="neutral">This Month</ChipBadge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <ShoppingBag className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Shopping</span>
                    <span className="text-sm">₹0</span>
                  </div>
                  <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Home className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Housing</span>
                    <span className="text-sm">₹0</span>
                  </div>
                  <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <Coffee className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Food & Drinks</span>
                    <span className="text-sm">₹0</span>
                  </div>
                  <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Car className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Transportation</span>
                    <span className="text-sm">₹0</span>
                  </div>
                  <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Film className="h-4 w-4 text-purple-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Entertainment</span>
                    <span className="text-sm">₹0</span>
                  </div>
                  <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Others</span>
                    <span className="text-sm">₹0</span>
                  </div>
                  <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                    <div className="h-full bg-gray-400 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Spending Trend</span>
              <ChipBadge variant="teal">Last 6 Months</ChipBadge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">No spending data available yet</p>
                <p className="text-sm text-muted-foreground">Start tracking your expenses to see trends</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseTracker;
