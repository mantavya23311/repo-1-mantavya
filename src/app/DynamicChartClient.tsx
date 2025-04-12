'use client';

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('@/reports/chart'), {
  ssr: false,
});

export default Chart;
