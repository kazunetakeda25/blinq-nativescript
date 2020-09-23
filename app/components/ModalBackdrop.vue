<template>
  <Page class="modal-page">
    <AbsoluteLayout>
      <FlexboxLayout @tap="$modal.close()" left="0" top="0" width="100%" height="100%" alignItems="stretch" flexDirection="column">
        <Image src="~/assets/images/bg_transparent.png" width="100%" height="100%" stretch="aspectFill" />
      </FlexboxLayout>
      <slot></slot>
    </AbsoluteLayout>
  </Page>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    onTap() {
      this.$emit('onTap');
    }
  },
}
</script>

<style scoped>
  .modal-page {
    background-color: transparent;
  }
</style>

