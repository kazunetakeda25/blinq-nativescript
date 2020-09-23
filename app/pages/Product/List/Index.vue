<template>
  <Page actionBarHidden="true">
    <AbsoluteLayout>
      <ScrollView ref="scrollView" top="0" left="0" width="100%" height="100%" class="bg-default" @scroll="onScroll">
        <FlexboxLayout flexDirection="column" paddingBottom="10">

          <PageTitle :title="pageTitle" />

          <Filters :screen="routeId" @onFilterChange="handleFilterChange"
            :targetValue="filters.target" :brandValue="filters.brand" :categoryValue="filters.category"
            :target="!isProductTargetList" :brand="!isProductBrandList" :category="!isProductCatList" :sort="true" />

          <StackLayout v-if="haveProducts" marginTop="10">
            <FlexboxLayout flexWrap="wrap" justifyContent="space-between" class="bg-default">
              <StackLayout
                width="49%"
                v-for="(product, index) in products"
                :key="index"
                :padding="itemPadding(index)"
              >
                <ProductCard :product="product" :sideBySide="true" />
              </StackLayout>
            </FlexboxLayout>
          </StackLayout>

          <FlexboxLayout marginTop="10" height="20" width="100%" flexDirection="row" alignItems="center">
            <!-- LOADING_MORE... FINISH:COUNT -->
            <Label flexGrow="1" v-if="loadingMore" text=" " class="loading-text font-color-grey font-roboto-light"/>
          </FlexboxLayout>

        </FlexboxLayout>
      </ScrollView>

      <!-- Controls -->
      <BackButton />
      <CartButton />
      <LoadingIndicator v-if="isLoading" />
    </AbsoluteLayout>
  </Page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { ACTIONS, GETTERS, MUTATORS } from '~/store/productList';
import { GETTERS as HOME_GETTERS } from '~/store/home';
import { GETTERS as APP_GETTERS } from "~/store";
import LoadingIndicator from '~/components/LoadingIndicator';
import ProductCard from '~/components/ProductCard';
import BackButton from '~/components/Button/BackButton';
import CartButton from '~/components/Button/CartButton';
import PageTitle from '~/components/PageTitle';
import ProductDetail from '../Detail/Index';
import HomeScreen from '../../Home/Index';
import Filters from './Filters';

