<template>
  <FlexBoxLayout width="100%" padding="50,10,0,10" height="auto" flexDirection="column" alignItems="top" justifyContent="center" class="bg-default">
    <FlexboxLayout marginBottom="20" width="100%" flexDirection="row" alignItems="top">
      <Label flexGrow="1" text="ORDER SUMMARY" class="page-section-title"/>
    </FlexboxLayout>

    <Shadow>
      <FlexboxLayout width="100%" backgroundColor="white" padding="10" flexDirection="column" alignItems="top">
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
              <Label textAlignment="left" fontSize="12" :text="`Shipping Costs (${shipping.CarrierName})`" textWrap="true" />
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
import RoundButton from '~/components/Button/RoundButton';
import Shadow from '~/components/Shadow/Regular';
export default {
  props: {
    subTotal: String,
    total: String,
    discounts: Array,
    shipping: Object,
  },
  components: {
    RoundButton,
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
