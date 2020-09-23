<template>
  <Shadow>
    <StackLayout width="100%" padding="10" backgroundColor="white" height="auto"
      @tap="$emit('onTap')" @longPress="$emit('onLongPress')">
      <FlexboxLayout width="100%" height="30"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between">
        <Label fontSize="18" width="85%" :text="$responsiveUI.toUpperCase(address.Title)" textWrap="true" />
        <Image src="~/assets/images/icons/icon_arrow_right_pink.png" width="10%" stretch="aspectFit" />
      </FlexBoxLayout>
      <Label fontSize="12" :text="address.Street" textWrap="true" />
      <Label fontSize="12" :text="address.City" textWrap="true" />
      <Label fontSize="12" :text="address.State.Name" textWrap="true" />
      <Label fontSize="12" :text="address.Postcode" textWrap="true" />
      <Label fontSize="12" :text="address.Country.Name" textWrap="true" />
    </StackLayout>
  </Shadow>
</template>

<script>
import Shadow from '~/components/Shadow/Regular';
export default {
  props: {
    address: Object,
  },
  components: {
    Shadow,
  },
}
</script>

<style scoped></style>
