<template>
  <StackLayout width="auto" height="31" borderRadius="15" padding="0,1,1,0"
    :backgroundColor="disable && $colors.BG_DEFAULT || $colors.BTN_SHADOW_COLOR"
  >
    <FlexBoxLayout
      padding="5,15"
      alignItems="center"
      justifyContent="center"
      height="30"
      :width="buttonWidth"
      borderRadius="15"
      :backgroundColor="pink && $colors.PINK || $colors.GREY"
      @tap="onTap"
    >
      <Label class="font-roboto-light" size="14" :text="buttonText"
        :color="pink && $colors.FONT_BTN_WHITE || $colors.FONT_BTN_GREY"
      />
    </FlexBoxLayout>
  </StackLayout>
</template>

<script>
export default {
  props: {
    text: String,
    width: Number,
    upper: Boolean,
    pink: Boolean,
    disable: Boolean,
  },
  data() {
    return {
    };
  },
  computed: {
    buttonText() {
      return !this.upper && (this.text || '') || this.$responsiveUI.toUpperCase(this.text);
    },
    buttonWidth() {
      return (this.width && this.width > 30) ? this.width : 'auto';
    },
  },
  watch: {},
  beforeMount() {},
  mounted() {
  },
  methods: {
    onTap() {
      this.$emit('onTap');
    },
  }
};
</script>

<style scoped>
</style>
