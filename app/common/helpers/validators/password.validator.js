export const validatePassword = text => {
  if (!text || typeof text !== 'string') {
    return false;
  }
  return (String(text).trim().length >= 8);
};