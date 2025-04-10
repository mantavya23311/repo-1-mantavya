import { useEffect, useState } from 'react';
import supabase from "../lib/supabaseClient";
export const useChartData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*');

      if (!error) setData(data);
    };

    fetchChartData();
  }, []);

  return data;
};
