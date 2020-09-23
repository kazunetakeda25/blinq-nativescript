/**
 * Parse object into FormData
 * @param {Object} params
 */
export const ObjectToFormData = (params = {}) => {
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key]);
  });
  return formData;
};
