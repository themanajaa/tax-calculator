import React from 'react';
import { motion } from 'framer-motion';
export * from '../types/tax';
import { formatCurrency, formatPercentage, getFilingStatusLabel } from '../utils/taxEngine';
import { TrendingUp, TrendingDown, DollarSign, Percent, Calculator } from 'lucide-react';

interface ResultSummaryProps {
  calculation: TaxCalculation;
  filingStatus: string;
}

export function ResultSummary({ calculation, filingStatus }: ResultSummaryProps) {
  const isRefund = calculation.refundOrBalanceDue > 0;
  const isBalanceDue = calculation.refundOrBalanceDue < 0;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="card-hover"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-primary-600" />
          Tax Summary
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your 2025 federal tax calculation for {getFilingStatusLabel(filingStatus)}
        </p>
      </div>

      <div className="space-y-6">
        {/* Key Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={itemVariants} className="card bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-primary-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Federal Tax Owed</h3>
            </div>
            <p className="text-2xl font-bold text-primary-600">
              {formatCurrency(calculation.federalTaxOwed)}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="card bg-gradient-to-br from-success-50 to-green-50 dark:from-success-900/20 dark:to-green-900/20">
            <div className="flex items-center gap-3 mb-2">
              {isRefund ? (
                <TrendingDown className="w-5 h-5 text-success-600" />
              ) : (
                <TrendingUp className="w-5 h-5 text-warning-600" />
              )}
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {isRefund ? 'Refund' : 'Balance Due'}
              </h3>
            </div>
            <p className={`text-2xl font-bold ${isRefund ? 'text-success-600' : 'text-warning-600'}`}>
              {formatCurrency(Math.abs(calculation.refundOrBalanceDue))}
            </p>
          </motion.div>
        </div>

        {/* Tax Rates */}
        <motion.div variants={itemVariants} className="card">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Percent className="w-5 h-5 text-primary-600" />
            Tax Rates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Marginal Tax Rate</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {formatPercentage(calculation.marginalRate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Effective Tax Rate</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {formatPercentage(calculation.effectiveRate)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Income Breakdown */}
        <motion.div variants={itemVariants} className="card">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Income Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Gross Income</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(calculation.grossIncome)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Adjusted Gross Income</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(calculation.adjustedGrossIncome)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Deductions</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(calculation.totalDeductions)}
              </span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 dark:text-white">Taxable Income</span>
                <span className="font-bold text-primary-600">
                  {formatCurrency(calculation.taxableIncome)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tax Bracket Breakdown */}
        {calculation.bracketBreakdown.length > 0 && (
          <motion.div variants={itemVariants} className="card">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Tax Bracket Breakdown</h3>
            <div className="space-y-2">
              {calculation.bracketBreakdown.map((breakdown, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {formatPercentage(breakdown.bracket.rate)} bracket
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(breakdown.taxAmount)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Disclaimer */}
        <motion.div variants={itemVariants} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <p className="font-semibold mb-2">Disclaimer:</p>
          <p>
            This calculator provides estimates based on 2025 federal tax rates and standard deductions. 
            Actual tax liability may vary based on specific circumstances, state taxes, and other factors. 
            Consult with a tax professional for personalized advice.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
