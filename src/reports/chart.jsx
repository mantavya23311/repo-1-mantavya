// components/Chart.tsx
'use client';

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useFinanceInsights } from '@/reports/data';

const COLORS = ['#0088FE', '#FF8042'];

const Chart = () => {
  const { income, expenses, transactions, monthlyBreakdown } = useFinanceInsights();

  return (
    <div className="space-y-10">
      <h2 className="text-xl font-bold">Monthly Expense Trend</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <LineChart data={monthlyBreakdown}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" name="Expense" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2 className="text-xl font-bold">Income vs Expense</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <BarChart data={[{ name: 'Finance', income, expenses }]}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4CAF50" />
            <Bar dataKey="expenses" fill="#FF5252" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 className="text-xl font-bold">Distribution</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={[{ name: 'Income', value: income }, { name: 'Expenses', value: expenses }]}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-lg font-medium">
        Total Transactions: {transactions}
      </div>
    </div>
  );
};

export default Chart;
