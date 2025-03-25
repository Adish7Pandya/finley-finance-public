
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { Sparkles, MessageSquare, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { ChipBadge } from '@/components/ui/ChipBadge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Insights = () => {
  return (
    <DashboardLayout>
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">AI Financial Insights</h1>
            <p className="text-sm text-muted-foreground">Personalized financial analysis and recommendations</p>
          </div>
          <Link to="/chatbot">
            <Button className="bg-finley-purple hover:bg-finley-purple-dark">
              <MessageSquare className="mr-2 h-4 w-4" />
              Ask Finley
            </Button>
          </Link>
        </div>

        <Card className="bg-gradient-to-r from-finley-purple/10 to-finley-teal/10 border-none">
          <CardContent className="flex items-center p-6">
            <div className="h-12 w-12 rounded-full bg-finley-purple/20 backdrop-blur-sm flex items-center justify-center mr-5">
              <Sparkles className="h-6 w-6 text-finley-purple" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">AI-Powered Financial Insights</h3>
              <p className="text-sm text-muted-foreground">
                Finley analyzes your financial data to provide personalized recommendations, spending patterns,
                and actionable tips to help you achieve your financial goals.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 text-finley-teal mr-2" />
                <span>Spending Analysis</span>
              </CardTitle>
              <CardDescription>
                Understand your spending habits and areas for improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <p className="text-muted-foreground mb-4">
                  Start adding expenses to receive personalized spending insights
                </p>
                <Link to="/expenses">
                  <Button variant="outline">
                    Track Expenses
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                <span>Financial Opportunities</span>
              </CardTitle>
              <CardDescription>
                Actionable suggestions to improve your financial situation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">Set up your emergency fund</h4>
                    <ChipBadge variant="teal">Recommended</ChipBadge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Financial experts recommend having 3-6 months of expenses saved. Create a savings goal to start building your safety net.
                  </p>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">Create your first budget</h4>
                    <ChipBadge variant="purple">Get Started</ChipBadge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Set up a budget to track your spending against your income and ensure you're saving enough each month.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Insights;
