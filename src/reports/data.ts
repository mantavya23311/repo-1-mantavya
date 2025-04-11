// components/useChartData.ts
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';

export interface ChartDataPoint {
  name: string;   // e.g., month name
  value: number;  // e.g., total sales
}

export const useChartData = () => {
  const [data, setData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const { data: rows, error } = await supabase
        .from('reports')  // change to your actual table name
        .select('month, amount'); // column names in your Supabase table

      if (error) {
        console.error('Supabase fetch error:', error);
        return;
      }

      // Optional: Map DB column names to chart-friendly format
      const formatted = rows.map((row: any) => ({
        name: row.month,
        value: row.amount,
      }));

      setData(formatted);
    };

    fetchChartData();
  }, []);

  return data;
};

