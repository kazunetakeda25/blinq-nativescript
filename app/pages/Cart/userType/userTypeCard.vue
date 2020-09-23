<template>
  <Shadow>
    <StackLayout padding="10" backgroundColor="white" width="100%" height="auto">
      <FlexBoxLayout
        alignItems="center"
        justifyContent="center"
        height="50"
        width="100%"
      >
        <Label :text="text" :color="$colors.FONT_BTN_GREY" fontSize="18" />
      </FlexBoxLayout>

      <FlexBoxLayout
        alignItems="center"
        justifyContent="center"
        height="50"
        width="100%"
        @tap="onSelect"
      >
        <RoundButton :pink="true" text="CHOOSE" />
      </FlexBoxLayout>
    </StackLayout>
  </Shadow>
</template>

<script>
import RoundButton from '~/components/Button/RoundButton';
import Shadow from '~/components/Shadow/Regular';
export default {
  props: {
    text: String,
  },
  components: {
    RoundButton,
    Shadow,
  },
  methods: {
    onSelect() {
      this.$emit('onSelect');
    },
  },
}
</script>

<style scoped></style>
