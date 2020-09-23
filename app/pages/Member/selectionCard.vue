<template>
  <StackLayout padding="1,2,2,1" :backgroundColor="$colors.SHADOW_COLOR"
    width="100%" height="auto">
    <StackLayout padding="10" backgroundColor="white"
      width="100%" height="auto">
      <FlexBoxLayout
        alignItems="center"
        justifyContent="left"
        height="30"
        width="100%"
        @tap="onSelect"
      >
        <Label :text="text" :color="$colors.FONT_BTN_GREY" fontSize="18" />
      </FlexBoxLayout>
    </StackLayout>
  </StackLayout>
</template>

<script>
export default {
  props: {
    text: String,
  },
  components: {
  },
  methods: {
    onSelect() {
      this.$emit('onSelect');
    },
  },
}
</script>

<style scoped></style>
