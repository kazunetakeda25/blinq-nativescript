<template>
<StackLayout class="bg-default" padding="0 10">
  <StackLayout
    v-for="(minibanner,index) in miniBanners"
    :key="index"
    width="100%"
    padding="10,0"
  >
    <Shadow>
      <StackLayout width="100%" :height="itemHeight" backgroundColor="white">
        <Image col="0" :row="index"
          horizontalAlignment="center" :height="itemHeight" width="100%" stretch="aspectFill"
          :src="minibanner.ImageURL" @loaded="($event) => onImgLoad($event, index)"
          @tap="() => onClick(minibanner)"
        />
      </StackLayout>
    </Shadow>
  </StackLayout>
</StackLayout>
</template>

<script>
import Shadow from '~/components/Shadow/Thin';
export default {
  components: {
    Shadow,
  },
  props: ['miniBanners'],
  data() {
    return {
      imageLoaded: {},
      // itemHeight: 'auto',
    };
  },
  computed: {
    itemHeight() {
      return (this.$responsiveUI.scale(375) - 20) * 0.4;
    },
    haveMiniBanners() {
      return this.miniBanners && this.miniBanners.length > 0;
    }
  },
  watch: {
    miniBanners() {
      this.imageLoaded = {};
    },
  },
  beforeMount() {},
  mounted() {},
  methods: {
    onImgLoad(event, index) {
      console.log('onImgLoad', index, event);
      if (event && event.object) {
        const img = event.object;
        this.imageLoaded[`index-${index}`] = img.isLoaded;
      }
      this.triggerLoaded();
    },
    triggerLoaded() {
      const totalImgLoaded = Object.values(this.imageLoaded).filter(val => val).length;
      if (this.miniBanners.length === totalImgLoaded) {
        this.$emit('imgLoaded', true);
      }
    },
    onClick(miniBanner) {
      if (miniBanner.Link === 'main/product/trending') {
        this.$goToProductListScreen('trending', null, 'Trending');
      }
      if (miniBanner.Link === 'main/product/preloved') {
        this.$goToProductListScreen('preloved', null, 'PreLoved');
      }
      if (miniBanner.Link === 'main/product/sale') {
        this.$goToProductListScreen('sale', null, 'On Sale');
      }
    },
  }
};
</script>

<style scoped>
</style>
