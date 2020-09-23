import CONST from './const';
import {
  getTrendingProducts,
  getPrelovedProducts,
  getOnSaleProducts,
  getCategoryProducts,
  getBrandProducts,
  getTargetProducts,
} from '../../services';

const parseContent = (content, count) => {
  const items = [];
  for (let index = 0; index < count; index++) {
    items.push(content[`${index}`]);
  }
  const { TargetList, BrandList, CategoryList } = content;
  delete TargetList.count;
  const targets = Object.values(TargetList);
  delete BrandList.count;
  const brands = Object.values(BrandList);
  delete CategoryList.count;
  const categories = Object.values(CategoryList);
  return { items, targets, brands, categories };
};

const handleProductLoaded = (commit, page, perPage, response) => {
  const { Content, Count, TotalPages, TotalCount } = response;
  const { items, targets, brands, categories } = parseContent(Content, Count);
  if (page === 1) {
    commit(CONST._MUTATORS.SET_PRODUCTS, items);
  } else {
    commit(CONST._MUTATORS.ADD_MORE_PRODUCTS, items);
  }
  commit(CONST._MUTATORS.SET_PAGING, {
    page,
    perPage,
    totalPage: TotalPages,
    count: Count,
    totalCount: TotalCount,
  });
  commit(CONST._MUTATORS.SET_FILTERS, { targets, brands, categories });
};

export const actions = {
  [CONST._ACTIONS.LOAD_TRENDING_PRODUCTS]: async ({ commit }, {
    page = 1,
    perPage = 8,
    sort = '',
    target = '',
    brand = '',
    category = '',
  }) => {
    try {
      const response = await getTrendingProducts(page, perPage, sort, target, brand, category);
      handleProductLoaded(commit, page, perPage, response);
    } catch (error) {
      console.log('error', error);
    }
  },
  [CONST._ACTIONS.LOAD_PRELOVED_PRODUCTS]: async ({ commit }, {
    page = 1,
    perPage = 8,
    sort = '',
    target = '',
    brand = '',
    category = '',
  }) => {
    try {
      const response = await getPrelovedProducts(page, perPage, sort, target, brand, category);
      handleProductLoaded(commit, page, perPage, response);
    } catch (error) {
      console.log('error', error);
    }
  },
  [CONST._ACTIONS.LOAD_ONSALE_PRODUCTS]: async ({ commit }, {
    page = 1,
    perPage = 8,
    sort = '',
    target = '',
    brand = '',
    category = '',
  }) => {
    try {
      const response = await getOnSaleProducts(page, perPage, sort, target, brand, category);
      handleProductLoaded(commit, page, perPage, response);
    } catch (error) {
      console.log('error', error);
    }
  },
  [CONST._ACTIONS.LOAD_CATEGORY_PRODUCTS]: async ({ commit }, {
    page = 1,
    perPage = 8,
    sort = '',
    target = '',
    brand = '',
    category = '',
  }) => {
    try {
      const response = await getCategoryProducts(page, perPage, sort, target, brand, category);
      handleProductLoaded(commit, page, perPage, response.Product);
    } catch (error) {
      console.log('error', error);
    }
  },
  [CONST._ACTIONS.LOAD_BRAND_PRODUCTS]: async ({ commit }, {
    page = 1,
    perPage = 8,
    sort = '',
    target = '',
    brand = '',
    category = '',
  }) => {
    try {
      const response = await getBrandProducts(page, perPage, sort, target, brand, category);
      handleProductLoaded(commit, page, perPage, response.Product);
    } catch (error) {
      console.log('error', error);
    }
  },
  [CONST._ACTIONS.LOAD_TARGET_PRODUCTS]: async ({ commit }, {
    page = 1,
    perPage = 8,
    sort = '',
    target = '',
    brand = '',
    category = '',
  }) => {
    try {
      const response = await getTargetProducts(page, perPage, sort, target, brand, category);
      handleProductLoaded(commit, page, perPage, response.Product);
    } catch (error) {
      console.log('error', error);
    }
  },
};
