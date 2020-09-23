<template>
  <Image @tap="$goToCartScreen()" :src="iconImg"
    :height="iconSize" :width="iconSize" top="35" :left="leftMargin" />
</template>

<script>
import { mapGetters } from 'vuex';
import { GETTERS } from '~/store/cart';
const iconNoItem = '~/assets/images/icons/icon_cart.png';
const iconActive = '~/assets/images/icons/icon_cart_active.png';
export default {
  data() {
    return {
      iconSize: 40,
      rightMargin: 10,
    };
  },
  computed: {
    ...mapGetters({
      cartItems: GETTERS.CART_ITEMS,
    }),
    haveItems() {
      return (this.cartItems && this.cartItems.length > 0);
    },
    iconImg() {
      if (this.haveItems) {
        return iconActive;
      }
      return iconNoItem;
    },
    leftMargin() {
      const deviceWidth = this.$responsiveUI.deviceWidth;
      return deviceWidth - this.iconSize - this.rightMargin;
    },
  },
  watch: {},
  beforeMount() {},
  mounted() {
  },
  methods: {
    onTap() {
      this.$emit('onTap');
    },
  }
};
</script>

<style scoped>
</style>
