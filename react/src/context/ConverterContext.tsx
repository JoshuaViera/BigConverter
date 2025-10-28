/**
 * Converter Context - Global State Management
 */

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ConversionType, ConverterState, ConverterMode } from '../types/converter';
import { isValidInput, performConversion } from '../utils/converter';

interface ConverterContextType {
  state: ConverterState;
  handleInputChange: (value: string) => void;
  switchMode: (mode: ConverterMode) => void;
  toggleConversionType: () => void;
  handleConvert: () => void;
}

const ConverterContext = createContext<ConverterContextType | undefined>(undefined);

export const useConverter = () => {
  const context = useContext(ConverterContext);
  if (!context) {
    throw new Error('useConverter must be used within ConverterProvider');
  }
  return context;
};

export const ConverterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ConverterState>({
    inputValue: '',
    conversionType: ConversionType.KM_TO_MI,
    converterMode: ConverterMode.DISTANCE,
    result: null,
    error: null
  });

  const handleInputChange = useCallback((value: string) => {
    setState(prev => ({ ...prev, inputValue: value, error: null }));
  }, []);

  const switchMode = useCallback((mode: ConverterMode) => {
    setState(prev => ({
      ...prev,
      converterMode: mode,
      conversionType: mode === ConverterMode.DISTANCE ? ConversionType.KM_TO_MI : ConversionType.C_TO_F,
      result: null,
      error: null,
      inputValue: ''
    }));
  }, []);

  const toggleConversionType = useCallback(() => {
    setState(prev => {
      const isDistance = prev.converterMode === ConverterMode.DISTANCE;
      const newType = isDistance
        ? (prev.conversionType === ConversionType.KM_TO_MI ? ConversionType.MI_TO_KM : ConversionType.KM_TO_MI)
        : (prev.conversionType === ConversionType.C_TO_F ? ConversionType.F_TO_C : ConversionType.C_TO_F);
      return { ...prev, conversionType: newType, result: null, error: null };
    });
  }, []);

  const handleConvert = useCallback(() => {
    if (!isValidInput(state.inputValue)) {
      setState(prev => ({ ...prev, result: null, error: 'Please enter a valid number' }));
      return;
    }
    const numericValue = parseFloat(state.inputValue);
    if (state.converterMode === ConverterMode.DISTANCE && numericValue < 0) {
      setState(prev => ({ ...prev, result: null, error: 'Please enter a positive number' }));
      return;
    }
    const result = performConversion(numericValue, state.conversionType);
    setState(prev => ({ ...prev, result, error: null }));
  }, [state.inputValue, state.conversionType, state.converterMode]);

  return (
    <ConverterContext.Provider value={{ state, handleInputChange, switchMode, toggleConversionType, handleConvert }}>
      {children}
    </ConverterContext.Provider>
  );
};