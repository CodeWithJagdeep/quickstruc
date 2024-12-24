// utils/validation.js

/**
 * Checks if the input is a valid email address.
 * @param {string} email - The email string to validate.
 * @returns {boolean} true if valid, false otherwise.
 */
export const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};


/**
 * Checks if the input is a valid password (at least 8 characters, one uppercase, one lowercase, one number, one special character).
 * @param {string} password - The password string to validate.
 * @returns {boolean} true if valid, false otherwise.
 */
export const isValidPassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

/**
 * Checks if the input is not empty or undefined.
 * @param {string|null|undefined} value - The value to check.
 * @returns {boolean} true if valid (non-empty), false otherwise.
 */
export const isRequired = (value) => {
  return value !== undefined && value !== null && value.trim() !== "";
};

/**
 * Validates if the input is a valid phone number (simple validation with digits).
 * @param {string} phoneNumber - The phone number string to validate.
 * @returns {boolean} true if valid, false otherwise.
 */
export const isValidPhoneNumber = (phoneNumber) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phoneNumber);
};

/**
 * Validates if the input is a valid URL.
 * @param {string} url - The URL string to validate.
 * @returns {boolean} true if valid, false otherwise.
 */
export const isValidURL = (url) => {
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return regex.test(url);
};

/**
 * Validates if the input is a valid date in YYYY-MM-DD format.
 * @param {string} date - The date string to validate.
 * @returns {boolean} true if valid, false otherwise.
 */
export const isValidDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date);
};

/**
 * Checks if the input is a number.
 * @param {string} value - The value to check.
 * @returns {boolean} true if it is a valid number, false otherwise.
 */
export const isNumber = (value) => {
  const regex = /^[0-9]+$/;
  return regex.test(value);
};
