import { supabase } from '../lib/supabase';

supabase
  .channel('public:transactions')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, (payload) => {
    console.log('Change received!', payload);
  })
  .subscribe();
