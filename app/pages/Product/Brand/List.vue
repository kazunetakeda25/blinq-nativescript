<template>
  <Page actionBarHidden="true">
    <AbsoluteLayout>
      <ScrollView ref="scrollView" top="0" left="0" width="100%" height="100%" class="bg-default" @scroll="onScroll">
        <FlexboxLayout flexDirection="column" paddingBottom="10" alignItems="top">

          <FlexboxLayout marginTop="40" marginBottom="20" height="80" width="100%" flexDirection="row" alignItems="top">
            <Label flexGrow="1" :text="pageTitle" class="page-title"/>
          </FlexboxLayout>

          <BrandList v-if="haveBrands" :brands="brands" />

          <FlexboxLayout marginTop="30" height="20" width="100%" flexDirection="row" alignItems="center">
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
import { ACTIONS, GETTERS, MUTATORS } from '~/store/brandList';
import { GETTERS as APP_GETTERS } from "~/store";
import LoadingIndicator from '~/components/LoadingIndicator';
import BackButton from '~/components/Button/BackButton';
import CartButton from '~/components/Button/CartButton';
import BrandList from '~/components/BrandList';

export default {
  components: {
    BrandList,
    BackButton,
    CartButton,
    LoadingIndicator,
  },
  props: {},
  watch: {
    isLoadMorePossible(val) {
      this.canLoadMore = val;
      console.log('CAN_LOAD_MORE_CHANGE', this.canLoadMore);
    },
    currentCount() {
      this.loadingMore = false;
    },
  },
  data() {
    return {
      canLoadMore: true,
      loadingMore: false,
      page: 0,
      perPage: 15,
    };
  },
  beforeMount() {
  },
  mounted() {
    this.clearBrands();
    this.initPaging();
    this.loadItems();
  },
  computed: {
    ...mapGetters({
      isLoading: APP_GETTERS.PROCESSING,
      brands: GETTERS.BRANDS,
      isLoadMorePossible: GETTERS.CAN_LOADMORE,
      currentPage: GETTERS.PAGE,
      totalPage: GETTERS.TOTAL_PAGE,
      currentCount: GETTERS.COUNT,
      totalCount: GETTERS.TOTAL_COUNT,
    }),
    pageTitle() {
      return 'BRAND LIST';
    },
    haveBrands() {
      return this.brands && this.brands.length > 0;
    },
  },
  methods: {
    ...mapMutations({
      clearBrands: MUTATORS.CLEAR_BRANDS,
    }),
    ...mapActions({
      loadBrands: ACTIONS.LOAD_BRANDS,
    }),
    initPaging() {
      this.canLoadMore = true;
      this.loadingMore = false;
      this.page = 0;
    },
    loadItems() {
      this.page += 1;
      this.loadingMore = true;
      console.log('LOADING_MORE... PAGE: ', this.page, 'PER_PAGE: ', this.perPage);
      this.loadBrands({
        page: this.page,
        perPage: this.perPage
      });
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
  }
};
</script>

<style scoped></style>
