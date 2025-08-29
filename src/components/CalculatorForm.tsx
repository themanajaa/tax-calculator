import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw } from 'lucide-react';
export * from '../types/tax';
import { getFilingStatusLabel, getDeductionTypeLabel } from '../utils/taxEngine';

interface CalculatorFormProps {
  inputs: TaxInputs;
  onInputChange: (field: keyof TaxInputs, value: any) => void;
  onPreTaxChange: (field: keyof TaxInputs['preTaxContributions'], value: number) => void;
  onCalculate: () => void;
  onReset: () => void;
}

export function CalculatorForm({
  inputs,
  onInputChange,
  onPreTaxChange,
  onCalculate,
  onReset,
}: CalculatorFormProps) {
  const filingStatusOptions: { value: FilingStatus; label: string }[] = [
    { value: 'single', label: 'Single' },
    { value: 'married-joint', label: 'Married Filing Jointly' },
    { value: 'married-separate', label: 'Married Filing Separately' },
    { value: 'head-of-household', label: 'Head of Household' },
  ];

  const deductionTypeOptions: { value: DeductionType; label: string }[] = [
    { value: 'standard', label: 'Standard Deduction' },
    { value: 'itemized', label: 'Itemized Deductions' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card-hover"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Tax Calculator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your information to calculate your 2025 federal tax estimate
        </p>
      </div>

      <div className="space-y-6">
        {/* Filing Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filing Status
          </label>
          <select
            value={inputs.filingStatus}
            onChange={(e) => onInputChange('filingStatus', e.target.value)}
            className="input-field"
          >
            {filingStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Gross Income */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gross Income
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              value={inputs.grossIncome}
              onChange={(e) => onInputChange('grossIncome', Number(e.target.value))}
              className="input-field pl-8"
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        {/* Pre-tax Contributions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Pre-tax Contributions
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              401(k) Contributions
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                value={inputs.preTaxContributions.retirement401k}
                onChange={(e) => onPreTaxChange('retirement401k', Number(e.target.value))}
                className="input-field pl-8"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              HSA Contributions
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                value={inputs.preTaxContributions.hsa}
                onChange={(e) => onPreTaxChange('hsa', Number(e.target.value))}
                className="input-field pl-8"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Other Pre-tax Contributions
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                value={inputs.preTaxContributions.other}
                onChange={(e) => onPreTaxChange('other', Number(e.target.value))}
                className="input-field pl-8"
                placeholder="0"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Deduction Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Deduction Type
          </label>
          <select
            value={inputs.deductionType}
            onChange={(e) => onInputChange('deductionType', e.target.value)}
            className="input-field"
          >
            {deductionTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Itemized Deductions (conditional) */}
        {inputs.deductionType === 'itemized' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Itemized Deductions
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                value={inputs.itemizedDeductions}
                onChange={(e) => onInputChange('itemizedDeductions', Number(e.target.value))}
                className="input-field pl-8"
                placeholder="0"
                min="0"
              />
            </div>
          </motion.div>
        )}

        {/* Tax Credits */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tax Credits
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              value={inputs.taxCredits}
              onChange={(e) => onInputChange('taxCredits', Number(e.target.value))}
              className="input-field pl-8"
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        {/* Tax Withheld */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tax Already Withheld
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              value={inputs.taxWithheld}
              onChange={(e) => onInputChange('taxWithheld', Number(e.target.value))}
              className="input-field pl-8"
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <motion.button
            onClick={onCalculate}
            className="btn-primary flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calculator className="w-5 h-5" />
            Calculate Tax
          </motion.button>
          <motion.button
            onClick={onReset}
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
