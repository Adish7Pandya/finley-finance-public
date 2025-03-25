
import React, { useState, useEffect } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { Plus, IndianRupee, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface Budget {
  id: string;
  category: string;
  amount: number;
  month: number;
  year: number;
}

const Budget = () => {
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1); // 1-12
  const [year, setYear] = useState<number>(new Date().getFullYear());
  
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Fetch budgets
  const { data: budgets = [], isLoading } = useQuery({
    queryKey: ['budgets', month, year],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .eq('month', month)
        .eq('year', year)
        .order('category');
      
      if (error) {
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user,
  });

  // Calculate total budget amount
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);

  // Add budget mutation
  const addBudgetMutation = useMutation({
    mutationFn: async (newBudget: Omit<Budget, 'id'>) => {
      // Check if budget for this category in this month/year already exists
      const { data: existingBudget } = await supabase
        .from('budgets')
        .select('*')
        .eq('category', newBudget.category)
        .eq('month', newBudget.month)
        .eq('year', newBudget.year)
        .single();

      if (existingBudget) {
        // Update existing budget
        const { data, error } = await supabase
          .from('budgets')
          .update({ amount: newBudget.amount })
          .eq('id', existingBudget.id)
          .select();
        
        if (error) throw error;
        return data;
      } else {
        // Insert new budget
        const { data, error } = await supabase
          .from('budgets')
          .insert([{ ...newBudget, user_id: user?.id }])
          .select();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets', month, year] });
      toast({
        title: "Success",
        description: "Budget saved successfully",
      });
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save budget",
        variant: "destructive",
      });
    },
  });

  // Delete budget mutation
  const deleteBudgetMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('budgets')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets', month, year] });
      toast({
        title: "Success",
        description: "Budget deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete budget",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive amount",
        variant: "destructive",
      });
      return;
    }

    addBudgetMutation.mutate({
      amount: numericAmount,
      category,
      month,
      year,
    });
  };

  const resetForm = () => {
    setCategory('');
    setAmount('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      deleteBudgetMutation.mutate(id);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(e.target.value));
  };

  // Generate year options (current year and next 5 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear + i);

  return (
    <DashboardLayout>
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Budget Planner</h1>
            <p className="text-sm text-muted-foreground">Create and manage your monthly budget</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Budget</CardTitle>
            <CardDescription>Set up your monthly budget allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="month" className="block text-sm font-medium mb-1">Month</label>
                <select 
                  id="month" 
                  value={month}
                  onChange={handleMonthChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-teal"
                >
                  {months.map((name, index) => (
                    <option key={name} value={index + 1}>{name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="year" className="block text-sm font-medium mb-1">Year</label>
                <select 
                  id="year" 
                  value={year}
                  onChange={handleYearChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-teal"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="budgetCategory" className="block text-sm font-medium mb-1">Category</label>
                  <select 
                    id="budgetCategory" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-teal"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Housing">Housing</option>
                    <option value="Food & Drinks">Food & Drinks</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budgetAmount" className="block text-sm font-medium mb-1">Budget Amount (₹)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <IndianRupee className="h-4 w-4 text-gray-400" />
                    </span>
                    <input 
                      type="number" 
                      id="budgetAmount" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-teal"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-4 bg-finley-teal hover:bg-finley-teal-dark"
                disabled={addBudgetMutation.isPending}
              >
                {addBudgetMutation.isPending ? (
                  <span className="flex items-center">
                    <span className="mr-2 animate-spin">⏳</span> Saving...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" /> Save Budget
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Budget Summary</CardTitle>
              <CardDescription>
                {months[month - 1]} {year}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total Budget</div>
              <div className="text-xl font-semibold flex items-center justify-end">
                <IndianRupee className="h-4 w-4 mr-1" />
                {totalBudget.toLocaleString()}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-finley-teal"></div>
              </div>
            ) : budgets.length === 0 ? (
              <div className="text-center py-8">
                <IndianRupee className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No budget items yet</h3>
                <p className="text-muted-foreground">
                  Start adding budget items to plan your finances
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgets.map((budget) => (
                      <TableRow key={budget.id}>
                        <TableCell className="font-medium">{budget.category}</TableCell>
                        <TableCell className="text-right">₹{budget.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(budget.id)}
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Budget;
