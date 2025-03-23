import CONFIG from "../config/configs.js";

/**
 * This function debounces the function call
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function}
 */
function debounce(func, delay = CONFIG.DEBOUNCE_DELAY) {
    // starts with a timeout variable
    let timeout;
    // returns a function that takes any number of arguments
    return function (...args) {
        // clears the timeout if it exists
        clearTimeout(timeout);
        // sets a new timeout to call the function after the delay
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

export default debounce;
