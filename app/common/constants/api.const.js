export const BASE_API_URL = 'https://www.blinq.fashion/api/';

export const ACCOUNT = {
  PUBLIC_KEY: 'bad4305c7c6beb0e09d59b4897e1d859d3ae3948ad91e05ca24b35d421e799c8',
  HASH: '2a2809c08b3b28a6903062a976185ff347dcdcb6',
  TIME_STAMP: '00000000000000',
};

export const API_URL = {
  // Configurations
  GET_APP_CONFIG: 'config/appcore',
  GET_GEOIP: 'config/geoip',
  GET_OPTIONS: {
    COUNTRIES: 'country/index',
    LANGUAGES: 'language/index',
    CURRENCIES: 'currency/index',
    STATES: 'state/index',
  },
  GET_SIDE_MENU: 'menu/sidemenu',
  // Member section
  LOGIN: 'member/loginprocess',
  REGISTER: 'member/registerprocess',
  FORGOT_PASSWORD: 'member/forgotpasswordprocess',
  CHANGE_PASSWORD: 'member/passwordprocess',
  GET_PROFILE: 'member/profile',
  UPDATE_PROFILE: 'member/profileprocess',
  GET_ADDRESSES: 'memberaddress/index',
  GET_ADDRESS_DETAIL: 'memberaddress/view',
  ADD_ADDRESS: 'memberaddress/addprocess',
  EDIT_ADDRESS: 'memberaddress/editprocess',
  DELETE_ADDRESS: 'memberaddress/delete',
  ORDER_HISTORY_LIST: 'order/memberindex',
  ORDER_DETAIL: 'order/memberview',
  // Home screen
  GET_BANNERS: 'banner/index',
  GET_TICKERS: 'ticker/index',
  GET_MINI_BANNERS: 'minibanner/index',
  GET_FEATURED_PRODUCTS: 'product/homefeatured',
  GET_HOME_BRANDS: 'productbrand/homeindex',
  GET_PRODUCT_BRANDS: 'productbrand/index',
  GET_BLOGS: 'blog/index',
  GET_BLOG_POST: 'blog/view/:postId',
  // Product list
  GET_TRENDING_PRODUCTS: 'product/trending',
  GET_PRELOVED_PRODUCTS: 'product/preloved',
  GET_ONSALE_PRODUCTS: 'product/sale',
  GET_CATEGORY_PRODUCTS: 'productcategory/view',
  GET_BRAND_PRODUCTS: 'productbrand/view',
  GET_TARGET_PRODUCTS: 'producttarget/view',
  // Product detail
  GET_PRODUCT_DETAIL: 'product/view/:productId',
  GET_PRODUCT_ATTRIBUTE_DETAIL: 'productcombination/productattributedetail',
  // LOAD CHECKOUT DATA
  LOAD_ORDER_CHECKOUT_DATA: 'order/loadcheckoutdata',
  // TRY ME OUT
  GET_MEMBER_MODEL_PHOTO: 'membermodelphoto/memberindex',
  GET_MEMBER_MODEL_PHOTO_DETAIL: 'membermodelphoto/memberview',
};
