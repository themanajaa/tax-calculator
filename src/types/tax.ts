export type FilingStatus = 'single' | 'married-joint' | 'married-separate' | 'head-of-household';

export type DeductionType = 'standard' | 'itemized';

export interface TaxBracket {
  rate: number;
  minIncome: number;
  maxIncome?: number;
}

export interface TaxInputs {
  filingStatus: FilingStatus;
  grossIncome: number;
  preTaxContributions: {
    retirement401k: number;
    hsa: number;
    other: number;
  };
  deductionType: DeductionType;
  itemizedDeductions: number;
  taxCredits: number;
  taxWithheld: number;
}

export interface TaxCalculation {
  grossIncome: number;
  adjustedGrossIncome: number;
  taxableIncome: number;
  federalTaxOwed: number;
  marginalRate: number;
  effectiveRate: number;
  refundOrBalanceDue: number;
  standardDeduction: number;
  totalDeductions: number;
  bracketBreakdown: BracketBreakdown[];
}

export interface BracketBreakdown {
  bracket: TaxBracket;
  taxableAmount: number;
  taxAmount: number;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}

export interface AIAssistantMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface TaxBrackets2025 {
  single: TaxBracket[];
  'married-joint': TaxBracket[];
  'married-separate': TaxBracket[];
  'head-of-household': TaxBracket[];
}

export const STANDARD_DEDUCTIONS_2025: Record<FilingStatus, number> = {
  single: 14600,
  'married-joint': 29200,
  'married-separate': 14600,
  'head-of-household': 21900,
};

export const TAX_BRACKETS_2025: TaxBrackets2025 = {
  single: [
    { rate: 0.10, minIncome: 0, maxIncome: 11600 },
    { rate: 0.12, minIncome: 11600, maxIncome: 47150 },
    { rate: 0.22, minIncome: 47150, maxIncome: 100525 },
    { rate: 0.24, minIncome: 100525, maxIncome: 191950 },
    { rate: 0.32, minIncome: 191950, maxIncome: 243725 },
    { rate: 0.35, minIncome: 243725, maxIncome: 609350 },
    { rate: 0.37, minIncome: 609350 },
  ],
  'married-joint': [
    { rate: 0.10, minIncome: 0, maxIncome: 23200 },
    { rate: 0.12, minIncome: 23200, maxIncome: 94300 },
    { rate: 0.22, minIncome: 94300, maxIncome: 201050 },
    { rate: 0.24, minIncome: 201050, maxIncome: 383900 },
    { rate: 0.32, minIncome: 383900, maxIncome: 487450 },
    { rate: 0.35, minIncome: 487450, maxIncome: 731200 },
    { rate: 0.37, minIncome: 731200 },
  ],
  'married-separate': [
    { rate: 0.10, minIncome: 0, maxIncome: 11600 },
    { rate: 0.12, minIncome: 11600, maxIncome: 47150 },
    { rate: 0.22, minIncome: 47150, maxIncome: 100525 },
    { rate: 0.24, minIncome: 100525, maxIncome: 191950 },
    { rate: 0.32, minIncome: 191950, maxIncome: 243725 },
    { rate: 0.35, minIncome: 243725, maxIncome: 365600 },
    { rate: 0.37, minIncome: 365600 },
  ],
  'head-of-household': [
    { rate: 0.10, minIncome: 0, maxIncome: 16550 },
    { rate: 0.12, minIncome: 16550, maxIncome: 63100 },
    { rate: 0.22, minIncome: 63100, maxIncome: 100500 },
    { rate: 0.24, minIncome: 100500, maxIncome: 191950 },
    { rate: 0.32, minIncome: 191950, maxIncome: 243700 },
    { rate: 0.35, minIncome: 243700, maxIncome: 609350 },
    { rate: 0.37, minIncome: 609350 },
  ],
};
