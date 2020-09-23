<template>
  <Shadow>
    <StackLayout width="100%" padding="10" backgroundColor="white" height="auto">
      <Label fontSize="12" :text="address.Street" textWrap="true" />
      <Label fontSize="12" :text="address.City" textWrap="true" />
      <Label fontSize="12" :text="address.State" textWrap="true" />
      <Label fontSize="12" :text="address.Postcode" textWrap="true" />
      <Label fontSize="12" :text="address.Country" textWrap="true" />
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
