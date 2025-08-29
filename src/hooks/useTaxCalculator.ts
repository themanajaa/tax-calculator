import { useState, useCallback, useMemo } from 'react';
export * from '../types/tax';
import { calculateTax } from '../utils/taxEngine';

const DEFAULT_INPUTS: TaxInputs = {
  filingStatus: 'single',
  grossIncome: 75000,
  preTaxContributions: {
    retirement401k: 22500,
    hsa: 4150,
    other: 0,
  },
  deductionType: 'standard',
  itemizedDeductions: 0,
  taxCredits: 0,
  taxWithheld: 12000,
};

export function useTaxCalculator() {
  const [inputs, setInputs] = useState<TaxInputs>(DEFAULT_INPUTS);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculation = useMemo(() => {
    if (!isCalculated) return null;
    return calculateTax(inputs);
  }, [inputs, isCalculated]);

  const updateInput = useCallback((field: keyof TaxInputs, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value,
    }));
    setIsCalculated(false);
  }, []);

  const updatePreTaxContribution = useCallback((field: keyof TaxInputs['preTaxContributions'], value: number) => {
    setInputs(prev => ({
      ...prev,
      preTaxContributions: {
        ...prev.preTaxContributions,
        [field]: value,
      },
    }));
    setIsCalculated(false);
  }, []);

  const calculate = useCallback(() => {
    setIsCalculated(true);
  }, []);

  const reset = useCallback(() => {
    setInputs(DEFAULT_INPUTS);
    setIsCalculated(false);
  }, []);

  return {
    inputs,
    calculation,
    isCalculated,
    updateInput,
    updatePreTaxContribution,
    calculate,
    reset,
  };
}
