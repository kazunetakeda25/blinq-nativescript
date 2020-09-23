import CONST from './const';
import { saveSetting } from '~/common/helpers/storage/deviceStorage.helper';

export const mutations = {
  [CONST._MUTATORS.SET_MENU_ITEMS]: (state, menuItems) => {
    state.menuItems = menuItems;
  },
  [CONST._MUTATORS.SET_DROPDOWN_OPTIONS]: (state, { country, language, currency }) => {
    state.dropdownOptions = {
      country,
      language,
      currency,
    };
    console.log('state.dropdownOptions', JSON.stringify(state.dropdownOptions));
  },
  [CONST._MUTATORS.SET_GEOIP_CONFIG]: (state, defaultOptions) => {
    state.defaultOption = {
      country: defaultOptions.DefaultCountry,
      language: defaultOptions.DefaultLanguage,
      currency: defaultOptions.DefaultCurrency,
    };
    state.selected = {
      country: defaultOptions.DefaultCountry,
      language: defaultOptions.DefaultLanguage,
      currency: defaultOptions.DefaultCurrency,
    };
  },
  [CONST._MUTATORS.SET_SELECTED]: (state, {country, language, currency}) => {
    const options = { ...state.selected };
    if (country) {
      saveSetting('country', country);
      options.country = country;
    }
    if (language) {
      options.language = language;
    }
    if (currency) {
      options.currency = currency;
    }
    state.selected = options;
  },
};
