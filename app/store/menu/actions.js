import CONST from './const';
import {
  getGeoIP,
  getSideMenu,
  getOptionCountries,
  getOptionLanguages,
  getOptionCurrencies,
} from '../../services';

export const actions = {
  [CONST._ACTIONS.LOAD_MENU_ITEMS]: async ({ commit }, memberId) => {
    try {
      const response = await getSideMenu(memberId);
      commit(CONST._MUTATORS.SET_MENU_ITEMS, response);
    } catch (error) {
      console.log('error', error);
    }
  },
  [CONST._ACTIONS.LOAD_GEOIP_CONFIG]: async ({ commit }, defaultCountry = '') => {
    try {
      const response = await getGeoIP(defaultCountry);
      commit(CONST._MUTATORS.SET_GEOIP_CONFIG, response);
    } catch (error) {
      console.log('error', error);
    }
  },
  [CONST._ACTIONS.LOAD_DROPDOWN_OPTIONS]: async ({ commit }) => {
    try {
      const resCountries = await getOptionCountries();
      console.log('resCountries', JSON.stringify(resCountries));
      const resLanguages = await getOptionLanguages();
      const resCurrencies = await getOptionCurrencies();
      commit(CONST._MUTATORS.SET_DROPDOWN_OPTIONS, {
        country: resCountries,
        language: resLanguages,
        currency: resCurrencies,
      });
    } catch (error) {
      console.log('error', error);
    }
  },
};
