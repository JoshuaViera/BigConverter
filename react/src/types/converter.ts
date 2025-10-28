/**
 * Type definitions for Unit Converter
 */

export enum ConversionType {
  KM_TO_MI = 'kmToMi',
  MI_TO_KM = 'miToKm',
  C_TO_F = 'cToF',
  F_TO_C = 'fToC'
}

export enum ConverterMode {
  DISTANCE = 'distance',
  TEMPERATURE = 'temperature'
}

export interface ConversionRates {
  KM_TO_MI: number;
  MI_TO_KM: number;
}

export interface ConversionResult {
  result: number;
  fromUnit: string;
  toUnit: string;
  originalValue: number;
  conversionRate?: number;
}

export interface ConverterState {
  inputValue: string;
  conversionType: ConversionType;
  converterMode: ConverterMode;
  result: ConversionResult | null;
  error: string | null;
}