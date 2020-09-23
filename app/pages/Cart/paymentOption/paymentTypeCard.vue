<template>
  <Shadow>
    <StackLayout padding="10" backgroundColor="white" width="100%" height="auto">
      <FlexBoxLayout
        alignItems="center"
        justifyContent="center"
        height="20"
        width="100%"
      >
        <Label :text="$responsiveUI.toUpperCase(text)" :color="$colors.FONT_BTN_GREY" fontSize="16" />
      </FlexBoxLayout>
      <FlexBoxLayout
        alignItems="center"
        justifyContent="center"
        height="20"
        width="100%"
      >
        <Label :text="description" :color="$colors.FONT_BTN_GREY" fontSize="12" />
      </FlexBoxLayout>

      <FlexBoxLayout
        marginTop="10"
        alignItems="center"
        justifyContent="center"
        height="40"
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
    description: String,
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
