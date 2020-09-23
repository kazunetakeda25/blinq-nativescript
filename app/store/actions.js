import { ACTIONS, MUTATORS } from './const';
import {
  getAppConfigs,
  login,
  getBanners,
  getTickers,
  getMiniBanners,
} from '../services';

export const actions = {
  [ACTIONS.LOAD_APP_CONFIG]: async ({ commit }) => {
    try {
      const response = await getAppConfigs();
      commit(MUTATORS.SET_APP_CONFIG, response);
    } catch (error) {
      console.log(error);
    }
  },
  // TODO: REFACTOR
  getLogin: async ({ commit }, { email, password }) => {
    commit('setProcessingOn');
    try {
      const response = await login(email, password);
      commit('setLogin', response.data.Content[0].ID);
    } catch(error) {
      console.log(error);
      commit('setLogin', '');
      alert(MESSAGES.LOGIN_FAILED);
    }
  },
  getConf: async ({ commit }) => {
    try {
      const response = await getAppConfigs();
      commit('setConf', response.data.Content[0]);
    } catch (error) {
      console.log(error);
      commit('setConf', []);
    }
  },
  getBannerList: async ({ commit }) => {
    try {
      const response = await getBanners();
      commit('setBannerList', response.data.Content[0]);
    } catch (error) {
      console.log(error);
      commit('setBannerList', '');
    }
  },
  getTickerList: async ({ commit }) => {
    try {
      const response = await getTickers();
      commit('setTickerList', response.data.Content[0]);
    } catch (error) {
      console.log(error);
      commit('setTickerList', '');
    }
  },
  getMiniBannerList: async ({ commit }) => {
    try {
      const response = await getMiniBanners();
      commit('setMiniBannerList', response.data.Content[0]);
    } catch (error) {
      console.log(error);
      commit('setMiniBannerList', []);
    }
  },
};
