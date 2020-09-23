import CONST from './const';

export const getters = {
  [CONST._GETTERS.CART_ITEMS]: ({ cartItems }) => cartItems,
  [CONST._GETTERS.CART_DATA]: ({ cart }) => cart,
  [CONST._GETTERS.CHECKOUT_STAGE]: ({ cart }) => cart.Stage,
  [CONST._GETTERS.PAYMENT_STATUS]: ({ payment }) => payment,
};
