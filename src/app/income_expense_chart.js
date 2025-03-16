import { Bar } from 'react-chartjs-2';

export default function IncomeExpenseChart({ income, expense }) {
  const data = {
    labels: ['Income', 'Expense'],
    datasets: [{
      label: 'Amount',
      data: [income, expense],
      backgroundColor: ['#4CAF50', '#FF5252'],
    }],
  };

  return <Bar data={data} />;
}
