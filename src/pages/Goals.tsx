import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from '@/components/ui/use-toast';

type Goal = {
  id: string;
  user_id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
};

const Goals = () => {
  const { user } = useAuth();
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

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
  })

  const handleAddGoal = async (data: Omit<Goal, "id" | "current_amount">) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('goals')
        .insert({
          user_id: user?.id,
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
      queryClient.invalidateQueries(['goals']);
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
              className={format(date?.from as Date, "PPP")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                format(date?.from as Date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              {" - "}
              {date?.to ? (
                format(date?.to as Date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
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

              await handleAddGoal({ title, target_amount, target_date });
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
    <div className="container space-y-6 animate-slide-up">
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
        <ScrollArea className="h-[400px] w-full rounded-md border">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
            {goals?.map((goal) => (
              <Card key={goal.id} className="overflow-hidden hover-lift">
                <CardHeader>
                  <CardTitle>{goal.title}</CardTitle>
                  <CardDescription>
                    Target Date: {new Date(goal.target_date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${goal.current_amount} / ${goal.target_amount}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Goals;
