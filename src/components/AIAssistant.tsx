import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export * from '../types/tax';
import { Bot, Send, X, Loader2 } from 'lucide-react';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<AIAssistantMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your tax assistant. I can help explain tax concepts, deductions, and answer questions about your tax calculation. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: AIAssistantMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (in a real app, this would call OpenAI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const assistantMessage: AIAssistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('marginal') || lowerQuestion.includes('tax rate')) {
      return 'The marginal tax rate is the tax rate you pay on your last dollar of income. It\'s the highest tax bracket your income falls into. For example, if you\'re in the 22% bracket, your marginal rate is 22%.';
    }
    
    if (lowerQuestion.includes('effective') || lowerQuestion.includes('average')) {
      return 'The effective tax rate is your total tax divided by your total income. It\'s usually lower than your marginal rate because of the progressive tax system and deductions.';
    }
    
    if (lowerQuestion.includes('deduction') || lowerQuestion.includes('standard')) {
      return 'Standard deduction is a fixed amount that reduces your taxable income. For 2025, it\'s $14,600 for single filers, $29,200 for married filing jointly. You can choose between standard or itemized deductions, whichever is higher.';
    }
    
    if (lowerQuestion.includes('401k') || lowerQuestion.includes('retirement')) {
      return '401(k) contributions are pre-tax, meaning they reduce your taxable income. For 2025, you can contribute up to $22,500 ($30,000 if 50+). This directly reduces your tax bill!';
    }
    
    if (lowerQuestion.includes('hsa') || lowerQuestion.includes('health')) {
      return 'HSA (Health Savings Account) contributions are also pre-tax and reduce your taxable income. For 2025, limits are $4,150 for individual coverage and $8,300 for family coverage.';
    }
    
    if (lowerQuestion.includes('credit') || lowerQuestion.includes('refund')) {
      return 'Tax credits directly reduce your tax bill dollar-for-dollar, unlike deductions which reduce taxable income. Common credits include Child Tax Credit, Earned Income Tax Credit, and education credits.';
    }
    
    return 'I\'m here to help with tax questions! You can ask about marginal vs effective tax rates, deductions, credits, retirement accounts, or any other tax-related topics.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 bottom-4 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Tax Assistant</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about taxes..."
                className="flex-1 input-field text-sm"
                disabled={isLoading}
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="btn-ai p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
