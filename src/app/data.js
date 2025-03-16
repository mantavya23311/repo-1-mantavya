import supabase from '../lib/supabaseClient';

// Fetch transactions data from Supabase
export async function getTransactions(userId) {
  const { data, error } = await supabase
    .from('transactions') // Your table name
    .select('*')
    .eq('user_id', userId); // Filter by user ID

  if (error) {
    console.error('Error fetching transactions:', error.message);
    return [];
  }

  return data;
}
