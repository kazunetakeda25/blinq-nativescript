<template>
  <FlexboxLayout flexDirection="column" paddingBottom="40">
    <PageTitle title="MY CART" />

    <FlexboxLayout v-if="itemCount === 0" marginBottom="20" marginTop="20" height="auto" width="100%" flexDirection="column" alignItems="center">
      <Label text="No items" fontSize="12" />
    </FlexboxLayout>

    <FlexboxLayout v-if="itemCount > 0" marginBottom="10" height="auto" width="100%" flexDirection="column" alignItems="center">
      <Label text="Step 1 of 5" fontSize="12" />
      <Label :text="`(You have a total of ${itemCount} items in your shopping cart)`" fontSize="11" />
    </FlexboxLayout>

    <StackLayout v-if="haveItems" width="100%" padding="0,10,0,10">
      <StackLayout width="100%" padding="10,0,0,0"
        v-for="(item, index) in items" :key="index">
        <CartItem :item="item" :editable="true" />
      </StackLayout>
    </StackLayout>

    <PromoCodeSection v-if="haveItems" v-model="promoCode" @onApply="applyPromoCode" :codeValid="validPromoCode" />

    <OrderSummary v-if="haveItems" :subTotal="subTotal" :total="total" :discounts="discount" />

    <GridLayout v-if="haveItems" padding="0,10,0,10" width="100%" columns="*,*" rows="*" marginTop="30">
      <StackLayout row="0" col="0" horizontalAlignment="left">
        <RoundButton :width="120" text="CLEAR" @onTap="onClearCart" />
      </StackLayout>
      <StackLayout row="0" col="1" horizontalAlignment="right">
        <RoundButton :pink="true" :width="120" text="NEXT" @onTap="onNext" />
      </StackLayout>
    </GridLayout>

  </FlexboxLayout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { GETTERS, MUTATORS } from '~/store/cart';
import { GETTERS as MEMBER_GETTERS } from '~/store/member';
import { GETTERS as MENU_GETTERS } from '~/store/menu';
import { loadOrderCheckoutData } from '~/services';
import PageTitle from '~/components/PageTitle';
import RoundButton from '~/components/Button/RoundButton';
import CartItem from '../CartItem';
import OrderSummary from '../OrderSummary';
import PromoCodeSection from './PromoCode';
export default {
  props: {
  },
  components: {
    PageTitle,
    RoundButton,
    CartItem,
    PromoCodeSection,
    OrderSummary,
  },
  data() {
    return {
      stage: 'summary',
      useLocalData: false,
      items: [],
      promoCode: '',
      validPromoCode: true,
      discount: null,
      subTotal: '',
      total: '',
    };
  },
  computed: {
    ...mapGetters({
      currentStage: GETTERS.CHECKOUT_STAGE,
      cartItems: GETTERS.CART_ITEMS,
      cartData: GETTERS.CART_DATA,
      memberId: MEMBER_GETTERS.MEMBER_ID,
      selectedCurrency: MENU_GETTERS.SELECTED_CURRENCY,
      currencies: MENU_GETTERS.DROPDOWN_CURRENCIES,
    }),
    itemCount() {
      return this.cartItems.reduce((total, cur) => (total + (cur.Quantity - 0)), 0) || 0;
    },
    haveItems() {
      return (this.cartItems && this.cartItems.length > 0);
    },
    chosenCurrency() {
      return this.currencies.find(({Code}) => Code === this.selectedCurrency);
    },
  },
  watch: {
    cartItems(items) {
      console.log('CART_ITEM_CHANGED', JSON.stringify(items));
      if (items && items.length) {
        this.loadCheckoutData();
      } else {
        this.onClearCart();
      }
    },
    currentStage() {
      if (this.currentStage === this.stage) {
        this.loadCheckoutData();
      }
    },
  },
  methods: {
    ...mapMutations({
      setupCart: MUTATORS.SETUP_CART,
      updateCartData: MUTATORS.UPDATE_CART_DATA,
      clearShoppingCart: MUTATORS.CLEAR_SHOPPING_CART,
      updateItemStock: MUTATORS.UPDATE_ITEM_STOCK,
    }),
    updateCartItems(items = []) {
      if (!items || !items.length) {
        this.items = [];
      } else {
        this.items = items.map((item) => {
            // const dataItem = this.cartItems.find(({ ProductID, CombinationID}) => `${item.ProductID}|${item.CombinationID}` === `${ProductID}|${CombinationID}`);
            return {
              ...item,
              ProductImage: item.ImageURLThumb || '',
            };
          });
      }
    },
    async loadCheckoutData(promoCode = '') {
      try {
        if (!this.haveItems) {
          return;
        }
        const reqData = {
          ...this.cartData,
        };
        if (promoCode) {
          this.validPromoCode = true;
          reqData.PromoCode = promoCode;
        }
        // this.updateCartItems([]);
        console.log('reqData', JSON.stringify(reqData));
        const response = await loadOrderCheckoutData(reqData);
        const { Item, ItemCount, SubTotal, Discount, Total } = response;
        if (response.Error) {
          this.$emit('onError', response.Error);
        }
        console.log('response', JSON.stringify(response));
        if (this.itemCount !== (ItemCount - 0) || this.cartItems.length !== Item.length) {
          this.updateItemStock(Item);
        } else {
          this.updateCartItems(Item);
        }
        this.discount = Discount;
        this.subTotal = SubTotal;
        this.total = Total;
        if (promoCode) {
          if (this.discount) {
            this.validPromoCode = true;
            this.updateCartData({ PromoCode: promoCode });
          } else {
            this.validPromoCode = false;
            this.updateCartData({ PromoCode: '' });
          }
        }
      } catch (error) {
        console.log(error);
        this.$emit('onError', { Code: 'APP_EXCEPTION' });
      }
    },
    applyPromoCode() {
      console.log('APPLY_PROMO_CODE', this.promoCode);
      if (this.promoCode === 'FAIL') {
        this.validPromoCode = false;
      } else {
        this.validPromoCode = true;
        this.loadCheckoutData(this.promoCode);
      }
    },
    onClearCart() {
      this.items = [];
      this.promoCode = '';
      this.validPromoCode = true;
      this.discount = null;
      this.subTotal = '';
      this.total = '';
      this.clearShoppingCart();
    },
    onNext() {
      this.$emit('goNext');
    },
  },
  mounted() {
    console.log('CART_SCREEN_MOUNTED');
    if (this.cartData.PromoCode) {
      this.promoCode = this.cartData.PromoCode;
    }
    console.log('chosenCurrency', JSON.stringify(this.chosenCurrency));
    this.setupCart({
      MemberID: this.memberId || '',
      CurrencyCode: this.chosenCurrency.Code,
      CurrencyExchangeRate: this.chosenCurrency.ExchangeRate,
      Stage: this.stage,
    });
    this.loadCheckoutData(this.promoCode);
  },
};
</script>

<style lang="scss" scoped></style>
