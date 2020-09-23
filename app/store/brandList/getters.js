import CONST from './const';

export const getters = {
  [CONST._GETTERS.BRANDS]: ({ brands }) => brands,
  [CONST._GETTERS.CAN_LOADMORE]: ({ canLoadMore }) => canLoadMore,
  [CONST._GETTERS.PAGE]: ({ currentPage }) => currentPage,
  [CONST._GETTERS.TOTAL_PAGE]: ({ totalPage }) => totalPage,
  [CONST._GETTERS.COUNT]: ({ currentCount }) => currentCount,
  [CONST._GETTERS.TOTAL_COUNT]: ({ totalCount }) => totalCount,
};
