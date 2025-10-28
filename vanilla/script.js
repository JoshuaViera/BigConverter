/**
 * Unit Converter - Vanilla JavaScript
 * Converts between kilometers and miles with toggle switch
 */

// ===== CONSTANTS =====
const CONVERSION_RATES = {
    KM_TO_MI: 0.621371,
    MI_TO_KM: 1.60934
};

const CONVERSION_TYPES = {
    KM_TO_MI: 'kmToMi',
    MI_TO_KM: 'miToKm'
};

// Track current conversion type
let currentConversionType = CONVERSION_TYPES.KM_TO_MI;

// ===== DOM ELEMENTS =====
const elements = {
    inputValue: document.getElementById('inputValue'),
    convertBtn: document.getElementById('convertBtn'),
    result: document.getElementById('result'),
    resultBox: document.querySelector('.result-box')
};

// ===== TOGGLE FUNCTION =====

/**
 * Toggle conversion direction
 */
function toggleConversion() {
    const toggleBtn = document.getElementById('toggleBtn');
    const toggleCircle = document.getElementById('toggleCircle');
    const kmLabel = document.getElementById('kmLabel');
    const miLabel = document.getElementById('miLabel');
    
    if (currentConversionType === CONVERSION_TYPES.KM_TO_MI) {
        // Switch to MI_TO_KM
        currentConversionType = CONVERSION_TYPES.MI_TO_KM;
        toggleBtn.style.background = '#764ba2';
        toggleCircle.style.transform = 'translateX(32px)';
        kmLabel.style.fontWeight = '500';
        kmLabel.style.color = '#777';
        miLabel.style.fontWeight = '600';
        miLabel.style.color = '#764ba2';
    } else {
        // Switch to KM_TO_MI
        currentConversionType = CONVERSION_TYPES.KM_TO_MI;
        toggleBtn.style.background = '#667eea';
        toggleCircle.style.transform = 'translateX(0)';
        kmLabel.style.fontWeight = '600';
        kmLabel.style.color = '#667eea';
        miLabel.style.fontWeight = '500';
        miLabel.style.color = '#777';
    }
    
    // Clear any existing results
    if (elements.result.querySelector('.error-message')) {
        elements.result.innerHTML = 'Enter a value and click Convert';
    }
}

// ===== UTILITY FUNCTIONS =====

/**
 * Validates if the input is a valid number
 * @param {string} value - The input value to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidInput(value) {
    return value.trim() !== '' && !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Performs the unit conversion
 * @param {number} value - The value to convert
 * @param {string} conversionType - The type of conversion
 * @returns {object} - Object containing result and formatted text
 */
function performConversion(value, conversionType) {
    let result;
    let fromUnit;
    let toUnit;
    let conversionRate;

    if (conversionType === CONVERSION_TYPES.KM_TO_MI) {
        result = value * CONVERSION_RATES.KM_TO_MI;
        fromUnit = 'km';
        toUnit = 'mi';
        conversionRate = CONVERSION_RATES.KM_TO_MI;
    } else {
        result = value * CONVERSION_RATES.MI_TO_KM;
        fromUnit = 'mi';
        toUnit = 'km';
        conversionRate = CONVERSION_RATES.MI_TO_KM;
    }

    return {
        result: result,
        fromUnit: fromUnit,
        toUnit: toUnit,
        originalValue: value,
        conversionRate: conversionRate
    };
}

/**
 * Formats the result for display
 * @param {object} conversionData - The conversion data object
 * @returns {string} - Formatted HTML string
 */
function formatResult(conversionData) {
    const { originalValue, fromUnit, result, toUnit } = conversionData;
    
    return `
        <span class="result-value">${originalValue.toFixed(4)} ${fromUnit}</span> 
        = 
        <span class="result-value">${result.toFixed(4)} ${toUnit}</span>
    `;
}

/**
 * Displays an error message
 * @param {string} message - The error message to display
 */
function displayError(message) {
    elements.result.innerHTML = `<span class="error-message">${message}</span>`;
    elements.resultBox.classList.remove('has-result');
}

/**
 * Displays the conversion result
 * @param {string} formattedResult - The formatted result HTML
 */
function displayResult(formattedResult) {
    elements.result.innerHTML = formattedResult;
    elements.resultBox.classList.add('has-result');
    
    // Remove the animation class after it completes
    setTimeout(() => {
        elements.resultBox.classList.remove('has-result');
    }, 500);
}

// ===== MAIN CONVERSION FUNCTION =====

/**
 * Main conversion handler
 */
function convert() {
    const inputValue = elements.inputValue.value;

    // Validate input
    if (!isValidInput(inputValue)) {
        displayError('⚠️ Please enter a valid number');
        return;
    }

    const numericValue = parseFloat(inputValue);

    // Check for negative values
    if (numericValue < 0) {
        displayError('⚠️ Please enter a positive number');
        return;
    }

    // Get conversion type and perform conversion
    const conversionData = performConversion(numericValue, currentConversionType);
    
    // Format and display result
    const formattedResult = formatResult(conversionData);
    displayResult(formattedResult);

    // Log conversion for debugging (optional)
    console.log('Conversion performed:', conversionData);
}

// ===== EVENT LISTENERS =====

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
    // Convert button click
    elements.convertBtn.addEventListener('click', convert);

    // Enter key press on input field
    elements.inputValue.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            convert();
        }
    });

    // Clear error message when user starts typing
    elements.inputValue.addEventListener('input', () => {
        if (elements.result.querySelector('.error-message')) {
            elements.result.innerHTML = 'Enter a value and click Convert';
        }
    });
}

// ===== INITIALIZATION =====

/**
 * Initialize the application
 */
function init() {
    console.log('Unit Converter initialized');
    initializeEventListeners();
    
    // Focus on input field on page load
    elements.inputValue.focus();
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}