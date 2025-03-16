import IncomeExpenseChart from '../components/IncomeExpenseChart';
import { getTransactions, calculateInsights } from '../utils/data';

export default function Dashboard({ transactions }) {
  const { totalIncome, totalExpense } = calculateInsights(transactions);

  return (
    <div>
      <h2 className="text-xl font-bold">Financial Insights</h2>
      <IncomeExpenseChart income={totalIncome} expense={totalExpense} />
    </div>
  );
}

export async function getServerSideProps() {
  const transactions = await getTransactions('user-id');
  return { props: { transactions } };
}
