
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { Plus, Target, IndianRupee, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Goals = () => {
  return (
    <DashboardLayout>
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Savings Goals</h1>
            <p className="text-sm text-muted-foreground">Set and track your financial goals</p>
          </div>
          <Button className="bg-finley-purple hover:bg-finley-purple-dark">
            <Plus className="mr-2 h-4 w-4" />
            New Goal
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Savings Goal</CardTitle>
            <CardDescription>Set a new financial goal to work towards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 py-4">
              <div>
                <label htmlFor="goalName" className="block text-sm font-medium mb-1">Goal Name</label>
                <input 
                  type="text" 
                  id="goalName" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-purple"
                  placeholder="e.g., Emergency Fund, Vacation, New Laptop"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="targetAmount" className="block text-sm font-medium mb-1">Target Amount (₹)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <IndianRupee className="h-4 w-4 text-gray-400" />
                    </span>
                    <input 
                      type="number" 
                      id="targetAmount" 
                      className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-purple"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="targetDate" className="block text-sm font-medium mb-1">Target Date</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </span>
                    <input 
                      type="date" 
                      id="targetDate" 
                      className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-purple"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="goalCategory" className="block text-sm font-medium mb-1">Category</label>
                <select 
                  id="goalCategory" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-purple"
                >
                  <option value="">Select a category</option>
                  <option value="emergency">Emergency Fund</option>
                  <option value="retirement">Retirement</option>
                  <option value="education">Education</option>
                  <option value="travel">Travel</option>
                  <option value="home">Home</option>
                  <option value="car">Vehicle</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="goalDescription" className="block text-sm font-medium mb-1">Description (Optional)</label>
                <textarea 
                  id="goalDescription" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-purple"
                  placeholder="Add some details about your goal"
                  rows={3}
                ></textarea>
              </div>
              
              <Button className="w-full mt-4 bg-finley-purple hover:bg-finley-purple-dark">
                <Target className="mr-2 h-4 w-4" />
                Create Goal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Goals;
