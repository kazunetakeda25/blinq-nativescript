<template>
  <Shadow>
    <StackLayout width="100%" padding="10" backgroundColor="white" height="auto"
      @tap="$emit('onTap')" @longPress="$emit('onLongPress')">
      <FlexboxLayout width="100%" height="30"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between">
        <Label fontSize="18" width="85%"
          :text="`#${$responsiveUI.toUpperCase(order.OrderNo)}`"
          textWrap="true" />
        <Image src="~/assets/images/icons/icon_arrow_right_pink.png" width="10%" stretch="aspectFit" />
      </FlexBoxLayout>
      <Label fontSize="12" :text="`Tracking Number: ${order.TrackingNo || 'N/A'}`" textWrap="true" />
      <Label fontSize="12" :text="order.OrderDate" textWrap="true" />
      <Label fontSize="12" :text="order.PaymentMethod" textWrap="true" />
      <Label fontSize="12" :text="`${order.Total}`" textWrap="true" />
      <FlexboxLayout width="100%" marginTop="5"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between">
        <Label fontSize="12"
          padding="2,5"
          :text="order.Status.Label"
          :color="order.Status.Color"
          :backgroundColor="order.Status.BGColor"
          textWrap="true" />
      </FlexBoxLayout>
    </StackLayout>
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
}
</script>

<style scoped></style>
