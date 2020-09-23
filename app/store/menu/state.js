import { getSetting } from "~/common/helpers/storage/deviceStorage.helper";

export const state = {
  menuItems: {},
  dropdownOptions: {
    country: [],
    language: [],
    currency: [],
  },
  defaultOption: {
    country: getSetting('country') || null,
    language: null,
    currency: null,
  },
  selected: {
    country: null,
    language: null,
    currency: null,
  },
};
