import api from '../common/helpers/api';
import { API_URL } from '../common/constants';

// Load cart checkout data
export const loadOrderCheckoutData = (cartData) => (
  api.post(API_URL.LOAD_ORDER_CHECKOUT_DATA, {}, cartData, { rawResponse: true })
);
