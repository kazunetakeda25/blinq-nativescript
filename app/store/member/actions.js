import CONST from './const';
import { MESSAGES } from '../../common/constants';
import {
  login,
  getMemberProfile,
  getMemberAddressList,
  getOrderHistoryList,
} from '../../services';

export const actions = {
  [CONST._ACTIONS.LOGIN]: async ({ commit }, { username, password }) => {
    try {
      console.log(username, password);
      const response = await login(username, password);
      commit(CONST._MUTATORS.SET_LOGIN_RESULT, { memberId: response.ID, memberName: response.Name });
    } catch(error) {
      // alert(MESSAGES.LOGIN_FAILED);
      commit(CONST._MUTATORS.SET_LOGIN_RESULT, { error: MESSAGES.LOGIN_FAILED });
    }
  },
  [CONST._ACTIONS.LOAD_PROFILE]: async ({ commit }, { memberId }) => {
    try {
      const response = await getMemberProfile(memberId);
      commit(CONST._MUTATORS.SET_PROFILE_RESULT, response);
    } catch(error) {
      // alert(MESSAGES.LOGIN_FAILED);
      console.log(error);
    }
  },
  [CONST._ACTIONS.LOAD_ADDRESSES]: async ({ commit }, memberId) => {
    try {
      const response = await getMemberAddressList(memberId);
      commit(CONST._MUTATORS.SET_ADDRESSES, response);
    } catch(error) {
      commit(CONST._MUTATORS.SET_ADDRESSES, []);
      console.log(error);
    }
  },
  [CONST._ACTIONS.LOAD_ORDER_HISTORY_LIST]: async ({ commit }, memberId) => {
    try {
      const response = await getOrderHistoryList(memberId);
      commit(CONST._MUTATORS.SET_ORDER_HISTORY_LIST, response);
    } catch(error) {
      commit(CONST._MUTATORS.SET_ORDER_HISTORY_LIST, []);
      console.log(error);
    }
  },
};
