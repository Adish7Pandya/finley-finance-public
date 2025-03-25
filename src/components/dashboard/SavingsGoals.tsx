
import React from 'react';
import { Plus, Target, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/common/Card';

const SavingsGoals = () => {
  // This would normally hold actual savings goals data
  const goals: any[] = [];
  
  return (
    <div className="space-y-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Savings Goals</h2>
          <p className="text-sm text-muted-foreground">Track progress towards your financial goals</p>
        </div>
        
        <button className="inline-flex items-center justify-center rounded-lg bg-finley-purple px-4 py-2 text-sm font-medium text-white hover:bg-finley-purple-dark transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          New Goal
        </button>
      </div>
      
      {goals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Goals would be mapped here */}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 text-center px-4">
            <div className="h-16 w-16 rounded-full bg-finley-purple-light flex items-center justify-center mb-4">
              <Target className="h-8 w-8 text-finley-purple-dark" />
            </div>
            <h3 className="text-lg font-medium mb-2">Set Your First Savings Goal</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Start your journey towards financial freedom by creating specific, achievable savings goals.
            </p>
            <button className="mt-4 bg-finley-purple text-white px-4 py-2 rounded-lg hover:bg-finley-purple-dark transition-colors">
              Create Goal
            </button>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1 hover-lift">
          <CardHeader>
            <CardTitle>Vacation Fund</CardTitle>
            <CardDescription>Sample goal template</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Progress</span>
                  <span>₹0 of ₹50,000</span>
                </div>
                <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                  <div className="h-full bg-finley-purple rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Target Date</p>
                    <p className="font-medium">Dec 2023</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Monthly Contribution</p>
                    <p className="font-medium">₹5,000</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <button className="text-sm text-finley-purple hover:text-finley-purple-dark flex items-center transition-colors">
              Use Template
              <ArrowRight className="ml-1 h-3 w-3" />
            </button>
          </CardFooter>
        </Card>
        
        <Card className="md:col-span-1 hover-lift">
          <CardHeader>
            <CardTitle>Emergency Fund</CardTitle>
            <CardDescription>Sample goal template</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Progress</span>
                  <span>₹0 of ₹100,000</span>
                </div>
                <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                  <div className="h-full bg-finley-purple rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Target Date</p>
                    <p className="font-medium">Jun 2024</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Monthly Contribution</p>
                    <p className="font-medium">₹8,000</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <button className="text-sm text-finley-purple hover:text-finley-purple-dark flex items-center transition-colors">
              Use Template
              <ArrowRight className="ml-1 h-3 w-3" />
            </button>
          </CardFooter>
        </Card>
        
        <Card className="md:col-span-1 hover-lift">
          <CardHeader>
            <CardTitle>Home Down Payment</CardTitle>
            <CardDescription>Sample goal template</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Progress</span>
                  <span>₹0 of ₹500,000</span>
                </div>
                <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                  <div className="h-full bg-finley-purple rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              <div className="pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Target Date</p>
                    <p className="font-medium">Jan 2025</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Monthly Contribution</p>
                    <p className="font-medium">₹25,000</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <button className="text-sm text-finley-purple hover:text-finley-purple-dark flex items-center transition-colors">
              Use Template
              <ArrowRight className="ml-1 h-3 w-3" />
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SavingsGoals;
