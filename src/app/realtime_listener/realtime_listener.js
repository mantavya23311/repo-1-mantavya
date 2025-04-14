"use client";

import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import styles from './Dashboard.module.css'; // CSS import here

ChartJS.register(...registerables);

const RealTimeFinance = () => {
  // ... [keep all your existing code] ...
  
  return (
    <div className={styles.dashboard}> {/* Updated className */}
      <h1>Financial Dashboard</h1>
      
      <div className={styles.charts}>
        <div className={styles.chartContainer}>
          <h2>Transaction History</h2>
          <Bar data={chartData.bar} />
        </div>
        
        <div className={styles.chartContainer}>
          <h2>By Category</h2>
          <Pie data={chartData.pie} />
        </div>
      </div>
    </div>
  );
};

export default RealTimeFinance;
