import CONST from './const';

export const getters = {
  [CONST._GETTERS.MEMBER_ID]: ({ memberId }) => memberId,
  [CONST._GETTERS.MEMBER_NAME]: ({ memberName }) => memberName,
  [CONST._GETTERS.AUTH_ERROR]: ({ loginError }) => loginError,
  [CONST._GETTERS.PROFILE]: ({ profile }) => profile,
  [CONST._GETTERS.ADDRESSES]: ({ addresses }) => addresses,
  [CONST._GETTERS.ORDER_HISTORY_LIST]: ({ orders }) => orders,
  [CONST._GETTERS.ADDRESS_CHANGE_STACK]: ({ addressChange }) => addressChange,
};
