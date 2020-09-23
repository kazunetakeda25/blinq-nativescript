import CONST from './const';

export const getters = {
  [CONST._GETTERS.BANNERS]: ({ banners }) => banners,
  [CONST._GETTERS.TICKERS]: ({ tickers }) => tickers,
  [CONST._GETTERS.MINI_BANNERS]: ({ miniBanners }) => miniBanners,
  [CONST._GETTERS.FEATURED_PRODUCTS]: ({ featuredProducts }) => featuredProducts,
  [CONST._GETTERS.BRANDS]: ({ brands }) => brands,
  [CONST._GETTERS.BLOG_HIGHLIGHTS]: ({ blogHighlights }) => blogHighlights,
};
