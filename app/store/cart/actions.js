import CONST from './const';
// import {
//   getProductBrands,
// } from '../../services';

export const actions = {
  [CONST._ACTIONS.LOAD_CART_ITEMS]: async ({ commit }) => {
    try {
      commit(CONST._MUTATORS.ADD_TO_CART);
    } catch (error) {
      console.log('error', error);
    }
  },
};
