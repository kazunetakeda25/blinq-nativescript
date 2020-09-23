import api from '../common/helpers/api';
import { API_URL } from '../common/constants';
const { device } = require('platform/platform');

// Authentication
export const login = (username, password) => (
  api.post(API_URL.LOGIN, {
    UUID: device.uuid,
  }, {
    Username: username,
    Password: password,
    UUID: device.uuid,
  }, { withCredentials: true })
);

export const register = (registerData) => (
  api.post(API_URL.REGISTER, {}, registerData, { rawResponse: true })
);

export const getMemberProfile = (memberId) => (
  api.get(API_URL.GET_PROFILE, { MemberID: memberId })
);

export const updateMemberProfile = (data = {}) => (
  api.post(API_URL.UPDATE_PROFILE, {}, data, { rawResponse: true })
);

export const forgotPassword = (username, email) => (
  api.post(API_URL.FORGOT_PASSWORD, {}, {
    Username : username,
    Email : email,
  }, { rawResponse: true })
);

export const changePassword = (memberId, oldPassword, newPassword) => (
  api.post(API_URL.CHANGE_PASSWORD, {}, {
    MemberID : memberId,
    Password : oldPassword,
    PasswordNew : newPassword,
  }, { rawResponse: true })
);

export const getMemberModelPhotoList = (memberId) => (
  api.get(API_URL.GET_MEMBER_MODEL_PHOTO, { MemberID: memberId }, { rawResponse: true })
);

export const getMemberAddressList = (memberId) => (
  api.get(API_URL.GET_ADDRESSES, { MemberID: memberId }, { listResponse: true })
);

export const getMemberAddressDetail = (memberId, addressId) => (
  api.get(API_URL.GET_ADDRESS_DETAIL, { MemberID: memberId, MemberAddressID: addressId })
);

export const saveMemberAddress = (memberId, data) => (
  api.post(data.MemberAddressID ? API_URL.EDIT_ADDRESS : API_URL.ADD_ADDRESS, {}, {
    ...data,
    MemberID: memberId,
  }, { rawResponse: true })
);

export const deleteMemberAddress = (memberId, memberAddressID) => (
  api.post(API_URL.DELETE_ADDRESS, {}, {
    MemberID: memberId,
    MemberAddressID: memberAddressID,
  }, { rawResponse: true })
);

export const getOrderHistoryList = (memberId) => (
  api.get(API_URL.ORDER_HISTORY_LIST, { MemberID: memberId }, { listResponse: true })
);

export const getOrderDetail = (memberId, orderId) => (
  api.get(API_URL.ORDER_DETAIL, { MemberID: memberId, OrderID: orderId })
);
