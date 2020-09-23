<template>
  <Shadow>
    <StackLayout padding="10" backgroundColor="white" width="100%" height="auto">
      <FlexBoxLayout
        alignItems="center"
        justifyContent="center"
        height="25"
        width="100%"
      >
        <Label :text="text" :color="$colors.FONT_BTN_GREY" fontSize="16" />
      </FlexBoxLayout>
      <FlexBoxLayout
        alignItems="center"
        justifyContent="center"
        height="35"
        width="100%"
      >
        <Label :text="pricing" class="font-roboto-black" :color="$colors.FONT_BTN_GREY" fontSize="12" />
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
    pricing: String,
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
