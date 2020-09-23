import CONST from './const';
import {
  getProductDetail,
  getProductAttributeDetail,
} from '../../services';

export const actions = {
  [CONST._ACTIONS.LOAD_PRODUCT_DETAIL]: async ({ commit }, productId) => {
    try {
      commit(CONST._MUTATORS.CLEAR_PRODUCT_DETAIL);
      const response = await getProductDetail(productId);
      const detail = response.Content['0'];
      detail.member_model_photo = response.Content['member_model_photo'];
      detail.product_overlay_photo = response.Content['product_overlay_photo'];
      detail.product_overlay_photo_json = response.Content['product_overlay_photo_json'];
      commit(CONST._MUTATORS.SET_PRODUCT_DETAIL, detail);
    } catch (error) {
      console.log('error', error);
    }
  },
  [CONST._ACTIONS.LOAD_ATTRIBUTE_DETAIL]: async ({ commit }, {
    memberId = '',
    currency = '',
    productId = '',
    attribute = {},
  }) => {
    try {
      const response = await getProductAttributeDetail(memberId, currency, productId, attribute);
      commit(CONST._MUTATORS.SET_ATTRIBUTE_DETAIL, response);
    } catch (error) {
      console.log('error', error);
      commit(CONST._MUTATORS.SET_ATTRIBUTE_DETAIL, {});
    }
  },
};
