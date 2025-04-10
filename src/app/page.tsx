// app/page.tsx or pages/index.tsx
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('@/components/Chart'), { ssr: false });

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Supabase Chart</h1>
      <Chart />
    </main>
  );
}

