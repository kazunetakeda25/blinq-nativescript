<template>
  <FlexboxLayout flexDirection="column" paddingBottom="40">
    <PageTitle title="PAYMENT OPTION" />

    <FlexboxLayout marginBottom="10" height="auto" width="100%" flexDirection="column" alignItems="center">
      <Label text="Step 4 of 5" fontSize="12" />
    </FlexboxLayout>

    <StackLayout v-for="(paymentMethod, index) in paymentOptions" :key="index"
      width="100%" padding="10 10 0 10">
      <PaymentTypeCard
        :text="paymentMethod.Name"
        :description="paymentMethod.Description"
        @onSelect="payWith(paymentMethod.Code)" />
    </StackLayout>

  </FlexboxLayout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { GETTERS, MUTATORS } from '~/store/cart';
import { loadOrderCheckoutData } from '~/services';
import PageTitle from '~/components/PageTitle';
import PaymentTypeCard from './paymentTypeCard';
export default {
  props: {
  },
  components: {
    PageTitle,
    PaymentTypeCard,
  },
  data() {
    return {
      stage: 'payment-option',
      paymentOptions: [],
    };
  },
  computed: {
    ...mapGetters({
      currentStage: GETTERS.CHECKOUT_STAGE,
      cartData: GETTERS.CART_DATA,
    }),
  },
  watch: {
  },
  methods: {
    ...mapMutations({
      setStage: MUTATORS.UPDATE_CART_STAGE,
      updateCartData: MUTATORS.UPDATE_CART_DATA,
    }),
    async loadCheckoutData() {
      try {
        const response = await loadOrderCheckoutData(this.cartData);
        if (response.Error) {
          this.$emit('onError', response.Error);
        }
        this.paymentOptions = [ ...response.PaymentOptions ];
      } catch (error) {
        console.log(error);
        this.$emit('onError', { Code: 'APP_EXCEPTION' });
      }
    },
    payWith(paymentType) {
      console.log('paymentType', paymentType);
      this.updateCartData({ PaymentMethodCode: paymentType });
      this.$emit('goNext');
    },
  },
  mounted() {
    this.paymentOptions = [];
    this.setStage(this.stage);
    this.loadCheckoutData();
  },
};
</script>

<style lang="scss" scoped></style>
