"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

// Register ChartJS components
ChartJS.register(...registerables);

const RealTimeFinance = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("finance").select("*");
      if (error) {
        console.error("Error fetching transactions:", error);
      } else {
        setTransactions(data);
      }
      setLoading(false);
    };

    fetchTransactions();

    // Real-time subscription
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

  // Prepare chart data
  const prepareChartData = () => {
    const labels = transactions.map((t) => new Date(t.created_at).toLocaleDateString());
    const amounts = transactions.map((t) => t.amount);
    const types = [...new Set(transactions.map((t) => t.type))];
    
    const typeTotals = {};
    types.forEach(type => {
      typeTotals[type] = transactions
        .filter(t => t.type === type)
        .reduce((sum, t) => sum + t.amount, 0);
    });

    return {
      barData: {
        labels,
        datasets: [
          {
            label: "Transaction Amounts",
            data: amounts,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      pieData: {
        labels: types,
        datasets: [
          {
            data: types.map(type => typeTotals[type]),
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    };
  };

  const { barData, pieData } = prepareChartData();

  if (loading) return <div>Loading data...</div>;
  if (transactions.length === 0) return <div>No transactions found</div>;

  return (
    <div className="dashboard-container">
      <h1>Financial Dashboard</h1>
      
      <div className="chart-row">
        <div className="chart-container">
          <h2>Transaction History</h2>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
        </div>
        
        <div className="chart-container">
          <h2>Spending by Category</h2>
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "right",
                },
              },
            }}
          />
        </div>
      </div>
      
      <div className="transactions-list">
        <h2>Recent Transactions</h2>
        <ul>
          {transactions.slice(0, 5).map((item) => (
            <li key={item.id}>
              {item.type}: ${item.amount} - {new Date(item.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RealTimeFinance;
