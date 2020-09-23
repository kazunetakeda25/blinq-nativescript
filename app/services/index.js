import api from '../common/helpers/api';
import { API_URL, ACCOUNT } from '../common/constants';

export * from './core';
export * from './member';
export * from './product';
export * from './cart';

export const getSideMenu = (memberId = '') => (
  api.get(API_URL.GET_SIDE_MENU, { MemberID: memberId }, { listResponse: true })
);

export const getBanners = () => (
  api.get(API_URL.GET_BANNERS, {}, { listResponse: true })
);

export const getTickers = () => (
  api.get(API_URL.GET_TICKERS, {}, { listResponse: true })
);

export const getMiniBanners = () => (
  api.get(API_URL.GET_MINI_BANNERS, {}, { listResponse: true })
);

export const getFeaturedProducts = () => (
  api.get(API_URL.GET_FEATURED_PRODUCTS, {}, { listResponse: true })
);

export const getHomeProductBrands = () => (
  api.get(API_URL.GET_HOME_BRANDS, {}, { listResponse: true })
);

export const getProductBrands = (page = 1, perPage = 8) => (
  api.get(API_URL.GET_PRODUCT_BRANDS, {
    Page: page,
    ItemsPerPage: perPage,
  }, { rawResponse: true })
);

export const getBlogs = () => (
  api.get(API_URL.GET_BLOGS, {}, { listResponse: true })
);

export const getBlogPost = (postId) => (
  api.get(API_URL.GET_BLOG_POST, { postId }, { listResponse: true })
);
