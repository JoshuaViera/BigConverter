/**
 * Conversion utilities and constants
 */

import { ConversionType, ConversionRates, ConversionResult } from '../types/converter';

export const CONVERSION_RATES: ConversionRates = {
  KM_TO_MI: 0.621371,
  MI_TO_KM: 1.60934
};

/**
 * Validates if the input is a valid number
 */
export const isValidInput = (value: string): boolean => {
  return value.trim() !== '' && !isNaN(parseFloat(value)) && isFinite(Number(value));
};

/**
 * Performs the unit conversion
 */
export const performConversion = (
  value: number,
  conversionType: ConversionType
): ConversionResult => {
  let result: number;
  let fromUnit: string;
  let toUnit: string;
  let conversionRate: number | undefined;

  switch (conversionType) {
    case ConversionType.KM_TO_MI:
      result = value * CONVERSION_RATES.KM_TO_MI;
      fromUnit = 'km';
      toUnit = 'mi';
      conversionRate = CONVERSION_RATES.KM_TO_MI;
      break;
    case ConversionType.MI_TO_KM:
      result = value * CONVERSION_RATES.MI_TO_KM;
      fromUnit = 'mi';
      toUnit = 'km';
      conversionRate = CONVERSION_RATES.MI_TO_KM;
      break;
    case ConversionType.C_TO_F:
      result = (value * 9/5) + 32;
      fromUnit = '°C';
      toUnit = '°F';
      break;
    case ConversionType.F_TO_C:
      result = (value - 32) * 5/9;
      fromUnit = '°F';
      toUnit = '°C';
      break;
    default:
      throw new Error('Invalid conversion type');
  }

  return {
    result,
    fromUnit,
    toUnit,
    originalValue: value,
    conversionRate
  };
};