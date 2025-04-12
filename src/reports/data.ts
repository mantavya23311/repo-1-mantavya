// src/reports/data.ts
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';

export interface ChartDataPoint {
  name: string;   // e.g., month name
  value: number;  // e.g., total sales
}

interface ReportRow {
  month: string;
  amount: number;
}

export const useChartData = () => {
  const [data, setData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await supabase
        .from('reports')
        .select('month, amount');

      if (response.error) {
        console.error('Supabase fetch error:', response.error);
        return;
      }

      const formatted = (response.data as ReportRow[]).map((row) => ({
        name: row.month,
        value: row.amount,
      }));

      setData(formatted);
    };

    fetchChartData();
  }, []);

  return data;
};
