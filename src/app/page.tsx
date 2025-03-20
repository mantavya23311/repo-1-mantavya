import Image from "next/image";
import supabase from "../lib/supabaseClient";
export default async function Reports() {
  const { data, error } = await supabase
    .from("transactions")
    .select("*");

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
}
