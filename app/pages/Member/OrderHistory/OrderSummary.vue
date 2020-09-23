<template>
  <FlexBoxLayout width="100%" marginTop="50" height="auto" flexDirection="column" alignItems="top" justifyContent="center" class="bg-default">
    <FlexboxLayout marginBottom="20" width="100%" flexDirection="row" alignItems="top">
      <Label flexGrow="1" text="ORDER SUMMARY" class="page-section-title"/>
    </FlexboxLayout>

    <Shadow>
      <FlexboxLayout width="100%" backgroundColor="white" padding="10" flexDirection="column" alignItems="top">
        <!-- payment method -->
        <StackLayout>
          <Label flexGrow="1" class="font-roboto-black" fontSize="12" text="payment method" />
          <Label fontSize="14" :text="order.PaymentMethod || ''" textWrap="true" />
        </StackLayout>
        <StackLayout width="100%" height="1" class="bg-grey" margin="10,0"></StackLayout>
        <!-- delivery method -->
        <StackLayout>
          <Label flexGrow="1" class="font-roboto-black" fontSize="12" text="delivery method" />
          <Label fontSize="14" :text="order.DeliveryMethod && order.DeliveryMethod.Name || ''" textWrap="true" />
        </StackLayout>
        <StackLayout width="100%" height="1" class="bg-grey" margin="10,0"></StackLayout>
        <!-- tracking url -->
        <StackLayout>
          <Label flexGrow="1" class="font-roboto-black" fontSize="12" text="tracking url" />
          <Label fontSize="14" :text="order.DeliveryMethod && order.DeliveryMethod.TrackingURL || ''" textWrap="true" />
        </StackLayout>
        <StackLayout width="100%" height="1" class="bg-grey" margin="10,0"></StackLayout>
        <!-- tracking no -->
        <StackLayout>
          <Label flexGrow="1" class="font-roboto-black" fontSize="12" text="tracking no" />
          <Label fontSize="14" :text="order.TrackingNo || ''" textWrap="true" />
        </StackLayout>
        <StackLayout width="100%" height="1" class="bg-grey" margin="10,0"></StackLayout>
        <!-- Sub Total -->
        <FlexboxLayout flexDirection="row" alignItems="top">
          <Label flexGrow="1" fontSize="12" horizontalAlignment="left" text="Sub-Total" />
          <Label horizontalAlignment="right" fontSize="16" :text="subTotal" />
        </FlexboxLayout>
        <!-- PromoCode / Discount -->
        <StackLayout v-if="discounts && discounts.length" width="100%">
          <FlexboxLayout flexDirection="row" alignItems="top" paddingTop="5"
            v-for="(discount, index) in discounts" :key="index" justifyContent="space-between">
            <StackLayout width="64%">
              <Label textAlignment="left" fontSize="12" :text="`Promo Code (${discount.PromoCodeName})`" textWrap="true" />
            </StackLayout>
            <StackLayout width="34%">
              <Label textAlignment="right" fontSize="16" :text="discount.Value" />
            </StackLayout>
          </FlexboxLayout>
        </StackLayout>
        <!-- Shipping -->
        <StackLayout v-if="shipping" width="100%">
          <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="top" paddingTop="5">
            <StackLayout width="69%">
              <Label textAlignment="left" fontSize="12" text="Shipping Costs" textWrap="true" />
            </StackLayout>
            <StackLayout width="29%">
              <Label textAlignment="right" fontSize="16" :text="shipping.Value" />
            </StackLayout>
          </FlexboxLayout>
        </StackLayout>
        <StackLayout marginTop="10" marginBottom="10" width="100%" height="1" :backgroundColor="$colors.BTN_SHADOW_COLOR"></StackLayout>
        <FlexboxLayout flexDirection="row" alignItems="top" height="25">
          <Label height="25" flexGrow="1" horizontalAlignment="left" text="TOTAL" fontSize="18" class="font-roboto-black font-color-default" />
          <Label height="25" horizontalAlignment="right" :text="total" fontSize="18" class="font-roboto-black font-color-default" />
        </FlexboxLayout>
      </FlexboxLayout>
    </Shadow>
  </FlexBoxLayout>
</template>

<script>
import Shadow from '~/components/Shadow/Regular';
export default {
  props: {
    order: Object,
    subTotal: String,
    total: String,
    discounts: Array,
    shipping: Object,
  },
  components: {
    Shadow,
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  },
}
</script>

<style scoped></style>
