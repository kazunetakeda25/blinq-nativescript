<template>
  <ModalBackdrop @onTap="$modal.close()">
    <StackLayout
      :left="$responsiveUI.scale(375 * 0.1)"
      :top="$responsiveUI.verticalScale(166.75)"
      :width="$responsiveUI.scale(375 * 0.8)"
      class="modal-content" height="auto">
      <Label :text="message" :color="$colors.FONT_DEFAULT" fontSize="14" textWrap="true" horizontalAlignment="center" textAlignment="center" />
    </StackLayout>
  </ModalBackdrop>
</template>

<script>
const { setTimeout } = require('tns-core-modules/timer');
import ModalBackdrop from './ModalBackdrop';
export default {
  components: {
    ModalBackdrop,
  },
  props: {
    message: String,
    autoClose: Number,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() {
    if (this.autoClose) {
      setTimeout(() => this.$modal.close(), this.autoClose * 1000);
    }
  },
}
</script>

<style scoped>
  .modal-content {
    background-color: white;
    border-radius: 8;
    padding: 10 15;
  }
</style>

