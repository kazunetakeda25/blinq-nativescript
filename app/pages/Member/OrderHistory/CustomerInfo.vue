<template>
  <Shadow>
    <FlexboxLayout width="100%" backgroundColor="white" padding="10" flexDirection="column" alignItems="flex-start">
      <!-- Order No -->
      <StackLayout>
        <Label flexGrow="1" class="font-roboto-black" fontSize="12" text="order no" />
        <Label fontSize="14" :text="`#${order.OrderNo || ''}`" />
      </StackLayout>
      <StackLayout width="100%" height="1" class="bg-grey" margin="10,0"></StackLayout>
      <!-- customer detail -->
      <StackLayout>
        <Label flexGrow="1" class="font-roboto-black" fontSize="12" horizontalAlignment="left" text="customer detail" />
        <FlexBoxLayout flexDirection="row" justifyContent="flex-start">
          <StackLayout>
            <Label fontSize="14" text="Name" />
            <Label fontSize="14" text="Contact No" />
            <Label fontSize="14" text="Email" />
          </StackLayout>
          <StackLayout marginRight="10">
            <Label fontSize="14" text=":" />
            <Label fontSize="14" text=":" />
            <Label fontSize="14" text=":" />
          </StackLayout>
          <StackLayout>
            <Label fontSize="14" :text="order.MemberName || ''" />
            <Label fontSize="14" :text="order.MemberContact || ''" />
            <Label fontSize="14" :text="order.MemberEmail || ''" />
          </StackLayout>
        </FlexBoxLayout>
      </StackLayout>
      <StackLayout width="100%" height="1" class="bg-grey" margin="10,0"></StackLayout>
      <!-- delivery address -->
      <StackLayout>
        <Label flexGrow="1" class="font-roboto-black" fontSize="12" text="delivery address" />
        <Label fontSize="14" :text="order.ShippingStreet || ''" textWrap="true" />
        <Label fontSize="14" :text="order.ShippingCity || ''" />
        <Label fontSize="14" :text="order.ShippingState || ''" />
        <Label fontSize="14" :text="order.ShippingPostcode || ''" />
        <Label fontSize="14" :text="order.ShippingCountry || ''" />
      </StackLayout>
      <StackLayout width="100%" height="1" class="bg-grey" margin="10,0"></StackLayout>
      <!-- billing address -->
      <StackLayout>
        <Label flexGrow="1" class="font-roboto-black" fontSize="12" text="billing address" />
        <Label fontSize="14" :text="order.BillingStreet || ''" textWrap="true" />
        <Label fontSize="14" :text="order.BillingCity || ''" />
        <Label fontSize="14" :text="order.BillingState || ''" />
        <Label fontSize="14" :text="order.BillingPostcode || ''" />
        <Label fontSize="14" :text="order.BillingCountry || ''" />
      </StackLayout>
    </FlexboxLayout>
  </Shadow>
</template>

<script>
import Shadow from '~/components/Shadow/Regular';
export default {
  props: {
    order: Object,
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
