import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultSummary } from './components/ResultSummary';
import { ChartView } from './components/ChartView';
import { AIAssistant } from './components/AIAssistant';
import { DarkModeToggle } from './components/DarkModeToggle';
import { useTaxCalculator } from './hooks/useTaxCalculator';
import { Bot, Calculator } from 'lucide-react';

function App() {
  const {
    inputs,
    calculation,
    isCalculated,
    updateInput,
    updatePreTaxContribution,
    calculate,
    reset,
  } = useTaxCalculator();

  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Calculator className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Tax Estimator
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  2025 Federal Tax Calculator • Educational Demo
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <DarkModeToggle />
              <motion.button
                onClick={() => setIsAIAssistantOpen(true)}
                className="btn-ai flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bot className="w-4 h-4" />
                <span className="hidden sm:inline">AI Assistant</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Calculator Form */}
          <div className="space-y-8">
            <CalculatorForm
              inputs={inputs}
              onInputChange={updateInput}
              onPreTaxChange={updatePreTaxContribution}
              onCalculate={calculate}
              onReset={reset}
            />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-8">
            {isCalculated && calculation && (
              <>
                <ResultSummary
                  calculation={calculation}
                  filingStatus={inputs.filingStatus}
                />
                <ChartView calculation={calculation} />
              </>
            )}

            {!isCalculated && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-hover text-center py-12"
              >
                <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Fill out the form and click "Calculate Tax" to see your results
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Tax Calculator
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Built with modern React, TypeScript, and Tailwind CSS. Features real-time calculations, 
              beautiful visualizations, and AI-powered assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Accurate Calculations
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Uses 2025 federal tax brackets and standard deductions for precise estimates
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bot className="w-6 h-6 text-success-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                AI Assistant
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get instant answers to tax questions and explanations of complex concepts
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Visual Charts
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Interactive pie charts and breakdowns to understand your tax composition
              </p>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Educational Disclaimer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h3 className="font-semibold text-amber-800 dark:text-amber-200">Educational Purpose Disclaimer</h3>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                This calculator is provided for <strong>educational and demonstration purposes only</strong>. 
                The calculations are based on 2025 federal tax brackets and standard deductions, but may not 
                include all applicable credits, deductions, or special circumstances. For accurate tax filing, 
                please consult with a qualified tax professional or use official IRS resources.
              </p>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p className="mb-2">
                Built with React, TypeScript, Tailwind CSS, and Framer Motion
              </p>
              <p className="mb-2">
                Tax data sourced from IRS 2025 tax brackets and standard deductions
              </p>
              <p className="text-xs">
              Built with ❤️ by <span className="font-medium text-gray-700 dark:text-gray-300">Sami Abdelmlek</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIAssistant
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />
    </div>
  );
}

export default App;
