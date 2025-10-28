/**
 * i18n Configuration
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: 'Unit Converter',
      subtitle: 'React + TypeScript + Tailwind CSS',
      distance: 'Distance',
      temperature: 'Temperature',
      enterValue: 'Enter Value',
      enterNumber: 'Enter a number',
      conversionDirection: 'Conversion Direction',
      convert: 'Convert',
      kmToMi: 'Kilometers → Miles',
      miToKm: 'Miles → Kilometers',
      cToF: 'Celsius → Fahrenheit',
      fToC: 'Fahrenheit → Celsius',
      conversionFormulas: 'Conversion Formulas',
      distanceFormula: '1 kilometer = 0.621371 miles | 1 mile = 1.60934 kilometers',
      tempFormula: '°F = (°C × 9/5) + 32 | °C = (°F - 32) × 5/9',
      builtWith: 'Built with React, TypeScript, and Tailwind CSS',
      viewBasic: 'View Basic Version',
      errorInvalid: 'Please enter a valid number',
      errorPositive: 'Please enter a positive number'
    }
  },
  es: {
    translation: {
      title: 'Conversor de Unidades',
      subtitle: 'React + TypeScript + Tailwind CSS',
      distance: 'Distancia',
      temperature: 'Temperatura',
      enterValue: 'Ingrese Valor',
      enterNumber: 'Ingrese un número',
      conversionDirection: 'Dirección de Conversión',
      convert: 'Convertir',
      kmToMi: 'Kilómetros → Millas',
      miToKm: 'Millas → Kilómetros',
      cToF: 'Celsius → Fahrenheit',
      fToC: 'Fahrenheit → Celsius',
      conversionFormulas: 'Fórmulas de Conversión',
      distanceFormula: '1 kilómetro = 0.621371 millas | 1 milla = 1.60934 kilómetros',
      tempFormula: '°F = (°C × 9/5) + 32 | °C = (°F - 32) × 5/9',
      builtWith: 'Construido con React, TypeScript y Tailwind CSS',
      viewBasic: 'Ver Versión Básica',
      errorInvalid: 'Por favor ingrese un número válido',
      errorPositive: 'Por favor ingrese un número positivo'
    }
  },
  fr: {
    translation: {
      title: 'Convertisseur d\'Unités',
      subtitle: 'React + TypeScript + Tailwind CSS',
      distance: 'Distance',
      temperature: 'Température',
      enterValue: 'Entrez la Valeur',
      enterNumber: 'Entrez un nombre',
      conversionDirection: 'Direction de Conversion',
      convert: 'Convertir',
      kmToMi: 'Kilomètres → Miles',
      miToKm: 'Miles → Kilomètres',
      cToF: 'Celsius → Fahrenheit',
      fToC: 'Fahrenheit → Celsius',
      conversionFormulas: 'Formules de Conversion',
      distanceFormula: '1 kilomètre = 0,621371 miles | 1 mile = 1,60934 kilomètres',
      tempFormula: '°F = (°C × 9/5) + 32 | °C = (°F - 32) × 5/9',
      builtWith: 'Construit avec React, TypeScript et Tailwind CSS',
      viewBasic: 'Voir Version Basique',
      errorInvalid: 'Veuillez entrer un nombre valide',
      errorPositive: 'Veuillez entrer un nombre positif'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;