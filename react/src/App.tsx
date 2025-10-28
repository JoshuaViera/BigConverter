/**
 * Main App Component
 * Root component with navigation to vanilla version
 */

import UnitConverter from './components/UnitConverter';

function App() {
  return (
    <div className="relative">
      {/* Toggle Button - Links to Vanilla Version */}
      
       <a href="/vanilla/index.html"
        className="fixed top-6 right-6 z-50 bg-white text-primary-600 px-6 py-3 
                 rounded-full shadow-lg font-semibold text-sm tracking-wide
                 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5
                 focus:outline-none focus:ring-4 focus:ring-primary-300
                 border-2 border-primary-500 no-underline"
      >
        View Basic Version
      </a>

      {/* Main React Converter */}
      <UnitConverter />
    </div>
  );
}

export default App;