import { getSetting } from "~/common/helpers/storage/deviceStorage.helper";

export const state = {
  memberId: getSetting('memberId') || null,
  memberName: getSetting('memberName') || null,
  loginError: null,
  profile: {},
  registerResult: null,
  forgotPswResult: null,
  addresses: [],
  orders: [],
  addressChange: 0,
};
