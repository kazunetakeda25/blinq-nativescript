import api from '../common/helpers/api';
import { API_URL, ACCOUNT } from '../common/constants';
const { device } = require('platform/platform');

// Get Core App Configs
export const getAppConfigs = () => api.get(API_URL.GET_APP_CONFIG, {
  UUID: device.uuid,
});

// Get GEOIP default values
export const getGeoIP = (defaultCountry) => api.get(API_URL.GET_GEOIP, {
  PreferredCountry: defaultCountry,
});

// Get sideMenu's dropdown options
export const getOptionCountries = () => api.get(API_URL.GET_OPTIONS.COUNTRIES, {}, { listResponse: true });
export const getOptionStates = (CountryID) => api.get(API_URL.GET_OPTIONS.STATES, { CountryID }, { listResponse: true });
export const getOptionLanguages = () => api.get(API_URL.GET_OPTIONS.LANGUAGES, {}, { listResponse: true });
export const getOptionCurrencies = () => api.get(API_URL.GET_OPTIONS.CURRENCIES, {}, { listResponse: true });
