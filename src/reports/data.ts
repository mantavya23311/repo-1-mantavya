// components/useChartData.ts
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';

export interface ChartDataPoint {
  name: string;   // e.g., month name
  value: number;  // e.g., total sales
}

// Define the shape of the data as returned from Supabase
interface ReportRow {
  month: string;
  amount: number;
}

export const useChartData = () => {
  const [data, setData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const { data: rows, error } = await supabase
        .from('reports')  // your Supabase table name
        .select('month, amount');

      if (error) {
        console.error('Supabase fetch error:', error);
        return;
      }

      // Type-safe mapping of database rows to chart data points
      const formatted = (rows as ReportRow[]).map((row) => ({
        name: row.month,
        value: row.amount,
      }));

      setData(formatted);
    };

    fetchChartData();
  }, []);

  return data;
};
