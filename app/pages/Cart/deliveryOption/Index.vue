<template>
  <FlexboxLayout flexDirection="column" paddingBottom="40">
    <PageTitle title="DELIVERY OPTION" />

    <FlexboxLayout marginBottom="10" height="auto" width="100%" flexDirection="column" alignItems="center">
      <Label text="Step 3 of 5" fontSize="12" />
    </FlexboxLayout>

    <StackLayout v-for="(delivery, index) in deliveryOptions" :key="index"
      width="100%" padding="10 10 10 10">
      <DeliveryTypeCard
        :text="delivery.Name"
        :pricing="delivery.Cost"
        @onSelect="selectDelivery(delivery.CarrierID)" />
    </StackLayout>

  </FlexboxLayout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { GETTERS, MUTATORS } from '~/store/cart';
import { loadOrderCheckoutData } from '~/services';
import PageTitle from '~/components/PageTitle';
import DeliveryTypeCard from './deliveryTypeCard';
export default {
  props: {
  },
  components: {
    PageTitle,
    DeliveryTypeCard,
  },
  data() {
    return {
      stage: 'delivery-option',
      deliveryOptions: [],
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
    selectDelivery(deliveryType) {
      console.log('deliveryType', deliveryType);
      this.updateCartData({ DeliveryMethodID: deliveryType });
      this.goToPaymentOption();
    },
    goToPaymentOption() {
      this.$emit('goNext');
    },
    async loadCheckoutData() {
      try {
        const response = await loadOrderCheckoutData(this.cartData);
        if (response.Error) {
          this.$emit('onError', response.Error);
        }
        if (response.DeliveryOptions && response.DeliveryOptions.length) {
          this.deliveryOptions = [ ...response.DeliveryOptions ];
        }
      } catch (error) {
        console.log(error);
        this.$emit('onError', { Code: 'APP_EXCEPTION' });
      }
    },
  },
  mounted() {
    this.deliveryOptions = [];
    this.setStage(this.stage);
    this.loadCheckoutData();
    console.log(JSON.stringify(this.cartData));
  },
};
</script>

<style lang="scss" scoped></style>
