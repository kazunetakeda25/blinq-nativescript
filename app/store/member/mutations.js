import { saveSetting } from "~/common/helpers/storage/deviceStorage.helper";
import CONST from './const';

export const mutations = {
  [CONST._MUTATORS.SET_LOGIN_RESULT]: (state, { memberId, memberName, error }) => {
    if (typeof memberId !== 'undefined' && state.memberId !== memberId) {
      state.memberId = memberId;
      state.memberName = memberName;
      saveSetting('memberId', `${memberId}`);
      saveSetting('memberName', memberName);
    }
    if (typeof error !== 'undefined' && state.loginError !== error) {
      state.loginError = error;
    }
  },
  [CONST._MUTATORS.CLEAR_LOGIN_INFO]: (state) => {
    state.memberId = null;
    state.memberName = null;
    state.loginError = null;
  },
  [CONST._MUTATORS.LOGOUT]: (state) => {
    state.memberId = null;
    state.memberName = null;
    state.loginError = null;
    state.profile = {};
    saveSetting('memberId', '');
    saveSetting('memberName', '');
  },
  [CONST._MUTATORS.SET_LOAD_PROFILE_RESULT]: (state, profile) => {
    state.profile = profile;
  },
  [CONST._MUTATORS.SET_REGISTER_RESULT]: (state, result) => {
    state.registerResult = result;
  },
  [CONST._MUTATORS.SET_FORGOT_PASSWORD_RESULT]: (state, result) => {
    state.forgotPswResult = result;
  },
  [CONST._MUTATORS.SET_ADDRESSES]: (state, result) => {
    state.addresses = result;
  },
  [CONST._MUTATORS.SET_ORDER_HISTORY_LIST]: (state, orders) => {
    state.orders = orders;
  },
  [CONST._MUTATORS.ADDRESS_CHANGED]: (state) => {
    state.addressChange += 1;
  },
};
