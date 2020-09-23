<template>
  <Page actionBarHidden="true">
    <AbsoluteLayout class="bg-default">
      <ScrollView :height="$responsiveUI.verticalScale(667)" :width="$responsiveUI.scale(375)">
        <StackLayout paddingBottom="20">
          <!-- PRODUCT IMAGE -->
          <AbsoluteLayout
            class="top-header-container"
            :width="$responsiveUI.scale(375)"
            :height="$responsiveUI.scale(450)"
            :marginBottom="-$responsiveUI.scale(20)"
          >
            <GridLayout
              top="0"
              left="0"
              :columns="$responsiveUI.deviceWidth"
              :rows="$responsiveUI.scale(450)"
              :width="$responsiveUI.deviceWidth"
              :height="$responsiveUI.scale(450)"
              :paddingBottom="$responsiveUI.scale(10)"
            >
              <Carousel
                ref="carousel"
                row="0"
                col="0"
                :height="$responsiveUI.scale(440)"
                :width="$responsiveUI.deviceWidth"
                showIndicator="false"
                :selectedPage="currentIndex"
                pageChanged="myChangeEvent"
                finite="true"
                bounce="false"
                android:indicatorAnimationDuration="1000"
                android:indicatorAnimation="slide"
                verticalAlignment="top"
                color="white"
              >
                <CarouselItem
                  backgroundColor="#ffffff"
                  verticalAlignment="middle"
                  v-for="(imageItem, index) in imageCollection"
                  :key="index"
                >
                  <Image
                    row="0"
                    col="0"
                    :width="$responsiveUI.deviceWidth"
                    stretch="aspectFit"
                    class="card-img"
                    :src="imageItem.url"
                  />
                </CarouselItem>
              </Carousel>
            </GridLayout>

            <FlexboxLayout
              v-if="imageCollection.length > 1"
              :left="$responsiveUI.scale(75)"
              :top="$responsiveUI.scale(215)"
              :width="$responsiveUI.scale(225)"
              flexDirection="row"
              :justifyContent="currentIndex > 0 ? 'space-between': 'flex-end'"
              alignItems="center"
            >
              <Image
                v-if="currentIndex > 0"
                @tap="onMovePrevious"
                src="~/assets/images/icons/icon_back_arrow.png"
                height="30"
                width="30"
              />

              <Image
                v-if="currentIndex < imageCollection.length - 1"
                @tap="onMoveNext"
                src="~/assets/images/icons/icon_back_arrow.png"
                height="30"
                width="30"
                rotate="180"
              />
            </FlexboxLayout>

            <FlexboxLayout
              class="header-action-group"
              flexDirection="row"
              justifyContent="flex-end"
              :top="$responsiveUI.scale(390)"
              :width="$responsiveUI.scale(375)"
              :height="$responsiveUI.scale(55)"
            >
              <FlexboxLayout
                class="action-tryMeOut"
                @tap="onTryMeOut"
                alignItems="center"
                justifyContent="flex-start"
                :borderTopLeftRadius="$responsiveUI.scale(15)"
                :paddingLeft="$responsiveUI.scale(15)"
                :paddingBottom="$responsiveUI.scale(10)"
                :width="$responsiveUI.scale(150)"
              >
                <Label
                  class="font-roboto-black button-label"
                  :fontSize="$responsiveUI.moderateScale(14)"
                  text="TRY ME"
                  color="#fff"
                />
                <Image
                  src="~/assets/images/icons/icon_blinq_q.png"
                  :marginLeft="$responsiveUI.scale(10)"
                  :marginRight="$responsiveUI.scale(10)"
                  :width="$responsiveUI.scale(18)"
                  :height="$responsiveUI.scale(18)"
                  stretch="aspectFit"
                />
              </FlexboxLayout>
              <FlexboxLayout
                class="action-addToCart"
                @tap="itemData && onAddToBag(itemData)"
                alignItems="center"
                justifyContent="center"
                :borderTopLeftRadius="$responsiveUI.scale(15)"
                :width="$responsiveUI.scale(150)"
                :paddingBottom="$responsiveUI.scale(10)"
                flexDirection="row"
                :backgroundColor="isAvailable && $colors.PINK || $colors.PINK_DISABLED"
              >
                <Label
                  class="font-roboto-black button-label"
                  :fontSize="$responsiveUI.moderateScale(14)"
                  :text="btnCartText"
                  color="#fff"
                />
                <Image
                  v-if="isAvailable"
                  src="~/assets/images/icons/icon_arrow_right.png"
                  :marginLeft="$responsiveUI.scale(15)"
                  :width="$responsiveUI.scale(18)"
                  :height="$responsiveUI.scale(19.7)"
                  stretch="aspectFit"
                />
              </FlexboxLayout>
            </FlexboxLayout>
          </AbsoluteLayout>
          <StackLayout class="content-description bg-default" padding="20">
            <!-- PRODUCT NAME -->
            <StackLayout>
              <FlexboxLayout flexDirection="row" flexWrap="wrap" width="100%">
                <Label
                  v-for="(targetObj, index) in targetList"
                  :key="index"
                  :color="$colors.PINK"
                  class="font-roboto-black font-h8"
                  :text="`${targetObj.Label} ${(index < targetList.length - 1) && '-' || '' }`"
                  @tap="$goToProductListScreen('product-target-product-list', { targetId: targetObj.ID }, targetObj.Label)"
                />
                <Label
                  color="#000"
                  class="font-roboto-black font-h8"
                  :text="`  /${brand.name}`"
                  @tap="$goToProductListScreen('product-brand-product-list', { brandId: brand.id }, brand.name)"
                />
                <Label
                  v-for="(category, index) in categories"
                  :key="index"
                  color="#000"
                  class="font-roboto-black font-h8"
                  :text="`${index === 0 && '  /' || ' '}${category.Name} ${(index < categories.length - 1) && '-' || '' }`"
                  @tap="$goToProductListScreen('product-category-product-list', { categoryId: category.ID }, category.Name)"
                />
              </FlexboxLayout>
              <FlexboxLayout
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
                width="100%"
                marginTop="10"
                marginBottom="10"
                marginRight="25"
              >
                <!-- <Image
                  :src="isLike && '~/assets/images/icons/icon_heart_pink.png' || '~/assets/images/icons/icon_heart.png'"
                  :width="$responsiveUI.scale(22.26087)"
                  :height="$responsiveUI.scale(20)"
                  stretch="aspectFit"
                  @tap="onChangedLikeStatus"
                />-->
                <Image
                  src="~/assets/images/icons/icon_share.png"
                  :marginLeft="$responsiveUI.scale(20)"
                  :width="$responsiveUI.scale(17.656)"
                  :height="$responsiveUI.scale(20)"
                  stretch="aspectFit"
                  @tap="shareSocial"
                />
              </FlexboxLayout>
              <Label
                class="font-roboto-light product-name"
                :text="product.Name"
                textWrap="true"
              />
              <HtmlView
                class="font-roboto-light"
                :html="product.Description"
              />
              <FlexBoxLayout
                flexDirection="row"
                width="100%"
                flexWrap="wrap"
                marginTop="10"
                justifyContent="space-between"
              >
                <StackLayout width="48%">
                  <Label class="font-roboto-black font-h9" marginBottom="5" text="Material" />
                  <Label
                    class="font-roboto-light font-h8"
                    :text="product.Material"
                    textWrap="true"
                  />
                </StackLayout>
                <StackLayout width="48%">
                  <Label class="font-roboto-black font-h9" marginBottom="5" text="Shipped from" />
                  <Label class="font-roboto-light font-h8" :text="shippedFrom" textWrap="true" />
                </StackLayout>
              </FlexBoxLayout>
              <StackLayout class="bg-grey" width="100%" height="1" marginTop="10" />
            </StackLayout>
            <FlexBoxLayout paddingBottom="20" flexDirection="column">
              <!-- PRODUCT ATTRIBUTES -->
              <FlexBoxLayout
                flexDirection="row"
                marginTop="20"
                v-if="haveAttribute"
                width="100%"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <StackLayout
                  v-for="(item, index) in itemData.AttributeValue"
                  :key="index"
                  width="48%"
                  padding="0"
                >
                  <InputSelect
                    v-if="itemSelected && itemSelected[item.ID]"
                    :centerOption="true"
                    :label="item.Name"
                    v-model="itemSelected[item.ID]"
                    :options="getAttributeData(item.ID)"
                    @onChange="onChangeSelect(item.ID, $event)"
                  />
                </StackLayout>
              </FlexBoxLayout>
              <StackLayout class="bg-grey" v-if="haveAttribute" width="100%" height="1" marginTop="15" />
              <FlexboxLayout
                v-if="isAvailable"
                marginTop="10"
                width="100%"
                flexDirection="row"
                justifyContent="space-between"
              >
                <StackLayout width="48%">
                  <InputSelect label="Quantity" v-model="quantity" :centerOption="true" :options="quantityOptions" />
                </StackLayout>
                <StackLayout width="48%" height="50" paddingTop="30">
                  <Label
                    class="font-roboto-light"
                    fontSize="10"
                    :text="`Limited units! Only ${attributeDetail.Stock} available.`"
                  />
                </StackLayout>
              </FlexboxLayout>
              <!-- PRODUCT DESCRIPTION -->
              <FlexBoxLayout
                class="description-content"
                flexDirection="row"
                width="100%"
                paddingBottom="10"
              >
                <StackLayout :marginTop="$responsiveUI.scale(20)" width="50%">
                  <Label
                    v-if="isDiscount"
                    class="font-roboto-light price-label-rrp font-color-grey"
                    :text="product.RRP"
                    textWrap="true"
                    textDecoration="line-through"
                  />
                  <FlexBoxLayout flexDirection="row" alignItems="center">
                    <Label
                      class="font-roboto-light price-label"
                      :text="product.Price"
                      textWrap="true"
                    />
                    <ProductDiscount v-if="product.Discount" :discount="product.Discount" />
                  </FlexBoxLayout>
                </StackLayout>
                <RoundButton
                  v-if="isAvailable"
                  alignSelf="flex-end"
                  marginLeft="10"
                  :pink="true"
                  text="ADD TO BAG"
                  @onTap="itemData && onAddToBag(itemData)"
                />
              </FlexBoxLayout>
            </FlexBoxLayout>
          </StackLayout>
        </StackLayout>
      </ScrollView>

      <BackButton />
      <CartButton />
      <LoadingIndicator v-if="isLoading" />
    </AbsoluteLayout>
  </Page>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { ACTIONS, GETTERS, MUTATORS } from "~/store/productDetail";
