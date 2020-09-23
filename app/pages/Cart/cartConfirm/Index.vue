<template>
  <FlexboxLayout flexDirection="column" paddingBottom="10">
    <PageTitle title="CONFIRM ORDER" />

    <FlexboxLayout marginBottom="20" height="auto" width="100%" flexDirection="column" alignItems="center">
      <Label text="Step 5 of 5" fontSize="12" />
      <Label :text="`(You have a total of ${itemCount} items in your shopping cart)`" fontSize="11" />
    </FlexboxLayout>

    <StackLayout width="100%" padding="10,10,0,10"
      v-for="(item, index) in items" :key="index">
      <CartItem :item="item" />
    </StackLayout>

    <OrderSummary v-if="haveItems" :subTotal="subTotal" :total="total" :discounts="discount" :shipping="shipping" />

    <FlexboxLayout v-if="haveItems" marginTop="40" marginBottom="20" height="auto" width="100%" flexDirection="column" alignItems="center">
      <StackLayout height="auto" width="auto" horizontalAlignment="center">
        <RoundButton :width="120" :pink="true" text="PAY NOW" @onTap="onPay" />
      </StackLayout>
    </FlexboxLayout>

  </FlexboxLayout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { GETTERS, MUTATORS } from '~/store/cart';
import { loadOrderCheckoutData } from '~/services';
import PageTitle from '~/components/PageTitle';
import RoundButton from '~/components/Button/RoundButton';
import YesNoConfirmModal from '~/components/YesNoModal';
import CartItem from '../CartItem';
import OrderSummary from '../OrderSummary';
export default {
  props: {
  },
  components: {
    PageTitle,
    RoundButton,
    CartItem,
    OrderSummary,
  },
  data() {
    return {
      stage: 'confirm',
      useLocalData: false,
      items: [],
      discount: null,
      shipping: null,
      subTotal: '',
      total: '',
    };
  },
  computed: {
    ...mapGetters({
      currentStage: GETTERS.CHECKOUT_STAGE,
      cartItems: GETTERS.CART_ITEMS,
      cartData: GETTERS.CART_DATA,
    }),
    itemCount() {
      return this.cartItems.reduce((total, cur) => (total + (cur.Quantity - 0)), 0) || 0;
    },
    haveItems() {
      return (this.cartItems && this.cartItems.length > 0);
    },
  },
  watch: {
  },
  methods: {
    ...mapMutations({
      setStage: MUTATORS.UPDATE_CART_STAGE,
      updateItemStock: MUTATORS.UPDATE_ITEM_STOCK,
    }),
    updateCartItems(items = []) {
      if (!items || !items.length) {
        this.items = [];
      } else {
        if (this.useLocalData) {
          this.items = this.cartItems.map((item) => {
            const unitPrice = item.RRP || item.Price;
            const price = (unitPrice.split(' ')[1] - 0) * (item.Quantity - 0);
            const priceString = `${unitPrice.split(' ')[0]} ${price.toFixed(2)}`;
            return {
              ...item,
              ProductID: item.ID,
              CombinationID: item.CombinationID,
              Name: item.Name,
              Brand: item.Brand.Name,
              Description: "Size: L, Color: Navy",
              UnitPrice: unitPrice,
              Quantity: item.Quantity,
              Price: priceString,
              Stock: item.Stock || item.Quantity,
              ProductImage: item.ProductImage[0].ImageURLThumb,
            };
          });
        } else {
          this.items = items.map((item) => {
            const dataItem = this.cartItems.find(({ ProductID, CombinationID}) => `${item.ProductID}|${item.CombinationID}` === `${ProductID}|${CombinationID}`);
            return {
              ...item,
              ProductImage: item.ImageURLThumb || (dataItem && dataItem.ProductImage[0].ImageURLThumb) || '',
            };
          });
        }
      }
    },
    async loadCheckoutData() {
      try {
        // this.updateCartItems([]);
        const response = await loadOrderCheckoutData(this.cartData);
        const { ItemCount, Item, SubTotal, Total, Discount, Shipping } = response;
        if (response.Error && response.Error.Code === 'NOSTOCK') {
          this.confirmYesNo(response.Error.Message);
        } else if (response.Error) {
          this.$emit('onError', response.Error);
        } else if (this.itemCount !== (ItemCount - 0)) {
          this.confirmYesNo('Some product\'s quantity in your bag has been updated due to stock changes. Do you wish to proceed with the changes?');
        }
        if (this.itemCount !== (ItemCount - 0) || this.cartItems.length !== Item.length) {
          this.updateItemStock(Item);
        } else {
          this.updateCartItems(Item);
        }
        this.discount = Discount || null;
        this.shipping = Shipping || null;
        this.subTotal = SubTotal;
        this.total = Total;
        console.log('Total', Total);
      } catch (error) {
        console.log(error);
        this.$emit('onError', { Code: 'APP_EXCEPTION' });
      }
    },
    confirmYesNo(message) {
      this.$showModal(YesNoConfirmModal, {
        props: {
          message,
          yesBtnText: 'Proceed',
          noBtnText: 'No, let\'s check',
        },
      }).then((res) => {
        if (res === 'NO') {
          this.$emit('goCheckCart');
        }
      });
    },
    onPay() {
      this.$showConfirm({
        message: "By submitting this order, I agree that the order information is correct, and I accept the terms and conditions of the app.",
        confirmBtnText: "I AGREE",
        clickOutSide: true,
      }).then(result => {
        if (result) {
          this.$emit('goNext');
        }
      });
    },
  },
  mounted() {
    this.setStage(this.stage);
    this.loadCheckoutData();
  },
};
</script>

<style lang="scss" scoped></style>
