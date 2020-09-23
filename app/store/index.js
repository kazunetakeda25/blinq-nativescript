import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { state } from './state';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';
import menu, { MODULE_NAME as MENU_MODULE } from './menu';
import member, { MODULE_NAME as MEMBER_MODULE } from './member';
import home, { MODULE_NAME as HOME_MODULE } from './home';
import brandList, { MODULE_NAME as BRAND_LIST_MODULE } from './brandList';
import productList, { MODULE_NAME as PRODUCT_LIST_MODULE } from './productList';
import productDetail, { MODULE_NAME as PRODUCT_DETAIL_MODULE } from './productDetail';
import cartSummary, { MODULE_NAME as CART_MODULE } from './cart';

Vue.config.devtools = true;
Vue.use(Vuex);

export * from './const';

const store = new Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    [MEMBER_MODULE]: member,
    [MENU_MODULE]: menu,
    [HOME_MODULE]: home,
    [BRAND_LIST_MODULE]: brandList,
    [PRODUCT_LIST_MODULE]: productList,
    [PRODUCT_DETAIL_MODULE]: productDetail,
    [CART_MODULE]: cartSummary,
  },
});

export default store;
