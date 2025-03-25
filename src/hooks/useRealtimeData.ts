
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
    
    const channel = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        { 
          event: events[0], // Use the first event for channel creation
          schema: 'public',
          table: table 
        },
        (payload) => {
          console.log(`Realtime update received for ${table}:`, payload);
          onUpdate(payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, event, onUpdate, enabled]);
};
