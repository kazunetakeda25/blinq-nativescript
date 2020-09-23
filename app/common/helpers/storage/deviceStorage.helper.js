const appSetting = require("tns-core-modules/application-settings");

export const getSetting = (key) => appSetting.getString(key, '');
export const saveSetting = (key, value) => appSetting.setString(key, value);