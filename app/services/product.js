import api from '../common/helpers/api';
import { API_URL, ACCOUNT } from '../common/constants';

// Get Product List
export const getTrendingProducts = (page = 1, perPage = 8, sort = '', target = '', brand = '', category = '') => {
  return api.get(API_URL.GET_TRENDING_PRODUCTS, {
    Page: page,
    ItemsPerPage: perPage,
    Sort: sort || '',
    TargetID: target || '',
    BrandID: brand || '',
    CategoryID: category || '',
  }, { rawResponse: true });
};
export const getPrelovedProducts = (page = 1, perPage = 8, sort = '', target = '', brand = '', category = '') => {
  return api.get(API_URL.GET_PRELOVED_PRODUCTS, {
    Page: page,
    ItemsPerPage: perPage,
    Sort: sort || '',
    TargetID: target || '',
    BrandID: brand || '',
    CategoryID: category || '',
  }, { rawResponse: true });
};
export const getOnSaleProducts = (page = 1, perPage = 8, sort = '', target = '', brand = '', category = '') => {
  return api.get(API_URL.GET_ONSALE_PRODUCTS, {
    Page: page,
    ItemsPerPage: perPage,
    Sort: sort || '',
    TargetID: target || '',
    BrandID: brand || '',
    CategoryID: category || '',
  }, { rawResponse: true });
};
export const getTargetProducts = (page = 1, perPage = 8, sort = '', target = '', brand = '', category = '') => {
  return api.get(API_URL.GET_TARGET_PRODUCTS, {
    Page: page,
    ItemsPerPage: perPage,
    Sort: sort || '',
    TargetID: target || '',
    BrandID: brand || '',
    CategoryID: category || '',
  }, { rawResponse: true });
};
export const getBrandProducts = (page = 1, perPage = 8, sort = '', target = '', brand = '', category = '') => {
  return api.get(API_URL.GET_BRAND_PRODUCTS, {
    Page: page,
    ItemsPerPage: perPage,
    Sort: sort || '',
    TargetID: target || '',
    BrandID: brand || '',
    CategoryID: category || '',
  }, { rawResponse: true });
};
export const getCategoryProducts = (page = 1, perPage = 8, sort = '', target = '', brand = '', category = '') => {
  return api.get(API_URL.GET_CATEGORY_PRODUCTS, {
    Page: page,
    ItemsPerPage: perPage,
    Sort: sort || '',
    TargetID: target || '',
    BrandID: brand || '',
    CategoryID: category || '',
  }, { rawResponse: true });
};
export const getProductDetail = (productId) => (
  api.get(API_URL.GET_PRODUCT_DETAIL, { productId }, { rawResponse: true })
);
export const getProductAttributeDetail = (memberId, currency, productId, attribute) => {
  return api.post(API_URL.GET_PRODUCT_ATTRIBUTE_DETAIL, {}, {
      PublicKey: ACCOUNT.PUBLIC_KEY,
      Hash: ACCOUNT.HASH,
      Timestamp: ACCOUNT.TIME_STAMP,
      CurrencyCode : currency,
      MemberID : memberId,
      ProductID : productId,
      AttributeValue : attribute,
  }, { listResponse: true });
};
