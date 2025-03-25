
import React from 'react';
import { IndianRupee, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { ChipBadge } from '@/components/ui/ChipBadge';
import { cn } from '@/lib/utils';

const OverviewCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  isGlass = false 
}: { 
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | null;
  trendValue?: string;
  isGlass?: boolean;
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
        <div className="text-2xl font-bold flex items-center">
          <IndianRupee className="h-4 w-4 mr-1" />
          {value.toLocaleString('en-IN')}
        </div>
        
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
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Financial Overview</h2>
          <p className="text-sm text-muted-foreground">Your financial summary for this month</p>
        </div>
        
        <ChipBadge variant="purple">
          July 2023
        </ChipBadge>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard 
          title="Total Balance" 
          value={0} 
          icon={<IndianRupee className="h-4 w-4 text-finley-purple" />}
          isGlass={true}
        />
        <OverviewCard 
          title="Monthly Income" 
          value={0} 
          icon={<TrendingUp className="h-4 w-4 text-finley-teal-dark" />}
          trend="up"
          trendValue="0%"
        />
        <OverviewCard 
          title="Monthly Expenses" 
          value={0} 
          icon={<TrendingDown className="h-4 w-4 text-finley-purple-dark" />}
          trend="down"
          trendValue="0%"
        />
        <OverviewCard 
          title="Total Savings" 
          value={0} 
          icon={<PiggyBank className="h-4 w-4 text-finley-teal" />}
        />
      </div>
    </div>
  );
};

export default FinancialOverview;
