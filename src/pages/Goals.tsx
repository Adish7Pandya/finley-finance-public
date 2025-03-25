
import React, { useState } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { Plus, Target, IndianRupee, Calendar, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface Goal {
  id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  target_date: string | null;
  category: string;
}

const Goals = () => {
  const [title, setTitle] = useState<string>('');
  const [targetAmount, setTargetAmount] = useState<string>('');
  const [targetDate, setTargetDate] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch goals
  const { data: goals = [], isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user,
  });

  // Add goal mutation
  const addGoalMutation = useMutation({
    mutationFn: async (newGoal: Omit<Goal, 'id' | 'current_amount'>) => {
      const { data, error } = await supabase
        .from('goals')
        .insert([{ 
          ...newGoal, 
          user_id: user?.id, 
          current_amount: 0 
        }])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast({
        title: "Success",
        description: "Goal created successfully",
      });
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create goal",
        variant: "destructive",
      });
    },
  });

  // Delete goal mutation
  const deleteGoalMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast({
        title: "Success",
        description: "Goal deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete goal",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !targetAmount || !category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const numericAmount = parseFloat(targetAmount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive amount",
        variant: "destructive",
      });
      return;
    }

    addGoalMutation.mutate({
      title,
      target_amount: numericAmount,
      target_date: targetDate || null,
      category,
      description,
    });
  };

  const resetForm = () => {
    setTitle('');
    setTargetAmount('');
    setTargetDate('');
    setCategory('');
    setDescription('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      deleteGoalMutation.mutate(id);
    }
  };

  // Calculate progress percentage
  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <DashboardLayout>
      <div className="container py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Savings Goals</h1>
            <p className="text-sm text-muted-foreground">Set and track your financial goals</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Savings Goal</CardTitle>
            <CardDescription>Set a new financial goal to work towards</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <label htmlFor="goalName" className="block text-sm font-medium mb-1">Goal Name</label>
                <input 
                  type="text" 
                  id="goalName" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-purple"
                  placeholder="e.g., Emergency Fund, Vacation, New Laptop"
                  required
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
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                      className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-purple"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
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
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-purple"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="goalCategory" className="block text-sm font-medium mb-1">Category</label>
                <select 
                  id="goalCategory" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-purple"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Emergency">Emergency Fund</option>
                  <option value="Retirement">Retirement</option>
                  <option value="Education">Education</option>
                  <option value="Travel">Travel</option>
                  <option value="Home">Home</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="goalDescription" className="block text-sm font-medium mb-1">Description (Optional)</label>
                <textarea 
                  id="goalDescription" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-finley-purple"
                  placeholder="Add some details about your goal"
                  rows={3}
                ></textarea>
              </div>
              
              <Button 
                type="submit" 
                className="w-full mt-4 bg-finley-purple hover:bg-finley-purple-dark"
                disabled={addGoalMutation.isPending}
              >
                {addGoalMutation.isPending ? (
                  <span className="flex items-center">
                    <span className="mr-2 animate-spin">⏳</span> Creating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Target className="mr-2 h-4 w-4" /> Create Goal
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Savings Goals</CardTitle>
            <CardDescription>Track progress towards your financial targets</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-finley-purple"></div>
              </div>
            ) : goals.length === 0 ? (
              <div className="text-center py-8">
                <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No goals yet</h3>
                <p className="text-muted-foreground">
                  Start creating savings goals to track your financial progress
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {goals.map((goal) => (
                  <div key={goal.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-lg">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground">{goal.category}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(goal.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Progress: </span>
                        <span className="font-medium">{calculateProgress(goal.current_amount, goal.target_amount)}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Target: </span>
                        <span className="font-medium">₹{goal.target_amount.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="h-2 bg-gray-200 rounded-full mb-4">
                      <div 
                        className="h-full bg-finley-purple rounded-full" 
                        style={{ width: `${calculateProgress(goal.current_amount, goal.target_amount)}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">Current: </span>
                        <span className="font-medium">₹{goal.current_amount.toLocaleString()}</span>
                      </div>
                      {goal.target_date && (
                        <div>
                          <span className="text-muted-foreground">By: </span>
                          <span className="font-medium">{new Date(goal.target_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Goals;
