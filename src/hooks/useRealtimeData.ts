
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Table = 'expenses' | 'goals' | 'budgets' | 'records_summary';
type Event = 'INSERT' | 'UPDATE' | 'DELETE' | '*';

export const useRealtimeData = (
  table: Table,
  event: Event | Event[] = '*',
  onUpdate: (payload: any) => void,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return;

    const events = Array.isArray(event) ? event : [event];
    
    // Create a channel name with a unique identifier
    const channelName = `table-changes-${table}-${Math.random().toString(36).substring(2, 11)}`;
    
    // Using the correct channel syntax for Supabase
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { 
          event: events[0] as 'INSERT' | 'UPDATE' | 'DELETE' | '*', 
          schema: 'public',
          table: table 
        },
        (payload) => {
          console.log(`Realtime update received for ${table}:`, payload);
          onUpdate(payload);
        }
      )
      .subscribe((status) => {
        console.log(`Realtime subscription status for ${table}:`, status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, event, onUpdate, enabled]);
};
