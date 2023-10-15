export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{3,24}$/; // Checks if username starts with a letter, and is between 4 and 25 characters long
  return usernameRegex.test(username);
};

export const isValidPwd = (pwd: string) => {
  const hasLowercaseChar = pwd?.match(/[a-z]/g);
  const hasUppercaseChar = pwd?.match(/[A-Z]/g);
  const hasDigitChar = pwd?.match(/[0-9]/g);
  const hasSpecialChar = pwd?.match(/[^a-zA-Z\d]/g);
  const isValidLength = pwd?.length >= 10;
  return (
    hasLowercaseChar &&
    hasUppercaseChar &&
    hasDigitChar &&
    hasSpecialChar &&
    isValidLength
  );
};