import { GETTERS as CONFIG_GETTERS } from "~/store";
import { GETTERS as MENU_GETTERS } from "~/store/menu";
import LoadingIndicator from '~/components/LoadingIndicator';
import { GETTERS as CART_GETTERS, MUTATORS as CART_MUTATORS } from "~/store/cart";
import { ATTRIBUTE_STATUS } from "~/common/constants/attributeStatus.const";
import BackButton from "~/components/Button/BackButton";
import CartButton from "~/components/Button/CartButton";
import RoundButton from "~/components/Button/RoundButton";
import { BASE_API_URL } from "~/common/constants/api.const";
import InputSelect from "~/components/Input/InputSelect";
import Shadow from "~/components/Shadow/Thin";
import ProductDiscount from '~/components/ProductDiscount';
export default {
  props: {
    itemDetail: Object
  },
  components: {
    BackButton,
    CartButton,
    RoundButton,
    Shadow,
    InputSelect,
    LoadingIndicator,
    ProductDiscount,
  },
  data() {
    return {
      loaded: false,
      itemSelected: null,
      isLike: false,
      quantity: 0,
      currentIndex: 0,
    };
  },
  watch: {
    async imageCollection() {
      console.log('imageCollection', JSON.stringify(this.imageCollection));
      this.currentIndex = 0;
      await this.$nextTick();
      this.$refs.carousel.nativeView.refresh();
    },
    itemData() {
      this.itemSelected = this.getAttributeDataSelected();
      const params = {
        memberId: "",
        currency: this.currency,
        productId: this.itemData.ID,
        attribute: { ...this.itemSelected }
      };
      this.loadAttributeDetail(params);
    },
    attributeDetail() {
      console.log("attributeDetail: ", JSON.stringify(this.attributeDetail));
      console.log("attributeDetail Stock: ", this.attributeDetail.Stock);
      console.log("attributeDetail status: ", this.attributeDetail.status);
      if (this.attributeDetail.status === ATTRIBUTE_STATUS.UNKNOW) {
        if ((this.product.Stock - 0) > 0) {
          this.quantity = 1;
        } else {
          this.quantity = 0;
        }
      } else {
        if (this.attributeDetail.status === ATTRIBUTE_STATUS.AVAILABLE) {
          this.quantity = 1;
        } else {
          this.quantity = 0;
        }
      }
      if (this.attributeDetail.Stock !== undefined || this.attributeDetail.status === ATTRIBUTE_STATUS.UNKNOW) {
        this.loaded = true;
      }
    },
    attributeList() {
      console.log("LIST WATCHED: ", this.attributeList);
    }
  },
  computed: {
    ...mapGetters({
      isLoading: CONFIG_GETTERS.PROCESSING,
      cartItems: CART_GETTERS.CART_ITEMS,
      itemData: GETTERS.PRODUCT,
      attributeDetail: GETTERS.ATTRIBUTE_DETAIL,
      currency: MENU_GETTERS.SELECTED_CURRENCY,
      appConfig: CONFIG_GETTERS.APP_CONFIG,
      selectedCountry: MENU_GETTERS.SELECTED_COUNTRY
    }),
    product() {
      return (this.itemData.ID && this.itemData) || this.itemDetail;
    },
    isAvailable() {
      if (this.attributeDetail.status === ATTRIBUTE_STATUS.UNKNOW) {
        return (this.product.Stock - 0) > 0;
      }
      return this.attributeDetail.status === ATTRIBUTE_STATUS.AVAILABLE;
    },
    haveAttribute() {
      return (this.itemData && this.itemData.AttributeValue && this.itemData.AttributeValue.length > 0);
    },
    btnCartText() {
      if (!this.loaded) {
        return 'LOADING...';
      }
      if (this.attributeDetail.status === ATTRIBUTE_STATUS.UNKNOW) {
        if (this.stock > 0) {
          return 'ADD TO BAG';
        }
        if (this.stock === 0) {
          return 'OUT OF STOCK';
        }
        return 'NOT AVAILABLE';
      } else {
        if (this.attributeDetail.status === ATTRIBUTE_STATUS.AVAILABLE) {
          return 'ADD TO BAG';
        }
        if (this.attributeDetail.status === ATTRIBUTE_STATUS.OUT_OF_STOCK) {
          return 'OUT OF STOCK';
        }
        return 'NOT AVAILABLE';
      }
    },
    imageCollection() {
      const imgArray = [];
      if (this.itemData && this.itemData.ProductImage) {
        for (let index = 0; index < this.itemData.ProductImage.count; index++) {
          const element = this.itemData.ProductImage[index];
          const objectImage = {
            url: element.ImageURLMedium,
            tag: element.ID
          };
          imgArray.push(objectImage);
        }
      }
      return imgArray;
    },
    quantityOptions() {
      const options = [];
      if (!this.quantity || !this.attributeDetail) {
        options.push({ Code: 0, Name: 0 });
      }
      if (this.stock) {
        const stock = this.stock - 0;
        for (let index = 1; index <= stock; index++) {
          options.push({ Code: index, Name: index });
        }
      }

      return options;
    },
    isDiscount() {
      return this.product.RRP !== this.product.Price && Boolean(this.product.RRP);
    },
    attributeList() {
      return (this.product && this.product.AttributeValue) || [];
    },
    stock() {
      if (this.attributeDetail.status !== ATTRIBUTE_STATUS.UNKNOW) {
        return this.attributeDetail.Stock || 0;
      }
      return this.product && this.product.Stock;
    },
    shippedFrom() {
      return (this.product && this.product.ShippedFrom && this.product.ShippedFrom.Name) || "";
    },
    targetList() {
      const targetListName = [];
      if (
        this.itemData.TargetDisplay &&
        this.itemData.TargetDisplay.length &&
        this.itemData.TargetDisplay.length > 0
      ) {
        this.itemData.TargetDisplay.forEach(e => {
          targetListName.push(e);
        });
      }
      return targetListName;
      // return (targetListName.length > 0 && targetListName.join(" - ")) || "";
    },
    brand() {
      return {
        name: this.product.Brand.Name || "",
        id: this.product.Brand.ID
      };
    },
    categories() {
      const categoryListName = [];
      if (
        this.itemData.CategoryDisplay &&
        this.itemData.CategoryDisplay.length &&
        this.itemData.CategoryDisplay.length > 0
      ) {
        this.itemData.CategoryDisplay.forEach(e => {
          categoryListName.push(e);
        });
      }

      return categoryListName;
    }
  },
  methods: {
    ...mapMutations({
      addToCart: CART_MUTATORS.ADD_TO_CART,
      clearProductDetail: MUTATORS.CLEAR_PRODUCT_DETAIL,
    }),
    ...mapActions({
      loadProductDetail: ACTIONS.LOAD_PRODUCT_DETAIL,
      loadAttributeDetail: ACTIONS.LOAD_ATTRIBUTE_DETAIL
    }),
    getAttributeData(attributeType) {
      if (this.product.AttributeValue && Array.isArray(this.product.AttributeValue)) {
        const attributeObject = this.product.AttributeValue.find(
          e => e.ID === attributeType
        );
        if (attributeObject && Array.isArray(attributeObject.AttributeValue)) {
          const newList = [];
          attributeObject.AttributeValue.forEach(e => {
            const item = {
              Code: e.ID,
              Name: e.Value,
              IsDefault: e.Default
            };
            newList.push(item);
          });
          console.log("OPTION DATA: ", newList);
          return newList;
        }
      }
      return [];
    },
    getAttributeDataSelected() {
      if (!this.attributeList || this.attributeList.length <= 0) {
        return null;
      }
      const dataSelected = {};
      for (let index = 0; index < this.attributeList.length; index++) {
        const element = this.attributeList[index]; // AttributeType Object
        const itemSelected = element.AttributeValue.find(e => e.Default === 1);
        dataSelected[element.ID] = itemSelected.ID || "";
      }
      return dataSelected;
    },
    onChangeSelect(type, value) {
      if (this.itemSelected[type]) {
        this.itemSelected[type] = value.value;
        const params = {
          memberId: "",
          currency: this.currency,
          productId: this.itemData.ID,
          attribute: { ...this.itemSelected }
        };
        console.log("REQUEST ATTRIBUTE PARAM: ", params);
        this.loadAttributeDetail(params);
      }
    },
    onChangeQuantity(evt) {
      this.quantity = evt;
    },
    onChangedLikeStatus() {
      this.isLike = !this.isLike;
    },
    onTryMeOut() {
      this.$goToScreen('product-try-me', {
        memberModelPhoto: this.itemData.member_model_photo,
        productOverlayPhoto: this.itemData.product_overlay_photo,
        productOverlayPhotoJson: this.itemData.product_overlay_photo_json,
      });
    },
    getCurrentItemInCart() {
      const combinationID = this.attributeDetail && this.attributeDetail.ID || 0;
      return this.cartItems
        .find((item) => `${item.ProductID}|${item.CombinationID}` === `${this.itemData.ID}|${combinationID}`);
    },
    onAddToBag(itemData) {
      console.log('ADD_TO_BAG', JSON.stringify(itemData));
      if (
        itemData &&
        itemData.ID &&
        this.isAvailable &&
        this.quantity
      ) {
        const itemInCart = this.getCurrentItemInCart();
        if (itemInCart) {
          const maxStock = this.stock - 0;
          const addStock = (itemInCart.Quantity - 0) + (this.quantity - 0);
          if (addStock > maxStock) {
            this.$showAlert('You have added the maximum stock available for this product.');
            return;
          }
        }
        this.addToCart({
          ...itemData,
          ProductID: itemData.ID,
          AttributeSelected: this.itemSelected,
          CombinationID: this.attributeDetail.ID || 0,
          Stock: this.stock,
          Quantity: this.quantity
        });
        this.$showAlert(`"${itemData.Name}" is added to your bag!`);
      }
    },
    shareSocial() {
      let imageShareUrl = null;
      const nameShare = this.product.Name;
      const description =
        "Hi! I found this product on BlinQ Fashion that you might find interesting :)";
      const link = `${
        this.appConfig.SITE_URL
      }/${this.selectedCountry.toLowerCase()}/main/product/${
        this.product.FriendlyURLFull
      }`;
      if (this.product.Attribute !== 0) {
        imageShareUrl =
          this.product.DefaultAttributeValue.ProductImage.ImageURLCover;
      } else {
        imageShareUrl = this.product.ProductImage[0].ImageURLCover;
      }
      const shareDataString = `${nameShare}\n${description}\n${link}`;
      this.$socialShareURL(
        this.product.DefaultAttributeValue.ProductImage.ImageURLCover,
        shareDataString
      );
    },
    onMovePrevious() {
      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      }
    },
    onMoveNext() {
      if (this.currentIndex < this.imageCollection.length - 1) {
        this.currentIndex += 1;
      }
    }
  },
  mounted() {
    console.log("ITEM DETAIL: ", this.itemDetail.ID);
    this.loadProductDetail(this.itemDetail.ID);
    this.itemSelected = this.getAttributeDataSelected();
  },
  beforeDestroy() {
    this.clearProductDetail();
  },
};
</script>

<style scoped>
.top-header-container {
  background-color: #ffffff;
}
.header-image {
  background-color: #f8f8f8;
}
.discount {
  width: 40;
  height: 40;
  border-radius: 20;
  text-align: center;
  background-color: black;
  color: white;
  padding: 10 0;
  font-size: 15;
  font-family: "Roboto", "Roboto-Regular";
  font-weight: 400;
}

.button-label {
  text-align: center;
}
.action-tryMeOut {
  background-color: black;
  margin-right: -15;
}
.content-description {
  border-top-left-radius: 18;
  border-top-right-radius: 18;
  padding: 20 10;
}
.product-name-container {
  border-bottom-width: 0.5;
  border-bottom-color: black;
  padding-bottom: 25;
}
.product-name {
  font-size: 22;
  color: #000;
}
.price-label-rrp {
  font-size: 12;
}
.price-label {
  font-size: 20;
  color: #000;
}
.filter-title {
  margin-bottom: 0;
}
.description-content {
  margin-top: 10;
  margin-bottom: 10;
}
.description-label {
  color: #000;
}
</style>
