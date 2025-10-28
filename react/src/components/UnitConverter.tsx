/**
 * UnitConverter Component
 * Enhanced with Context API, floating particles, and i18n
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ResultDisplay from './ResultDisplay';
import { ConversionType, ConverterMode } from '../types/converter';
import { useConverter } from '../context/ConverterContext';

// Floating particle component
const FloatingParticle = ({ delay }: { delay: number }) => {
  return (
    <div
      className="absolute w-2 h-2 bg-primary-300 rounded-full opacity-20 animate-float"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    />
  );
};

const UnitConverter: React.FC = () => {
  const { t } = useTranslation();
  const { state, handleInputChange, switchMode, toggleConversionType, handleConvert } = useConverter();
  
  const [particles] = useState(() => Array.from({ length: 15 }, (_, i) => i));

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConvert();
    }
  };

  const isDistanceMode = state.converterMode === ConverterMode.DISTANCE;
  const isFirstOption = isDistanceMode 
    ? state.conversionType === ConversionType.KM_TO_MI 
    : state.conversionType === ConversionType.C_TO_F;

  const getIcon = () => isDistanceMode ? '🌍' : '🌡️';
  const getTitle = () => isDistanceMode ? t('distance') : t('temperature');
  const getLeftLabel = () => isDistanceMode ? t('kmToMi') : t('cToF');
  const getRightLabel = () => isDistanceMode ? t('miToKm') : t('fToC');
  const getFormula = () => isDistanceMode ? t('distanceFormula') : t('tempFormula');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 flex items-center justify-center p-5 relative overflow-hidden">
      {/* Floating Particles Background */}
      {particles.map((i) => (
        <FloatingParticle key={i} delay={i * 0.2} />
      ))}

      {/* Glassmorphism Card */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-2xl w-full animate-fade-in border border-white/20">
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 opacity-20 blur-xl -z-10 animate-pulse" />

        {/* Header */}
        <header className="text-center mb-9">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <span className="animate-bounce">{getIcon()}</span>
            {getTitle()} {t('title')}
          </h1>
          <p className="text-gray-600 text-sm font-medium tracking-wide flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {t('subtitle')}
          </p>
        </header>

        {/* Mode Switcher */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => switchMode(ConverterMode.DISTANCE)}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
              isDistanceMode
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🌍 {t('distance')}
          </button>
          <button
            onClick={() => switchMode(ConverterMode.TEMPERATURE)}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
              !isDistanceMode
                ? 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🌡️ {t('temperature')}
          </button>
        </div>

        {/* Main Converter */}
        <main className="space-y-6">
          {/* Input Field */}
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="inputValue"
              className="text-gray-700 font-semibold text-[15px] tracking-wide"
            >
              {t('enterValue')}:
            </label>
            <input
              type="number"
              id="inputValue"
              value={state.inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('enterNumber')}
              step="any"
              autoFocus
              className="px-5 py-4 border-2 border-gray-300 rounded-xl text-base
                       transition-all duration-300 focus:outline-none focus:border-primary-500
                       focus:ring-4 focus:ring-primary-100 hover:border-gray-400
                       bg-white/80 backdrop-blur-sm"
              aria-label="Value to convert"
            />
          </div>

          {/* Toggle Switch with Animation */}
          <div className="flex flex-col gap-2.5">
            <label className="text-gray-700 font-semibold text-[15px] tracking-wide">
              {t('conversionDirection')}:
            </label>
            
            <div className="flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-inner">
              <span className={`text-base font-medium transition-all duration-300 ${isFirstOption ? 'text-primary-600 font-bold scale-110' : 'text-gray-500 scale-100'}`}>
                {getLeftLabel()}
              </span>
              
              {/* Animated Toggle Switch */}
              <button
                onClick={toggleConversionType}
                className={`relative w-16 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300 transform hover:scale-110 ${
                  isFirstOption ? 'bg-gradient-to-r from-primary-500 to-primary-600' : 'bg-gradient-to-r from-secondary-500 to-secondary-600'
                }`}
                aria-label="Toggle conversion direction"
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg transform transition-all duration-300 flex items-center justify-center ${
                    isFirstOption ? 'translate-x-0' : 'translate-x-8'
                  }`}
                >
                  <span className={`text-xs ${isFirstOption ? 'text-primary-600' : 'text-secondary-600'}`}>
                    {isFirstOption ? '→' : '←'}
                  </span>
                </span>
              </button>
              
              <span className={`text-base font-medium transition-all duration-300 ${!isFirstOption ? 'text-secondary-600 font-bold scale-110' : 'text-gray-500 scale-100'}`}>
                {getRightLabel()}
              </span>
            </div>
          </div>

          {/* Convert Button with Ripple Effect */}
          <button
            onClick={handleConvert}
            className="w-full bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white
                     px-8 py-4 rounded-xl text-[17px] font-semibold tracking-wide
                     transition-all duration-300 shadow-lg
                     hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/50
                     active:translate-y-0 active:shadow-md
                     focus:outline-none focus:ring-4 focus:ring-primary-300
                     relative overflow-hidden group"
          >
            <span className="relative z-10">{t('convert')}</span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>

          {/* Result Display */}
          <ResultDisplay result={state.result} error={state.error} />

          {/* Information Section */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 px-5 py-5 rounded-xl border-l-4 border-primary-500 shadow-sm">
            <p className="text-center text-gray-600 text-sm leading-relaxed">
              <strong className="text-gray-700 block mb-2 text-[15px]">
                {t('conversionFormulas')}:
              </strong>
              {getFormula()}
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center mt-8 pt-5 border-t border-gray-200">
          <p className="text-gray-500 text-[13px] flex items-center justify-center gap-2">
            {t('builtWith')}
            <span className="inline-block w-1.5 h-1.5 bg-primary-500 rounded-full animate-ping" />
          </p>
        </footer>
      </div>
    </div>
  );
};

export default UnitConverter;