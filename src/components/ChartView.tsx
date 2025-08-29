import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
export * from '../types/tax';
import { formatCurrency } from '../utils/taxEngine';
import { PieChart as PieChartIcon } from 'lucide-react';

interface ChartViewProps {
  calculation: TaxCalculation;
}

export function ChartView({ calculation }: ChartViewProps) {
  // Prepare data for the pie chart
  const chartData = [
    {
      name: 'Federal Tax',
      value: calculation.federalTaxOwed,
      color: '#ef4444',
    },
    {
      name: 'Deductions',
      value: calculation.totalDeductions,
      color: '#22c55e',
    },
    {
      name: 'Taxable Income',
      value: calculation.taxableIncome,
      color: '#3b82f6',
    },
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 dark:text-white">
            {payload[0].name}
          </p>
          <p className="text-primary-600 font-medium">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload?.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card-hover"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <PieChartIcon className="w-6 h-6 text-primary-600" />
          Tax Breakdown
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Visual breakdown of your tax calculation
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Tax Owed</p>
          <p className="text-lg font-semibold text-red-600">
            {formatCurrency(calculation.federalTaxOwed)}
          </p>
        </div>
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Deductions</p>
          <p className="text-lg font-semibold text-green-600">
            {formatCurrency(calculation.totalDeductions)}
          </p>
        </div>
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Taxable Income</p>
          <p className="text-lg font-semibold text-blue-600">
            {formatCurrency(calculation.taxableIncome)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
