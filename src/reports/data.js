import supabase from '../lib/supabaseClient';

// Fetch transactions data from Supabase
export async function getTransactions(userId) {
  const { data, error } = await supabase
    .from('transactions') // Your table name
<<<<<<< HEAD
    .select('*');
    if (error) {
      return <div>Error loading transactions: {error.message}</div>;
    } 
    return (
      <div>
        <h1>Financial Reports</h1>
        <ul>
          {data.map((transaction) => (
            <li key={transaction.id}>
              {transaction.type}: ${transaction.amount}
            </li>
          ))}
        </ul>
      </div>
    );
=======
    .select('*')
    .eq('user_id', userId); // Filter by user ID

  if (error) {
    console.error('Error fetching transactions:', error.message);
    return [];
  }

  return data;
>>>>>>> 7e84877 (Track all untracked files)
}
