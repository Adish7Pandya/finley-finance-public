import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Target, Pencil, IndianRupee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { ChipBadge } from '@/components/ui/ChipBadge';

// This is a sample card for when no goals exist
const EmptyGoalCard = () => (
  <div className="col-span-1">
    <Link to="/goals">
      <div className="h-full border-2 border-dashed border-finley-neutral-light rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-finley-neutral-lightest transition-colors cursor-pointer">
        <div className="h-12 w-12 rounded-full bg-finley-purple-light flex items-center justify-center mb-4">
          <Plus className="h-6 w-6 text-finley-purple" />
        </div>
        <h3 className="font-medium mb-2">Create New Goal</h3>
        <p className="text-sm text-muted-foreground">Set up a new savings goal to track your progress</p>
      </div>
    </Link>
  </div>
);

interface SavingsGoalItemProps {
  title: string;
  savedAmount: number;
  targetAmount: number;
  progress: number;
  category: string;
}

const SavingsGoalItem = ({ title, savedAmount, targetAmount, progress, category }: SavingsGoalItemProps) => {
  return (
    <Card className="col-span-1 hover-lift">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <ChipBadge variant="purple">{category}</ChipBadge>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <IndianRupee className="inline-block h-4 w-4 mr-1" />
          {savedAmount.toLocaleString('en-IN')}
        </div>
        <p className="text-sm text-muted-foreground">
          Saved of <IndianRupee className="inline-block h-3 w-3 mx-0.5" />{targetAmount.toLocaleString('en-IN')}
        </p>
        <div className="w-full h-2 rounded-full bg-finley-neutral-light mt-3 overflow-hidden">
          <div
            className="h-full bg-finley-purple rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
          <span>{progress}%</span>
          <Link to="/goals" className="hover:text-finley-purple transition-colors">
            <Pencil className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const SavingsGoals = () => {
  // This would normally hold actual savings goal data
  const savingsGoals: SavingsGoalItemProps[] = [];

  return (
    <div className="space-y-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Savings Goals</h2>
          <p className="text-sm text-muted-foreground">Track your progress towards your financial goals</p>
        </div>
        
        <Link to="/goals">
          <button className="inline-flex items-center justify-center rounded-lg bg-finley-purple px-4 py-2 text-sm font-medium text-white hover:bg-finley-purple-dark transition-colors">
            <Plus className="mr-2 h-4 w-4" />
            New Goal
          </button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savingsGoals.length > 0 ? (
          savingsGoals.map((goal, index) => (
            <SavingsGoalItem key={index} {...goal} />
          ))
        ) : (
          <EmptyGoalCard />
        )}
      </div>
    </div>
  );
};

export default SavingsGoals;
