<template>
  <Shadow borderRadius="2">
    <GridLayout
      columns="*"
      rows="auto"
      width="100%"
    >
      <StackLayout padding="10,10,10,10" backgroundColor="white">
        <GridLayout
          ref="productWrapper"
          columns="*"
          rows="4*,*,*,*"
          width="100%"
          height="auto"
          horizontalAlignment="center"
        >
          <StackLayout ref="productImg" col="0" row="0">
            <AbsoluteLayout ref="cardImg" width="100%" :height="imgHeight">
              <StackLayout width="100%" :height="imgHeight" top="0" left="0">
                <Image
                  width="100%"
                  height="100%"
                  horizontalAlignment="center"
                  stretch="aspectFit"
                  :src="product.ProductImage[0].ImageURLMedium"
                  @tap="openProductInfo"
                />
              </StackLayout>
              <StackLayout v-if="product.Discount" top="-3" left="-3" width="40" height="40">
                <ProductDiscount :discount="product.Discount" />
              </StackLayout>
            </AbsoluteLayout>
          </StackLayout>
          <StackLayout ref="productName" col="0" row="1" marginTop="5" marginLeft="5" marginRight="5">
            <Label :text="product.Brand.Name" class="brand-name font-color" />
            <Label
              :text="$responsiveUI.toUpperCase(product.Name)"
              class="product-name font-color-grey"
            />
          </StackLayout>
          <StackLayout ref="productPrice" col="0" row="2" marginTop="15" marginLeft="5" marginRight="5">
            <StackLayout width="100%" height="14">
              <Label v-if="showRRP" :text="rrpText" class="product-price-small" />
            </StackLayout>
            <Label :text="product.Price" class="product-price font-color-grey" />
          </StackLayout>
          <StackLayout ref="buttonView" col="0" row="3" marginTop="5">
            <FlexBoxLayout
              class="quick_view_button"
              v-shadow="1"
              alignItems="center"
              justifyContent="center"
              :height="buttonHeight"
              :backgroundColor="$colors.GREY"
              @tap="openProductInfo"
            >
              <Label class="font-roboto-regular" text="QUICK VIEW" fontSize="12" />
            </FlexBoxLayout>
          </StackLayout>
        </GridLayout>
      </StackLayout>
    </GridLayout>
  </Shadow>
</template>

<script>
const { setTimeout } = require('tns-core-modules/timer');
import Shadow from '~/components/Shadow/Regular';
import ProductDiscount from './ProductDiscount';
export default {
  components: {
    Shadow,
    ProductDiscount,
  },
  props: {
    product: Object,
    sideBySide: Boolean
  },
  data() {
    return {
      imgWidth: 0,
      imgHeight: 0,
      buttonHeight: this.sideBySide && 35 || 40,
    };
  },
  computed: {
    showRRP() {
      return (
        (this.product.RRP && this.product.RRP !== this.product.Price) ||
        this.sideBySide
      );
    },
    rrpText() {
      if (this.product.RRP && this.product.RRP !== this.product.Price) {
        return this.product.RRP;
      }
      if (this.sideBySide) {
        return "";
      }
      return "";
    }
  },
  watch: {},
  beforeMount() {},
  mounted() {
    this.getImgHeight();
    // setTimeout(() => {
    //   const productWrapper = this.$refs['productWrapper'].nativeView.getMeasuredHeight();
    //   const productImg = this.$refs['productImg'].nativeView.getMeasuredHeight();
    //   const productName = this.$refs['productName'].nativeView.getMeasuredHeight();
    //   const productPrice = this.$refs['productPrice'].nativeView.getMeasuredHeight();
    //   const buttonView = this.$refs['buttonView'].nativeView.getMeasuredHeight();
    //   console.log('productWrapper', productWrapper);
    //   console.log('productImg', productImg);
    //   console.log('productName', productName);
    //   console.log('productPrice', productPrice);
    //   console.log('buttonView', buttonView);
    // }, 500);
  },
  methods: {
    getImgWidth() {
      if (this.sideBySide) {
        this.imgWidth = (this.$responsiveUI.deviceWidth / 2) - 80;
      } else {
        this.imgWidth = this.$responsiveUI.deviceWidth - 40;
      }
      return this.imgWidth;
    },
    getImgHeight() {
      this.imgHeight = this.getImgWidth() * 1.3;
    },
    openProductInfo() {
      this.$goToScreen('product-detail', this.product);
    }
  }
};
</script>

<style scoped>
.brand-name {
  font-family: "Roboto", "Roboto-Black";
  font-weight: 900;
  font-size: 14;
  background-color: white;
}
.product-name,
.product-price {
  font-family: "Roboto", "Roboto-Light";
  font-weight: 300;
  font-size: 16;
  background-color: white;
}
.product-price-small {
  font-family: "Roboto", "Roboto-Regular";
  font-weight: 400;
  font-size: 12;
  background-color: white;
  color: gray;
  text-decoration: line-through;
}
.quick_view_button {
  color: #000;
  width: 100%;
  background-color: #f8f8f8;
}
</style>
