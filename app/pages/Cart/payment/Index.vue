<template>
  <StackLayout width="100%">
    <StackLayout v-if="!status" width="100%" marginTop="50">
      <Label text="processing..." horizontalAlignment="center" />
    </StackLayout>
    <ThankYou v-if="status === 'THANKYOU'" />
    <Sorry @onGoToPay="$emit('goToPay')" v-if="status === 'SORRY'" />
  </StackLayout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { GETTERS, MUTATORS } from '~/store/cart';
import { loadOrderCheckoutData } from '~/services';
const utils = require('utils/utils');
import ThankYou from './ThankYou';
import Sorry from './Sorry';
export default {
  props: {
  },
  components: {
    ThankYou,
    Sorry,
  },
  data() {
    return {
      status: '',
      orderId: '',
      stage: 'create-order',
      paymentUrl: 'https://www.blinq.fashion/mobileapp/order/paypalrequest?OrderID=999',
    };
  },
  computed: {
    ...mapGetters({
      currentStage: GETTERS.CHECKOUT_STAGE,
      cartData: GETTERS.CART_DATA,
      paymentData: GETTERS.PAYMENT_STATUS,
    }),
  },
  watch: {
    paymentData() {
      const { status, orderId } = this.paymentData;
      // if (this.orderId && status && this.orderId === orderId) {
      if (status) {
        this.status = status === 'SUCCESS' ? 'THANKYOU' : 'SORRY';
      }
    },
  },
  methods: {
    ...mapMutations({
      setStage: MUTATORS.UPDATE_CART_STAGE,
    }),
    async loadCheckoutData() {
      try {
        const response = await loadOrderCheckoutData(this.cartData);
        const { OrderID, PaymentWebLink } = response;
        if (response.Error) {
          this.$emit('onError', response.Error);
        }
        this.orderId = OrderID;
        this.paymentUrl = PaymentWebLink;
        this.processCheckout();
      } catch (error) {
        console.log(error);
        this.$emit('onError', { Code: 'APP_EXCEPTION' });
      }
    },
    processCheckout() {
      if (this.paymentUrl) {
        utils.openUrl(this.paymentUrl);
      } else {
        this.$emit('onError', { Code: 'APP_EXCEPTION' });
      }
    },
  },
  mounted() {
    // this.paymentUrl = '';
    this.setStage(this.stage);
    this.loadCheckoutData();
  },
};
</script>

<style lang="scss" scoped></style>
