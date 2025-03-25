
import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { IndianRupee, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { ChipBadge } from '@/components/ui/ChipBadge';

// Sample data for the pie chart
const emptyData = [
  { name: 'Available', value: 100 },
];

const COLORS = ['#9B87F5', '#ECEDF0'];

const BudgetPlanner = () => {
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
            <CardDescription>July 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emptyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {emptyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-muted-foreground">Available</span>
                <div className="text-2xl font-bold flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1" />
                  0
                </div>
                <span className="text-xs text-muted-foreground mt-1">of ₹0</span>
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
                    <span>0</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-finley-neutral-light overflow-hidden">
                  <div className="h-full bg-finley-purple rounded-full" style={{ width: '0%' }}></div>
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
                    <span>0</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-finley-neutral-light overflow-hidden">
                  <div className="h-full bg-finley-neutral rounded-full" style={{ width: '100%' }}></div>
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
              {/* Shopping Category */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Shopping</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3 mr-0.5" />
                    <span>0 of ₹0</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              {/* Housing Category */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Housing</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3 mr-0.5" />
                    <span>0 of ₹0</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              {/* Food & Drinks Category */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Food & Drinks</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3 mr-0.5" />
                    <span>0 of ₹0</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              {/* Transportation Category */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Transportation</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3 mr-0.5" />
                    <span>0 of ₹0</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              {/* Entertainment Category */}
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">Entertainment</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3 mr-0.5" />
                    <span>0 of ₹0</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-finley-neutral-light overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
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
              <h3 className="text-lg font-medium mb-2">Set up your first budget</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Create a budget to receive AI-powered insights and recommendations to optimize your spending.
              </p>
              <button className="mt-4 bg-finley-teal text-white px-4 py-2 rounded-lg hover:bg-finley-teal-dark transition-colors">
                Get Started
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetPlanner;
