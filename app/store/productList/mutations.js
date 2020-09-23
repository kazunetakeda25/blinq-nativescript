import CONST from './const';

export const mutations = {
  [CONST._MUTATORS.CLEAR_PRODUCTS]: (state) => {
    state.products = [];
  },
  [CONST._MUTATORS.SET_PRODUCTS]: (state, products) => {
    state.products = products;
  },
  [CONST._MUTATORS.ADD_MORE_PRODUCTS]: (state, products) => {
    state.products = [
      ...state.products,
      ...products,
    ];
  },
  [CONST._MUTATORS.SET_PAGING]: (state, { page, perPage, totalPage, count, totalCount}) => {
    state.currentPage = page;
    state.totalPage = totalPage;
    state.currentCount = page === 1 ? count : (state.currentCount + count);
    state.totalCount = totalCount;
    if (count < perPage) {
      state.canLoadMore = false;
    } else {
      state.canLoadMore = (state.currentCount < state.totalCount);
    }
    console.log('state.canLoadMore', state.canLoadMore);
    console.log('state.currentCount', state.currentCount);
    console.log('state.totalCount', state.totalCount);
  },
  [CONST._MUTATORS.SET_FILTERS]: (state, { targets, brands, categories }) => {
    state.filters = {
      targets,
      brands,
      categories,
    };
  },
  [CONST._MUTATORS.CLEAR_FILTERS]: (state) => {
    state.filters = {
      targets: [],
      brands: [],
      categories: [],
    };
  },
};
