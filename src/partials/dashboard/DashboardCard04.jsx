import React from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04() {

  const chartData = {
    labels: [], // Empty array to remove date labels
    datasets: [
      // Red bars
      {
        label: 'Direct',
        data: [
          800, 1600, 900, 1300, 1950, 1700,
        ],
        backgroundColor: tailwindConfig().theme.colors.red[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.red[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Green bars
      {
        label: 'Indirect',
        data: [
          4900, 2600, 5350, 4800, 5200, 4800,
        ],
        backgroundColor: tailwindConfig().theme.colors.green[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Sales Comparison</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
      <footer className="flex items-center justify-between px-5 py-4 bg-gray-100 dark:bg-slate-700 border-t border-slate-100 dark:border-slate-800">
        <p className="text-sm text-slate-800 dark:text-slate-100">This is a footer.</p>
        <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none">
          View Details
        </button>
      </footer>
    </div>
  );
}

export default DashboardCard04;
