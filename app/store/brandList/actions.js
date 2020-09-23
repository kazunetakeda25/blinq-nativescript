import CONST from './const';
import {
  getProductBrands,
} from '../../services';

const parseContent = (content, count) => {
  const items = [];
  for (let index = 0; index < count; index++) {
    items.push(content[`${index}`]);
  }
  return items;
};

export const actions = {
  [CONST._ACTIONS.LOAD_BRANDS]: async ({ commit }, {
    page = 1,
    perPage = 8,
  }) => {
    try {
      const response = await getProductBrands(page, perPage);
      const { Content, Count, TotalPages, TotalCount } = response;
      const items = parseContent(Content, Count);
      if (page === 1) {
        commit(CONST._MUTATORS.SET_BRANDS, items);
      } else {
        commit(CONST._MUTATORS.ADD_MORE_BRANDS, items);
      }
      commit(CONST._MUTATORS.SET_PAGING, {
        page,
        perPage,
        totalPage: TotalPages,
        count: Count,
        totalCount: TotalCount,
      });
    } catch (error) {
      console.log('error', error);
    }
  },
};
