/**
 * Unit Tests for Converter Utilities
 */

import { describe, it, expect } from 'vitest';
import { isValidInput, performConversion, CONVERSION_RATES } from '../converter';
import { ConversionType } from '../../types/converter';

describe('Converter Utils', () => {
  describe('isValidInput', () => {
    it('should return true for valid numbers', () => {
      expect(isValidInput('42')).toBe(true);
      expect(isValidInput('3.14')).toBe(true);
      expect(isValidInput('0')).toBe(true);
    });

    it('should return false for invalid inputs', () => {
      expect(isValidInput('')).toBe(false);
      expect(isValidInput('abc')).toBe(false);
      expect(isValidInput('  ')).toBe(false);
    });
  });

  describe('performConversion', () => {
    it('should convert kilometers to miles correctly', () => {
      const result = performConversion(10, ConversionType.KM_TO_MI);
      expect(result.result).toBeCloseTo(6.21371);
      expect(result.fromUnit).toBe('km');
      expect(result.toUnit).toBe('mi');
    });

    it('should convert miles to kilometers correctly', () => {
      const result = performConversion(10, ConversionType.MI_TO_KM);
      expect(result.result).toBeCloseTo(16.0934);
      expect(result.fromUnit).toBe('mi');
      expect(result.toUnit).toBe('km');
    });

    it('should convert Celsius to Fahrenheit correctly', () => {
      const result = performConversion(0, ConversionType.C_TO_F);
      expect(result.result).toBe(32);
      expect(result.fromUnit).toBe('°C');
      expect(result.toUnit).toBe('°F');
    });

    it('should convert Fahrenheit to Celsius correctly', () => {
      const result = performConversion(32, ConversionType.F_TO_C);
      expect(result.result).toBe(0);
      expect(result.fromUnit).toBe('°F');
      expect(result.toUnit).toBe('°C');
    });
  });

  describe('CONVERSION_RATES', () => {
    it('should have correct conversion rates', () => {
      expect(CONVERSION_RATES.KM_TO_MI).toBe(0.621371);
      expect(CONVERSION_RATES.MI_TO_KM).toBe(1.60934);
    });
  });
});