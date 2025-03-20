import supabase from '../lib/supabaseClient';

// Fetch transactions data from Supabase
export async function getTransactions(userId) {
  try {
    const { data, error } = await supabase
      .from('transactions') // Your table name
      .select('*')
      .eq('user_id', userId); // Filter by user ID

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error loading transactions:', error.message);
    return [];
  }
}

