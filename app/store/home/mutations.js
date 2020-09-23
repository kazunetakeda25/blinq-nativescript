import CONST from './const';

export const mutations = {
  [CONST._MUTATORS.SET_BANNERS]: (state, banners) => {
    state.banners = banners;
  },
  [CONST._MUTATORS.SET_TICKERS]: (state, tickers) => {
    state.tickers = tickers;
  },
  [CONST._MUTATORS.SET_MINI_BANNERS]: (state, miniBanners) => {
    state.miniBanners = miniBanners;
  },
  [CONST._MUTATORS.SET_FEATURED_PRODUCTS]: (state, featuredProducts) => {
    state.featuredProducts = featuredProducts;
  },
  [CONST._MUTATORS.SET_BRANDS]: (state, brands) => {
    state.brands = brands;
  },
  [CONST._MUTATORS.SET_BLOG_HIGHLIGHTS]: (state, blogHighlights) => {
    state.blogHighlights = blogHighlights;
  },
};
