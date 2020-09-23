<template>
  <AbsoluteLayout>
    <FlexboxLayout
      left="0"
      top="0"
      :width="$responsiveUI.scale(375)"
      :height="$responsiveUI.verticalScale(667)"
      alignItems="stretch"
      flexDirection="column"
      @tap="nothing"
    >
      <Image
        src="~/assets/images/bg_transparent.png"
        width="100%"
        height="100%"
        stretch="aspectFill"
      />
    </FlexboxLayout>
    <FlexboxLayout
      left="0"
      top="0"
      :width="$responsiveUI.scale(375)"
      :height="$responsiveUI.verticalScale(667)"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <FlexboxLayout
        :width="$responsiveUI.scale(100)"
        :height="$responsiveUI.scale(100)"
        backgroundColor="#f8f8f8"
        justifyContent="center"
        alignItems="center"
        borderRadius="15"
        marginBottom="100"
      >
        <Image
          class="loading"
          src="~/assets/images/icons/icon_loading.png"
          width="80%"
          height="80%"
          stretch="aspectFit"
        />
      </FlexboxLayout>
    </FlexboxLayout>
  </AbsoluteLayout>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    nothing(){}
  }
};
</script>

<style scoped>
.modal-page {
  background-color: transparent;
}
.loading {
    animation-name: rotate;
    animation-duration: 1;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}
@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
</style>