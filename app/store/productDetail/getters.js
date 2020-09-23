import CONST from './const';

export const getters = {
  [CONST._GETTERS.PRODUCT]: ({ product }) => product,
  [CONST._GETTERS.ATTRIBUTE_DETAIL]: ({ attributeDetail }) => attributeDetail,
};
