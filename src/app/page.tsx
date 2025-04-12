// src/app/page.tsx
'use client';

import dynamic from 'next/dynamic';

const DynamicChart = dynamic(() => import('@/reports/chart'), { ssr: false });

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <DynamicChart />
    </div>
  );
}
