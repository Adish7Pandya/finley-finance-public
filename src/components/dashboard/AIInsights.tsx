
import React from 'react';
import { Star, Sparkles, MessageSquare, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { ChipBadge } from '@/components/ui/ChipBadge';

const InsightCard = ({ 
  title, 
  description, 
  icon, 
  type = 'info',
  isNew = false
}: { 
  title: string;
  description: string;
  icon: React.ReactNode;
  type?: 'success' | 'warning' | 'info';
  isNew?: boolean;
}) => {
  const getTypeStyles = () => {
    switch(type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };
  
  const getIconStyles = () => {
    switch(type) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'warning':
        return 'bg-amber-100 text-amber-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };
  
  return (
    <Card className={`border ${getTypeStyles()} hover-lift`}>
      <CardContent className="flex p-6">
        <div className={`h-10 w-10 rounded-full ${getIconStyles()} flex shrink-0 items-center justify-center mr-4`}>
          {icon}
        </div>
        <div>
          <div className="flex items-center mb-1">
            <h4 className="font-medium">{title}</h4>
            {isNew && (
              <ChipBadge variant="purple" className="ml-2">New</ChipBadge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const AIInsights = () => {
  return (
    <div className="space-y-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">AI Insights</h2>
          <p className="text-sm text-muted-foreground">Personalized financial recommendations powered by AI</p>
        </div>
        
        <button className="inline-flex items-center justify-center rounded-lg border border-finley-purple text-finley-purple px-4 py-2 text-sm font-medium hover:bg-finley-purple-light/20 transition-colors">
          <MessageSquare className="mr-2 h-4 w-4" />
          Ask Finley
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Card className="bg-gradient-to-r from-finley-purple/10 to-finley-teal/10 border-none hover-lift">
          <CardContent className="flex items-center p-6">
            <div className="h-12 w-12 rounded-full bg-finley-purple/20 backdrop-blur-sm flex items-center justify-center mr-5">
              <Sparkles className="h-6 w-6 text-finley-purple" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Welcome to AI-Powered Financial Insights</h3>
              <p className="text-sm text-muted-foreground">
                Finley analyzes your financial data to provide personalized recommendations, spending patterns,
                and actionable tips to help you achieve your financial goals.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <InsightCard
          title="Start tracking your expenses"
          description="Add your expenses to get personalized insights on your spending habits and areas where you can save."
          icon={<TrendingUp className="h-5 w-5" />}
          type="info"
          isNew={true}
        />
        
        <InsightCard
          title="Set up your emergency fund"
          description="Financial experts recommend having 3-6 months of expenses saved. Create a savings goal to start building your safety net."
          icon={<AlertTriangle className="h-5 w-5" />}
          type="warning"
        />
        
        <InsightCard
          title="Complete your profile"
          description="Add more details to your profile to receive more accurate and personalized financial recommendations."
          icon={<CheckCircle className="h-5 w-5" />}
          type="success"
        />
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 text-finley-teal mr-2" />
            <span>Recommended for You</span>
          </CardTitle>
          <CardDescription>
            Personalized tips based on your financial profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium">50/30/20 Rule for Budgeting</h4>
                <ChipBadge variant="teal">Beginner</ChipBadge>
              </div>
              <p className="text-sm text-muted-foreground">
                Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment for a balanced budget.
              </p>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium">Automate Your Savings</h4>
                <ChipBadge variant="teal">Beginner</ChipBadge>
              </div>
              <p className="text-sm text-muted-foreground">
                Set up automatic transfers to your savings account on payday to make saving effortless and consistent.
              </p>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium">Review Subscriptions</h4>
                <ChipBadge variant="teal">Quick Win</ChipBadge>
              </div>
              <p className="text-sm text-muted-foreground">
                Review and cancel unused subscription services to save money each month without sacrificing what you truly enjoy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;
