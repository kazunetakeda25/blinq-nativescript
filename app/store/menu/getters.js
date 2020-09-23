import CONST from './const';

export const getters = {
  [CONST._GETTERS.MENU_ITEMS]: ({ menuItems }) => menuItems,
  [CONST._GETTERS.DROPDOWN_COUNTRIES]: ({ dropdownOptions }) => dropdownOptions.country,
  [CONST._GETTERS.DROPDOWN_LANGUAGES]: ({ dropdownOptions }) => dropdownOptions.language,
  [CONST._GETTERS.DROPDOWN_CURRENCIES]: ({ dropdownOptions }) => dropdownOptions.currency,
  [CONST._GETTERS.DEFAULT_COUNTRY]: ({ defaultOption }) => defaultOption.country,
  [CONST._GETTERS.DEFAULT_CURRENCY]: ({ defaultOption }) => defaultOption.language,
  [CONST._GETTERS.DEFAULT_LANGUAGE]: ({ defaultOption }) => defaultOption.currency,
  [CONST._GETTERS.SELECTED_COUNTRY]: ({ selected }) => selected.country,
  [CONST._GETTERS.SELECTED_LANGUAGE]: ({ selected }) => selected.language,
  [CONST._GETTERS.SELECTED_CURRENCY]: ({ selected }) => selected.currency,
  [CONST._GETTERS.SELECTED_CURRENCY_DETAIL]: ({ dropdownOptions, selected }) => (
    selected.currency && dropdownOptions.currency.find(({ Code }) => (Code === selected.currency)) || null
  ),
};
