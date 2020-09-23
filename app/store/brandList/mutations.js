import CONST from './const';

export const mutations = {
  [CONST._MUTATORS.CLEAR_BRANDS]: (state) => {
    state.brands = [];
  },
  [CONST._MUTATORS.SET_BRANDS]: (state, brands) => {
    state.brands = brands;
  },
  [CONST._MUTATORS.ADD_MORE_BRANDS]: (state, brands) => {
    state.brands = [
      ...state.brands,
      ...brands,
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
  },
};
