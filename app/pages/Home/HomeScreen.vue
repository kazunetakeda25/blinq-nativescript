<template>
  <Page actionBarHidden="true">
    <AbsoluteLayout>
      <ScrollView top="0" left="0" width="100%" height="100%" class="bg-default">
        <StackLayout class="main bg-default" verticalAlignment="top">

          <GridLayout v-if="haveBanners" columns="*" rows="*" verticalAlignment="top">
            <HomeTopCarousel verticalAlignment="top" :banners="banners" :tickers="tickers" @imgLoaded="onCarouselLoaded" />
          </GridLayout>

          <StackLayout
            paddingTop="20"
            marginTop="-25"
            borderTopLeftRadius="25"
            borderTopRightRadius="25"
            minHeight="200"
            height="auto"
            width="100%"
            class="bg-default"
          >
            <MiniBannerList v-if="carouselLoaded && haveMiniBanners"
              :miniBanners="miniBanners" @imgLoaded="onMiniBannerLoaded"
            />
          </StackLayout>

          <StackLayout
            paddingTop="20"
            paddingBottom="5"
            height="auto"
            width="100%"
            stretch="aspectFit"
            class="bg-default"
            horizontalAlignment="center"
            v-if="miniBannerLoaded"
          >
            <Label v-if="haveFeaturedProducts" class="bg-default home-section-header-title" text="FEATURED PRODUCTS" />
            <StackLayout width="100%" padding="10 10 5 10" v-for="(product,index) in featuredProducts" :key="index">
              <ProductCard :product="product" />
            </StackLayout>

            <Label v-if="haveBrands" class="home-section-header-title bg-default" text="BRANDS WE CARRY" />
            <BrandList v-if="haveBrands" :brands="brands" :random="true" :limit="15" />

            <StackLayout v-if="haveBrands" class="brand-view-more bg-default">
              <Label class="font-roboto-light brand-view-more-btn font-color"
                @tap="goToBrandList" text="View more >" />
            </StackLayout>

            <Label v-if="haveBlogHighlights" class="bg-default home-section-header-title" text="HIGHLIGHTS" />
            <BlogList v-if="haveBlogHighlights" :blogHighlights="blogHighlights" />
          </StackLayout>
        </StackLayout>
      </ScrollView>

      <!-- Controls -->
      <DrawerButton @onTap="onTabMenuIcon" />
      <CartButton />

      <LoadingIndicator v-if="isLoading" />
    </AbsoluteLayout>
  </Page>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { ACTIONS, GETTERS } from "~/store/home";
import { GETTERS as MENU_GETTERS } from '~/store/menu';
import { GETTERS as APP_GETTERS, MUTATORS as APP_MUTATORS } from "~/store";
import LoadingIndicator from '~/components/LoadingIndicator';
import MiniBannerList from "~/components/MiniBannerList";
import BrandList from "~/components/BrandList";
import ProductCard from "~/components/ProductCard";
import DrawerButton from '~/components/Button/DrawerButton';
import CartButton from '~/components/Button/CartButton';
import BlogList from "~/components/BlogList";
import HomeTopCarousel from "./HomeTopCarousel";
import BrandPage from "../Product/Brand/List";
export default {
  props: {},
  components: {
    HomeTopCarousel,
    MiniBannerList,
    BrandList,
    ProductCard,
    BlogList,
    DrawerButton,
    CartButton,
    LoadingIndicator,
  },
  data() {
    return {
      carouselLoaded: false,
      miniBannerLoaded: false,
    };
  },
  computed: {
    ...mapGetters({
      isLoading: APP_GETTERS.PROCESSING,
      banners: GETTERS.BANNERS,
      tickers: GETTERS.TICKERS,
      miniBanners: GETTERS.MINI_BANNERS,
      featuredProducts: GETTERS.FEATURED_PRODUCTS,
      brands: GETTERS.BRANDS,
      blogHighlights: GETTERS.BLOG_HIGHLIGHTS,
      selectedCurrency: MENU_GETTERS.SELECTED_CURRENCY,
    }),
    haveBanners() {
      return this.banners && this.banners.length > 0;
    },
    haveMiniBanners() {
      return this.miniBanners && this.miniBanners.length > 0;
    },
    haveFeaturedProducts() {
      return this.featuredProducts && this.featuredProducts.length > 0;
    },
    haveBrands() {
      return this.brands && this.brands.length > 0;
    },
    haveBlogHighlights() {
      return this.blogHighlights && this.blogHighlights.length > 0;
    },
    carouselWidth() {
      return this.$responsiveUI.scale(375);
    },
    carouselHeight() {
      return this.$responsiveUI.verticalScale(667 * 0.5);
    }
  },
  watch: {
    selectedCurrency() {
      this.loadData();
    },
  },
  beforeMount() {},
  mounted() {
    if (!this.haveBanners ||
      !this.haveMiniBanners ||
      !this.haveFeaturedProducts ||
      !this.haveBrands ||
      !this.haveBlogHighlights) {
      this.carouselLoaded = false;
      this.miniBannerLoaded = false;
      this.loadData();
      this.addProcess(); // banners
      this.addProcess(); // miniBanners
    }
  },
  methods: {
    ...mapActions({
      loadBanners: ACTIONS.LOAD_BANNERS,
      loadTickers: ACTIONS.LOAD_TICKERS,
      loadMiniBanners: ACTIONS.LOAD_MINI_BANNERS,
      loadFeaturedProducts: ACTIONS.LOAD_FEATURED_PRODUCTS,
      loadBrands: ACTIONS.LOAD_BRANDS,
      loadBlogHighlights: ACTIONS.LOAD_BLOG_HIGHLIGHTS
    }),
    ...mapMutations({
      addProcess: APP_MUTATORS.ADD_PROCESSING,
      removeProcess: APP_MUTATORS.REMOVE_PROCESSING,
    }),
    loadData() {
      this.loadBanners();
      this.loadTickers();
      this.loadMiniBanners();
      this.loadFeaturedProducts();
      this.loadBrands();
      this.loadBlogHighlights();
    },
    onTabMenuIcon() {
      this.$emit('onTabMenuIcon');
    },
    onCarouselLoaded() {
      console.log('CAROUSEL_LOADED');
      this.carouselLoaded = true;
      this.removeProcess();
    },
    onMiniBannerLoaded() {
      console.log('MINI_BANNERS_LOADED');
      this.miniBannerLoaded = true;
      this.removeProcess();
    },
    goToBrandList() {
      this.$navigateTo(BrandPage);
    },
    onBusyChanged($event) {
      console.log("ACTIVITY CHANGED: ", $event);
    }
  }
};
</script>

<style scoped>
.home-section-header-title {
  width: 100%;
  text-align: center;
  padding-top: 40;
  padding-bottom: 15;
}
.main {
  padding-bottom: 30;
}
.brand-view-more {
  width: 100%;
  text-align: center;
}
.brand-view-more-btn {
  padding: 5 10;
  font-size: 12;
}
</style>
