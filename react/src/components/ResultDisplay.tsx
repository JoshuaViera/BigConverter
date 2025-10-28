/**
 * ResultDisplay Component
 * Displays the conversion result or error message
 */

import React from 'react';
import { ConversionResult } from '../types/converter';

interface ResultDisplayProps {
  result: ConversionResult | null;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, error }) => {
  return (
    <div
      className={`
        bg-gradient-to-br from-gray-50 to-gray-200 px-7 py-8 rounded-xl
        text-center min-h-[90px] flex items-center justify-center
        shadow-sm transition-all duration-300
        ${result ? 'animate-pulse-once' : ''}
      `}
      role="status"
      aria-live="polite"
    >
      {error ? (
        <div className="text-red-500 font-semibold text-lg">
          ⚠️ {error}
        </div>
      ) : result ? (
        <div className="text-gray-800 font-medium text-lg leading-relaxed">
          <span className="text-primary-500 text-2xl font-bold">
            {result.originalValue.toFixed(4)} {result.fromUnit}
          </span>
          {' = '}
          <span className="text-primary-500 text-2xl font-bold">
            {result.result.toFixed(4)} {result.toUnit}
          </span>
        </div>
      ) : (
        <div className="text-gray-600 font-medium text-base">
          Enter a value and click Convert
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;