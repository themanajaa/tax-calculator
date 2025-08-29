import type {
  TaxInputs,
  TaxCalculation,
  TaxBracket,
  BracketBreakdown,
} from '../types/tax';
import {
  STANDARD_DEDUCTIONS_2025,
  TAX_BRACKETS_2025,
} from '../types/tax';

export function calculateTax(inputs: TaxInputs): TaxCalculation {
  // Calculate Adjusted Gross Income (AGI)
  const totalPreTaxContributions = 
    inputs.preTaxContributions.retirement401k +
    inputs.preTaxContributions.hsa +
    inputs.preTaxContributions.other;
  
  const adjustedGrossIncome = inputs.grossIncome - totalPreTaxContributions;

  // Calculate deductions
  const standardDeduction = STANDARD_DEDUCTIONS_2025[inputs.filingStatus];
  const totalDeductions = inputs.deductionType === 'standard' 
    ? standardDeduction 
    : Math.max(standardDeduction, inputs.itemizedDeductions);

  // Calculate taxable income
  const taxableIncome = Math.max(0, adjustedGrossIncome - totalDeductions);

  // Calculate federal tax using progressive brackets
  const bracketBreakdown = calculateBracketBreakdown(taxableIncome, inputs.filingStatus);
  const federalTaxOwed = bracketBreakdown.reduce((total, breakdown) => total + breakdown.taxAmount, 0);

  // Apply tax credits
  const taxAfterCredits = Math.max(0, federalTaxOwed - inputs.taxCredits);

  // Calculate rates
  const marginalRate = calculateMarginalRate(taxableIncome, inputs.filingStatus);
  const effectiveRate = adjustedGrossIncome > 0 ? (taxAfterCredits / adjustedGrossIncome) : 0;

  // Calculate refund or balance due
  const refundOrBalanceDue = inputs.taxWithheld - taxAfterCredits;

  return {
    grossIncome: inputs.grossIncome,
    adjustedGrossIncome,
    taxableIncome,
    federalTaxOwed: taxAfterCredits,
    marginalRate,
    effectiveRate,
    refundOrBalanceDue,
    standardDeduction,
    totalDeductions,
    bracketBreakdown,
  };
}

function calculateBracketBreakdown(taxableIncome: number, filingStatus: string): BracketBreakdown[] {
  const brackets = TAX_BRACKETS_2025[filingStatus as keyof typeof TAX_BRACKETS_2025];
  const breakdown: BracketBreakdown[] = [];

  for (const bracket of brackets) {
    if (taxableIncome <= bracket.minIncome) break;

    const maxTaxableInBracket = bracket.maxIncome 
      ? Math.min(taxableIncome, bracket.maxIncome) 
      : taxableIncome;
    
    const taxableAmount = maxTaxableInBracket - bracket.minIncome;
    
    if (taxableAmount > 0) {
      breakdown.push({
        bracket,
        taxableAmount,
        taxAmount: taxableAmount * bracket.rate,
      });
    }
  }

  return breakdown;
}

function calculateMarginalRate(taxableIncome: number, filingStatus: string): number {
  const brackets = TAX_BRACKETS_2025[filingStatus as keyof typeof TAX_BRACKETS_2025];
  
  for (const bracket of brackets) {
    if (taxableIncome <= bracket.minIncome) continue;
    
    if (!bracket.maxIncome || taxableIncome <= bracket.maxIncome) {
      return bracket.rate;
    }
  }
  
  // If we get here, we're in the highest bracket
  return brackets[brackets.length - 1].rate;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercentage(rate: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(rate);
}

export function getFilingStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    'single': 'Single',
    'married-joint': 'Married Filing Jointly',
    'married-separate': 'Married Filing Separately',
    'head-of-household': 'Head of Household',
  };
  return labels[status] || status;
}

export function getDeductionTypeLabel(type: string): string {
  return type === 'standard' ? 'Standard Deduction' : 'Itemized Deductions';
}