export default {
  components: {
    PageTitle,
    ProductCard,
    Filters,
    BackButton,
    CartButton,
    LoadingIndicator,
  },
  props: [ 'title', 'routeId', 'routeData' ],
  watch: {
    products() {
      console.log('LOADING_MORE... FINISH:PRODUCTS', this.products.length, this.totalCount, this.canLoadMore);
      if (this.products.length) {
        this.populateFilter();
      }
    },
    isLoadMorePossible(val) {
      this.canLoadMore = val;
      console.log('CAN_LOAD_MORE_CHANGE', this.canLoadMore);
    },
    currentCount() {
      console.log('LOADING_MORE... FINISH:COUNT', this.products.length, this.totalCount, this.canLoadMore);
      this.loadingMore = false;
    },
  },
  data() {
    return {
      marginLeft: 10,
      marginRight: this.$responsiveUI.deviceWidth - 50,
      canLoadMore: true,
      loadingMore: false,
      page: 0,
      perPage: 8,
      filters: {
        target: '',
        brand: '',
        category: '',
        sort: '',
      },
      filterChanged: false,
    };
  },
  beforeMount() {
  },
  mounted() {
    this.clearFilters();
    this.populateFilter();
    this.clearProducts();
    this.initPaging();
    this.loadItems();
  },
  computed: {
    ...mapGetters({
      isLoading: APP_GETTERS.PROCESSING,
      products: GETTERS.PRODUCTS,
      isLoadMorePossible: GETTERS.CAN_LOADMORE,
      currentPage: GETTERS.PAGE,
      totalPage: GETTERS.TOTAL_PAGE,
      currentCount: GETTERS.COUNT,
      totalCount: GETTERS.TOTAL_COUNT,
    }),
    isProductTargetList() {
      return this.routeId === 'product-target-product-list';
    },
    isProductBrandList() {
      return this.routeId === 'product-brand-product-list';
    },
    isProductCatList() {
      return this.routeId === 'product-category-product-list';
    },
    pageTitle() {
      const title = this.title || 'Product List';
      return title.toUpperCase();
    },
    haveProducts() {
      return this.products && this.products.length > 0;
    },
  },
  methods: {
    ...mapMutations({
      clearProducts: MUTATORS.CLEAR_PRODUCTS,
      clearFilters: MUTATORS.CLEAR_FILTERS,
    }),
    ...mapActions({
      loadTrendingProducts: ACTIONS.LOAD_TRENDING_PRODUCTS,
      loadPrelovedProducts: ACTIONS.LOAD_PRELOVED_PRODUCTS,
      loadOnSaleProducts: ACTIONS.LOAD_ONSALE_PRODUCTS,
      loadCategoryProducts: ACTIONS.LOAD_CATEGORY_PRODUCTS,
      loadBrandProducts: ACTIONS.LOAD_BRAND_PRODUCTS,
      loadTargetProducts: ACTIONS.LOAD_TARGET_PRODUCTS,
    }),
    initPaging() {
      this.canLoadMore = true;
      this.loadingMore = false;
      this.page = 0;
    },
    populateFilter() {
      if ((this.isProductCatList || this.isProductBrandList || this.isProductTargetList) && !this.filterChanged) {
        const { targetId, brandId, categoryId } = this.routeData;
        this.filters.target = targetId || '';
        this.filters.brand = brandId || '';
        this.filters.category = categoryId || '';
      }
    },
    getFilterData() {
      const { target, brand, category, sort } = this.filters;
      let filterTarget = target;
      let filterBrand = brand;
      let filterCategory = category;
      if (this.routeData) {
        const { targetId, brandId, categoryId } = this.routeData;
        if (this.isProductTargetList) {
          filterTarget = targetId;
          if (!this.filterChanged) {
            filterBrand = brandId;
            filterCategory = categoryId;
          }
        }
        if (this.isProductBrandList) {
          filterBrand = brandId;
          if (!this.filterChanged) {
            filterTarget = targetId;
            filterCategory = categoryId;
          }
        }
        if (this.isProductCatList) {
          filterCategory = categoryId;
          if (!this.filterChanged) {
            filterTarget = targetId;
            filterBrand = brandId;
          }
        }
      }
      return {
        sort,
        target: filterTarget,
        brand: filterBrand,
        category: filterCategory,
      };
    },
    loadItems() {
      this.page += 1;
      const loadMoreRequest = (this.routeId === 'trending' && this.loadTrendingProducts)
        || (this.routeId === 'preloved' && this.loadPrelovedProducts)
        || (this.routeId === 'sale' && this.loadOnSaleProducts)
        || (this.isProductCatList && this.loadCategoryProducts)
        || (this.isProductBrandList && this.loadBrandProducts)
        || (this.isProductTargetList && this.loadTargetProducts)
        || null;
      if (loadMoreRequest) {
        this.loadingMore = true;
        console.log('LOADING_MORE... PAGE: ', this.page, 'PER_PAGE: ', this.perPage);
        const { target, brand, category, sort } = this.getFilterData();
        loadMoreRequest({
          page: this.page,
          perPage: this.perPage,
          target,
          brand,
          category,
          sort
        });
      }
    },
    onScroll(event) {
      const scrollY = event.scrollY;
      const scrollableHeight = this.$refs.scrollView.nativeView.scrollableHeight;
      console.log('CURR_SCROLL_POSITION', scrollY);
      console.log('SCROLLABLE: ', scrollableHeight);
      if (this.canLoadMore && !this.loadingMore && (scrollableHeight - scrollY) < 100) {
        this.loadItems();
      }
    },
    handleFilterChange(event) {
      const { target, brand, category, sort } = this.filters;
      if (target !== event.target ||
        brand !== event.brand ||
        category !== event.category ||
        sort !== event.sort) {
          this.filterChanged = true;
          this.page = 0;
          this.clearProducts();
          this.filters.target = event.target;
          this.filters.brand = event.brand;
          this.filters.category = event.category;
          this.filters.sort = event.sort;
          this.loadItems();
      }
      console.log("FILTER", event);
    },
    itemPadding(index) {
      if (index % 2 === 0) {
        return '0 7 10 10';
      }
      return '0 10 10 7';
    },
  }
};
</script>

<style scoped>
.filter-title {
  font-size: 12;
  margin-bottom: 0;
}
.loading-text {
  text-align: center;
  font-size: 12;
}
</style>
