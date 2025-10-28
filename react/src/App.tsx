import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UnitConverter from './components/UnitConverter';
import { ConverterProvider } from './context/ConverterContext';

function App() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <ConverterProvider>
      <div className="relative">
        <div className="fixed top-6 left-6 z-50 flex gap-2">
          <button
            onClick={() => changeLanguage('en')}
            className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
              language === 'en'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage('es')}
            className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
              language === 'es'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            ES
          </button>
          <button
            onClick={() => changeLanguage('fr')}
            className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
              language === 'fr'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            FR
          </button>
        </div>

        
          <a href="/vanilla/index.html"
          className="fixed top-6 right-6 z-50 bg-white text-primary-600 px-6 py-3 
                   rounded-full shadow-lg font-semibold text-sm tracking-wide
                   transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5
                   focus:outline-none focus:ring-4 focus:ring-primary-300
                   border-2 border-primary-500 no-underline"
        >
          {t('viewBasic')}
        </a>

        <UnitConverter />
      </div>
    </ConverterProvider>
  );
}

export default App;