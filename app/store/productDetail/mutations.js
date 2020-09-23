import CONST from './const';
import { ATTRIBUTE_STATUS } from '~/common/constants';

export const mutations = {
  [CONST._MUTATORS.SET_PRODUCT_DETAIL]: (state, product) => {
    state.product = product;
  },
  [CONST._MUTATORS.SET_ATTRIBUTE_DETAIL]: (state, detail) => {
    if (!detail || !Object.keys(detail).length) {
      state.attributeDetail = {
        status: ATTRIBUTE_STATUS.UNKNOW,
      };
    } else {
      state.attributeDetail = {
        ...detail,
        status: (detail.Stock > 0 && ATTRIBUTE_STATUS.AVAILABLE) ||
          (detail.stock === 0 && ATTRIBUTE_STATUS.OUT_OF_STOCK) ||
          ATTRIBUTE_STATUS.NOT_AVAILABLE,
      };
    }
  },
  [CONST._MUTATORS.CLEAR_PRODUCT_DETAIL]: (state) => {
    state.product = {};
    state.attributeDetail = {
      status: ATTRIBUTE_STATUS.NOT_AVAILABLE,
    };
  },
};
