/**
 * ConversionOption Component
 * Radio button option for selecting conversion direction
 */

import React from 'react';
import { ConversionType } from '../types/converter';

interface ConversionOptionProps {
  id: string;
  value: ConversionType;
  label: string;
  checked: boolean;
  onChange: (type: ConversionType) => void;
}

const ConversionOption: React.FC<ConversionOptionProps> = ({
  id,
  value,
  label,
  checked,
  onChange
}) => {
  return (
    <div
      className={`
        flex items-center gap-3 px-6 py-4 border-2 rounded-xl cursor-pointer
        transition-all duration-300 flex-1 min-w-[200px]
        ${checked 
          ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-primary-100 shadow-md' 
          : 'border-gray-300 bg-white hover:border-primary-400 hover:bg-primary-50 hover:-translate-y-0.5 hover:shadow-sm'
        }
      `}
      onClick={() => onChange(value)}
    >
      <input
        type="radio"
        id={id}
        name="conversion"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="w-5 h-5 cursor-pointer accent-primary-500"
      />
      <label
        htmlFor={id}
        className={`
          cursor-pointer font-medium text-[15px] transition-colors
          ${checked ? 'text-primary-600 font-semibold' : 'text-gray-700'}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default ConversionOption;