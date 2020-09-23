import CONST from './const';

export const getters = {
  [CONST._GETTERS.PRODUCTS]: ({ products }) => products,
  [CONST._GETTERS.CAN_LOADMORE]: ({ canLoadMore }) => canLoadMore,
  [CONST._GETTERS.PAGE]: ({ currentPage }) => currentPage,
  [CONST._GETTERS.TOTAL_PAGE]: ({ totalPage }) => totalPage,
  [CONST._GETTERS.COUNT]: ({ currentCount }) => currentCount,
  [CONST._GETTERS.TOTAL_COUNT]: ({ totalCount }) => totalCount,
  [CONST._GETTERS.FILTER_BRAND]: ({ filters }) => filters.brands,
  [CONST._GETTERS.FILTER_CATEGORY]: ({ filters }) => filters.categories,
  [CONST._GETTERS.FILTER_TARGET]: ({ filters }) => filters.targets,
};
