import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar as CalendarIcon, Target } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from '@/components/ui/use-toast';
import { useRealtimeData } from '@/hooks/useRealtimeData';
import { cn } from '@/lib/utils';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

type Goal = {
  id: string;
  user_id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
};

const COLORS = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const Goals = () => {
  const { user } = useAuth();
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  useRealtimeData('goals', ['INSERT', 'UPDATE', 'DELETE'], () => {
    queryClient.invalidateQueries({ queryKey: ['goals'] });
  });

  const { data: goals, isLoading: isLoadingGoals } = useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 30)),
  });

  // Calculate total progress across all goals
  const totalProgress = goals?.reduce((acc, goal) => {
    acc.totalCurrent += goal.current_amount;
    acc.totalTarget += goal.target_amount;
    return acc;
  }, { totalCurrent: 0, totalTarget: 0 }) || { totalCurrent: 0, totalTarget: 0 };

  // Transform goals data for pie chart
  const pieChartData = goals?.map(goal => ({
    name: goal.title,
    value: goal.current_amount,
    target: goal.target_amount,
    progress: (goal.current_amount / goal.target_amount) * 100
  })) || [];

  const handleAddGoal = async (data: Omit<Goal, "id" | "current_amount"> & { user_id: string }) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('goals')
        .insert({
          user_id: data.user_id,
          title: data.title,
          target_amount: data.target_amount,
          target_date: data.target_date,
          current_amount: 0
        });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Goal added successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setIsAddingGoal(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while adding the goal",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderGoalForm = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Label htmlFor="title">Goal Title</Label>
        <Input id="title" placeholder="Vacation, New Car, etc." className="mb-4" />

        <Label htmlFor="target_amount">Target Amount</Label>
        <Input id="target_amount" placeholder="10000" type="number" className="mb-4" />

        <Label htmlFor="target_date">Target Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                format(date.from, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              {date?.to && date.to !== date.from ? (
                <>
                  {" - "}
                  {format(date.to, "PPP")}
                </>
              ) : null}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center" side="bottom">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              pagedNavigation
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        <div className="flex justify-between mt-4">
          <Button variant="secondary" onClick={() => setIsAddingGoal(false)}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              const title = (document.getElementById('title') as HTMLInputElement).value;
              const target_amount = parseFloat((document.getElementById('target_amount') as HTMLInputElement).value);
              const target_date = date?.to?.toISOString() || '';

              if (!title || isNaN(target_amount) || !target_date) {
                toast({
                  title: "Error",
                  description: "Please fill in all fields",
                  variant: "destructive",
                });
                return;
              }

              if (!user?.id) {
                toast({
                  title: "Error",
                  description: "User not authenticated",
                  variant: "destructive",
                });
                return;
              }

              await handleAddGoal({ 
                title, 
                target_amount, 
                target_date,
                user_id: user.id
              });
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Goal'}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="container py-8 space-y-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Savings Goals</h2>
            <p className="text-sm text-muted-foreground">Plan your future & save for it</p>
          </div>
          <Button onClick={() => setIsAddingGoal(true)}>Add New Goal</Button>
        </div>

        {isAddingGoal && renderGoalForm()}

        {isLoadingGoals ? (
          <p>Loading goals...</p>
        ) : (
          <>
            {/* Overall Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
                <CardDescription>Total savings across all goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Saved', value: totalProgress.totalCurrent },
                          { name: 'Remaining', value: totalProgress.totalTarget - totalProgress.totalCurrent }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {[0, 1].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#8B5CF6' : '#E5E7EB'} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                        contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '0.5rem' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-2xl font-bold">
                    ₹{totalProgress.totalCurrent.toLocaleString()} / ₹{totalProgress.totalTarget.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {((totalProgress.totalCurrent / totalProgress.totalTarget) * 100).toFixed(1)}% of total goal
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Individual Goals */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {goals?.map((goal, index) => (
                <Card key={goal.id} className="overflow-hidden hover-lift transition-all duration-200 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Target className="h-4 w-4 text-finley-purple" />
                      {goal.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Target: {new Date(goal.target_date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-[120px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Saved', value: goal.current_amount },
                              { name: 'Remaining', value: goal.target_amount - goal.current_amount }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={25}
                            outerRadius={35}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {[0, 1].map((entry, idx) => (
                              <Cell key={`cell-${idx}`} fill={idx === 0 ? COLORS[index % COLORS.length] : '#E5E7EB'} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #E5E7EB', 
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              padding: '0.5rem'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-3 text-center space-y-1">
                      <p className="text-lg font-semibold">
                        ₹{goal.current_amount.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-finley-neutral-light overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${(goal.current_amount / goal.target_amount) * 100}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {((goal.current_amount / goal.target_amount) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Goals;
