
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { Plus, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Budget = () => {
  return (
    <DashboardLayout>
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Budget Planner</h1>
            <p className="text-sm text-muted-foreground">Create and manage your monthly budget</p>
          </div>
          <Button className="bg-finley-teal hover:bg-finley-teal-dark">
            <Plus className="mr-2 h-4 w-4" />
            Create Budget
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Budget</CardTitle>
            <CardDescription>Set up your monthly budget allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 py-4">
              <div>
                <label htmlFor="month" className="block text-sm font-medium mb-1">Month</label>
                <select 
                  id="month" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-teal"
                >
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                </select>
              </div>
              <div>
                <label htmlFor="totalBudget" className="block text-sm font-medium mb-1">Total Budget (₹)</label>
                <input 
                  type="number" 
                  id="totalBudget" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-teal"
                  placeholder="0.00"
                />
              </div>
              
              <h3 className="text-md font-medium mt-4">Category Allocation</h3>
              
              {['Shopping', 'Housing', 'Food & Drinks', 'Transportation', 'Entertainment'].map((category) => (
                <div key={category} className="grid grid-cols-5 gap-4 items-center">
                  <div className="col-span-2">
                    <span className="text-sm font-medium">{category}</span>
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      className="w-full accent-finley-teal"
                    />
                  </div>
                  <div className="col-span-1 flex items-center">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    <input 
                      type="number" 
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-finley-teal"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              ))}
              
              <Button className="w-full mt-4 bg-finley-teal hover:bg-finley-teal-dark">
                Save Budget
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Budget;
