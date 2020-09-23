export const MODULE_NAME = 'brand-list';

/* GETTERS - START */
const _GETTERS = {
  BRANDS: 'brands',
  CAN_LOADMORE: 'canLoadMore',
  PAGE: 'currentPage',
  TOTAL_PAGE: 'totalPage',
  COUNT: 'currentCount',
  TOTAL_COUNT: 'totalCount',
};

export const GETTERS = {
  BRANDS: `${MODULE_NAME}/${_GETTERS.BRANDS}`,
  CAN_LOADMORE: `${MODULE_NAME}/${_GETTERS.CAN_LOADMORE}`,
  PAGE: `${MODULE_NAME}/${_GETTERS.PAGE}`,
  TOTAL_PAGE: `${MODULE_NAME}/${_GETTERS.TOTAL_PAGE}`,
  COUNT: `${MODULE_NAME}/${_GETTERS.COUNT}`,
  TOTAL_COUNT: `${MODULE_NAME}/${_GETTERS.TOTAL_COUNT}`,
};
/* GETTERS - END */

/* ACTIONS - START */
const _ACTIONS = {
  LOAD_BRANDS: 'loadBrands',
};

export const ACTIONS = {
  LOAD_BRANDS: `${MODULE_NAME}/${_ACTIONS.LOAD_BRANDS}`,
};
/* ACTIONS - END */

/* MUTATIONS - START */
const _MUTATORS = {
  SET_BRANDS: 'setBrands',
  CLEAR_BRANDS: 'clearBrands',
  ADD_MORE_BRANDS: 'addMoreBrands',
  SET_PAGING: 'setPaging',
};

export const MUTATORS = {
  CLEAR_BRANDS: `${MODULE_NAME}/${_MUTATORS.CLEAR_BRANDS}`,
};
/* MUTATIONS - END */

export default {
  _GETTERS,
  _ACTIONS,
  _MUTATORS,
};
