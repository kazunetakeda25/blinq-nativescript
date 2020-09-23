import CONST from './const';
// import { MESSAGES } from '../../common/constants';
import {
  getBanners,
  getTickers,
  getMiniBanners,
  getFeaturedProducts,
  getBlogs,
  getHomeProductBrands,
} from '../../services';

export const actions = {
  [CONST._ACTIONS.LOAD_BANNERS]: async ({ commit }) => {
    try {
      const response = await getBanners();
      commit(CONST._MUTATORS.SET_BANNERS, response);
    } catch(error) {
      console.log(error);
      commit(CONST._MUTATORS.SET_BANNERS, []);
    }
  },
  [CONST._ACTIONS.LOAD_TICKERS]: async ({ commit }) => {
    try {
      const response = await getTickers();
      commit(CONST._MUTATORS.SET_TICKERS, response);
    } catch(error) {
      console.log(error);
      commit(CONST._MUTATORS.SET_TICKERS, []);
    }
  },
  [CONST._ACTIONS.LOAD_MINI_BANNERS]: async ({ commit }) => {
    try {
      const response = await getMiniBanners();
      commit(CONST._MUTATORS.SET_MINI_BANNERS, response);
    } catch(error) {
      console.log(error);
      commit(CONST._MUTATORS.SET_MINI_BANNERS, []);
    }
  },
  [CONST._ACTIONS.LOAD_FEATURED_PRODUCTS]: async ({ commit }) => {
    try {
      const response = await getFeaturedProducts();
      commit(CONST._MUTATORS.SET_FEATURED_PRODUCTS, response);
    } catch(error) {
      console.log(error);
      commit(CONST._MUTATORS.SET_FEATURED_PRODUCTS, []);
    }
  },
  [CONST._ACTIONS.LOAD_BRANDS]: async ({ commit }) => {
    try {
      const response = await getHomeProductBrands();
      commit(CONST._MUTATORS.SET_BRANDS, response);
    } catch(error) {
      console.log(error);
      commit(CONST._MUTATORS.SET_BRANDS, []);
    }
  },
  [CONST._ACTIONS.LOAD_BLOG_HIGHLIGHTS]: async ({ commit }) => {
    try {
      const response = await getBlogs();
      commit(CONST._MUTATORS.SET_BLOG_HIGHLIGHTS, response);
    } catch(error) {
      console.log(error);
      commit(CONST._MUTATORS.SET_BLOG_HIGHLIGHTS, []);
    }
  },
};
