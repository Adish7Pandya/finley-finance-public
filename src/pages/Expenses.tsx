
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { ShoppingBag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Expenses = () => {
  return (
    <DashboardLayout>
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Expense Tracker</h1>
            <p className="text-sm text-muted-foreground">Add and manage your expenses</p>
          </div>
          <Button className="bg-finley-purple hover:bg-finley-purple-dark">
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add New Expense</CardTitle>
            <CardDescription>Record your expenses to track your spending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                  <select 
                    id="category" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-purple"
                  >
                    <option value="">Select a category</option>
                    <option value="shopping">Shopping</option>
                    <option value="housing">Housing</option>
                    <option value="food">Food & Drinks</option>
                    <option value="transportation">Transportation</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount (₹)</label>
                  <input 
                    type="number" 
                    id="amount" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-purple"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                <input 
                  type="text" 
                  id="description" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-purple"
                  placeholder="Enter expense description"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
                <input 
                  type="date" 
                  id="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-purple"
                />
              </div>
              <Button className="w-full mt-4 bg-finley-purple hover:bg-finley-purple-dark">
                Save Expense
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Expenses;
