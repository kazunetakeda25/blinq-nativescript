<template>
  <Shadow borderRadius="2">
    <StackLayout ref="product" width="100%" backgroundColor="white" :height="productHeight">
      <AbsoluteLayout width="100%" :height="productHeight">
        <StackLayout :top="padding" :left="padding" :width="imgWidth" :height="imgHeight">
          <Image
            :width="imgWidth" :height="imgHeight"
            horizontalAlignment="center"
            stretch="aspectFit"
            :src="product.ProductImage[0].ImageURLMedium"
            @tap="openProductInfo"
          />
        </StackLayout>
        <StackLayout v-if="product.Discount" top="5" left="5" width="40" height="40">
          <ProductDiscount :discount="product.Discount" />
        </StackLayout>
      </AbsoluteLayout>
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
    </StackLayout>
  </Shadow>
</template>

<script>
const { setTimeout } = require('timer');
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
      productWidth: 0,
      padding: 10,
      buttonHeight: this.sideBySide && 35 || 40,
    };
  },
  computed: {
    productHeight() {
      return this.productWidth * 1.3;
    },
    imgWidth() {
      const w = this.productWidth - (this.padding * 2);
      return w > 0 ? w : 0;
    },
    imgHeight() {
      const h = this.productHeight - (this.padding * 2);
      return h > 0 ? h : 0;
    },
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
    setTimeout(() => {
    this.productWidth = this.$refs.product.nativeView.getMeasuredWidth();
    console.log('this.productWidth', this.productWidth);
    }, 0);
  },
  methods: {
    openProductInfo() {
      this.$emit("openFeatureProduct", this.product);
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
