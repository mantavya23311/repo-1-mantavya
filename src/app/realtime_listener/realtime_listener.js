"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

const RealTimeFinance = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await supabase.from("finance").select("*");
      if (error) console.error("Error fetching transactions:", error);
      else setTransactions(data);
    };

    fetchTransactions();

    // Listen for real-time updates
    const subscription = supabase
      .channel("finance-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "finance" },
        (payload) => {
          console.log("Change received!", payload);
          fetchTransactions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div>
      <h1>Financial Reports</h1>
      <ul>
        {transactions.map((item) => (
          <li key={item.id}>
            {item.type}: ${item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeFinance;
