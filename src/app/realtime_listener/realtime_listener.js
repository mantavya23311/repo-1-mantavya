"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const RealTimeFinance = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("finance")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const subscription = supabase
      .channel("realtime-finance")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "finance" },
        () => fetchData()
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (!transactions.length) return <div className="no-data">No transactions found</div>;

  const chartData = {
    bar: {
      labels: transactions.map(t => new Date(t.created_at).toLocaleDateString()),
      datasets: [{
        label: "Amount",
        data: transactions.map(t => t.amount),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      }]
    },
    pie: {
      labels: [...new Set(transactions.map(t => t.type))],
      datasets: [{
        data: [...new Set(transactions.map(t => t.type))].map(type => 
          transactions.filter(t => t.type === type).reduce((sum, t) => sum + t.amount, 0)
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
        ],
      }]
    }
  };

  return (
    <div className="dashboard">
      <h1>Financial Dashboard</h1>
      
      <div className="charts">
        <div className="chart-container">
          <h2>Transaction History</h2>
          <Bar data={chartData.bar} />
        </div>
        
        <div className="chart-container">
          <h2>By Category</h2>
          <Pie data={chartData.pie} />
        </div>
      </div>
    </div>
  );
};

export default RealTimeFinance;
