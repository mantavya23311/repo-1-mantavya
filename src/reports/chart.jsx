// src/reports/data.ts
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';

export interface ChartDataPoint {
  name: string;
  value: number;
}

export const useFinanceInsights = () => {
  const [data, setData] = useState({
    expenses: 0,
    income: 0,
    transactions: 0,
    monthlyBreakdown: [] as ChartDataPoint[],
  });

  useEffect(() => {
    const fetchData = async () => {
      // Fetch total income, expenses, and transactions for a specific user (e.g., user_id = 1)
      const { data: reports, error } = await supabase
        .from('Report')
        .select('income, expense, startdate')
        .eq('accountid', 1); // Change 1 to dynamic user/account id if needed

      if (error) {
        console.error('Error fetching report:', error);
        return;
      }

      let totalIncome = 0;
      let totalExpense = 0;
      const monthlyMap: Record<string, number> = {};

      reports?.forEach((report) => {
        totalIncome += report.income;
        totalExpense += report.expense;

        const month = new Date(report.startdate).toLocaleString('default', { month: 'short', year: 'numeric' });
        monthlyMap[month] = (monthlyMap[month] || 0) + report.expense;
      });

      const { count: transactionCount } = await supabase
        .from('Transaction')
        .select('*', { count: 'exact', head: true })
        .eq('accountid', 1); // Same user/account ID

      setData({
        expenses: totalExpense,
        income: totalIncome,
        transactions: transactionCount || 0,
        monthlyBreakdown: Object.entries(monthlyMap).map(([name, value]) => ({ name, value })),
      });
    };

    fetchData();
  }, []);

  return data;
};
