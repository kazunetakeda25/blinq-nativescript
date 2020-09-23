export const MODULE_NAME = 'product-detail';

/* GETTERS - START */
const _GETTERS = {
  PRODUCT: 'product',
  ATTRIBUTE_DETAIL: 'attributeDetail',
};

export const GETTERS = {
  PRODUCT: `${MODULE_NAME}/${_GETTERS.PRODUCT}`,
  ATTRIBUTE_DETAIL: `${MODULE_NAME}/${_GETTERS.ATTRIBUTE_DETAIL}`,
};
/* GETTERS - END */

/* ACTIONS - START */
const _ACTIONS = {
  LOAD_PRODUCT_DETAIL: 'loadProductDetail',
  LOAD_ATTRIBUTE_DETAIL: 'loadAttributeDetail',
};

export const ACTIONS = {
  LOAD_PRODUCT_DETAIL: `${MODULE_NAME}/${_ACTIONS.LOAD_PRODUCT_DETAIL}`,
  LOAD_ATTRIBUTE_DETAIL: `${MODULE_NAME}/${_ACTIONS.LOAD_ATTRIBUTE_DETAIL}`,
};
/* ACTIONS - END */

/* MUTATIONS - START */
const _MUTATORS = {
  SET_PRODUCT_DETAIL: 'setProductDetail',
  SET_ATTRIBUTE_DETAIL: 'setAttributeDetail',
  CLEAR_PRODUCT_DETAIL: 'clearProductDetail',
};

export const MUTATORS = {
  CLEAR_PRODUCT_DETAIL: `${MODULE_NAME}/${_MUTATORS.CLEAR_PRODUCT_DETAIL}`,
};
/* MUTATIONS - END */

export default {
  _GETTERS,
  _ACTIONS,
  _MUTATORS,
};
