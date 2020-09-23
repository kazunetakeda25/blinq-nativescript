<template>
  <AbsoluteLayout :width="width" :height="height">
    <GridLayout top="0" left="0" :columns="width" :rows="height" :width="width" :height="height">
      <Carousel ref="carousel" row="0" col="0" :height="height" :width="width"
        showIndicator="false" :selectedPage="currentIndex"
        finite="true" bounce="false"
        android:indicatorAnimationDuration="1000" android:indicatorAnimation="slide"
        verticalAlignment="top" color="white">
        <CarouselItem backgroundColor="#b3cde0" verticalAlignment="middle" v-for="(banner, index) in banners" :key="index">
          <Image row="0" col="0" :height="height" :width="width" stretch="aspectFill" class="card-img" :src="banner.ImageURLMobileBanner" @loaded="($event) => onImgLoad($event, index)" />
        </CarouselItem>
      </Carousel>
    </GridLayout>
    <HomeTickers v-if="haveTickers" :tickers="tickers" :wrapperWidth="width" :wrapperHeight="height" />
  </AbsoluteLayout>
</template>

<script>
import { isAndroid } from 'tns-core-modules/platform';
import HomeTickers from './HomeTickers';
export default {
  components: {
    HomeTickers,
  },
  props: {
    banners: Array,
    tickers: Array,
  },
  data() {
    return {
      currentIndex: 0,
      interval: 4,
      autoSlide: null,
      width: this.$responsiveUI.scale(375),
      height: this.$responsiveUI.verticalScale(667 * 0.5),
      imageLoaded: {},
    };
  },
  computed: {
    haveBanners() {
      return this.banners && this.banners.length > 0;
    },
    haveTickers() {
      return this.tickers && this.tickers.length > 0;
    },
  },
  watch: {
    async banners() {
      this.imageLoaded = {};
      await this.$nextTick();
      this.refreshCarousel();
    },
  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    onImgLoad(event, index) {
      console.log('onImgLoad', index, event);
      if (event && event.object) {
        this.imageLoaded[`index-${index}`] = event.object.isLoaded;
      }
      this.triggerLoaded();
    },
    triggerLoaded() {
      const totalImgLoaded = Object.values(this.imageLoaded).filter(val => val).length;
      if (this.banners.length === totalImgLoaded) {
        this.$emit('imgLoaded', true);
      }
    },
    refreshCarousel() {
      if (isAndroid) {
        const adapter = this.$refs.carousel.nativeView.android.getAdapter();
        adapter && adapter.notifyDataSetChanged();
        // this.clearSlideTimer();
        // this.slideNext(0);

      }
      this.$refs.carousel.nativeView.refresh();
    },
    slideNext(nextIndex) {
      if (this.haveBanners) {
        this.currentIndex = nextIndex;
        const newIndex = (this.currentIndex + 1) < this.banners.length ? (this.currentIndex + 1) : 0;
        // this.autoSlide = setTimeout(() => this.slideNext(newIndex), this.interval * 1000);
      }
    },
    clearSlideTimer() {
      if (this.autoSlide) {
        clearTimeout(this.autoSlide);
      }
    },
  }
};
</script>

<style scoped>
</style>
