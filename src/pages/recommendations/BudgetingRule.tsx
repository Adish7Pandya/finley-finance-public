import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Target, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BudgetingRule = () => {
  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">50/30/20 Budgeting Rule</h1>
        <p className="text-muted-foreground">
          A simple and effective way to manage your money by allocating your income into three main categories.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-finley-teal" />
            Understanding the Rule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-700 mb-2">50% - Needs</h3>
              <p className="text-sm text-green-600">
                Essential expenses like housing, utilities, groceries, healthcare, and minimum debt payments.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-700 mb-2">30% - Wants</h3>
              <p className="text-sm text-blue-600">
                Non-essential expenses like entertainment, dining out, hobbies, and luxury items.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-700 mb-2">20% - Savings</h3>
              <p className="text-sm text-purple-600">
                Emergency fund, retirement, investments, and extra debt payments beyond minimums.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">How to Implement</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Calculate your monthly take-home income</li>
              <li>Multiply your income by 0.5, 0.3, and 0.2 to get your budget allocations</li>
              <li>List all your monthly expenses</li>
              <li>Categorize each expense as a need, want, or savings</li>
              <li>Adjust your spending to match the 50/30/20 split</li>
            </ol>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 mb-1">Important Notes</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• The 50/30/20 rule is a guideline, not a strict rule</li>
                  <li>• Adjust percentages based on your specific circumstances</li>
                  <li>• High-cost areas might require adjusting the needs percentage</li>
                  <li>• Focus on the spirit of the rule: prioritizing needs, limiting wants, and saving regularly</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Simple to Follow</h4>
                  <p className="text-sm text-muted-foreground">
                    Easy to understand and implement, making it perfect for beginners.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Balanced Approach</h4>
                  <p className="text-sm text-muted-foreground">
                    Ensures you cover essentials while still enjoying life and saving for the future.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Flexible Framework</h4>
                  <p className="text-sm text-muted-foreground">
                    Can be adjusted based on your income level and financial goals.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Builds Good Habits</h4>
                  <p className="text-sm text-muted-foreground">
                    Encourages regular saving and mindful spending.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Link to="/budget">
              <Button className="w-full md:w-auto">
                Start Budgeting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetingRule; 