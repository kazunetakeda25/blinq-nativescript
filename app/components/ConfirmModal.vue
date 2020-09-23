<template>
  <ModalBackdrop @onTap="clickOutSide && $modal.close(false)">
    <StackLayout
      :left="$responsiveUI.scale(375 * 0.1)"
      :top="$responsiveUI.verticalScale(166.75)"
      :width="$responsiveUI.scale(375 * 0.8)"
      class="modal-content" height="auto">
      <Label :text="message" :color="$colors.FONT_DEFAULT" fontSize="14" textWrap="true" horizontalAlignment="center" textAlignment="center" />

      <FlexboxLayout marginTop="20" height="auto" width="100%" flexDirection="column" alignItems="center">
        <StackLayout height="auto" width="auto" horizontalAlignment="center">
          <RoundButton :width="120" :pink="true" :text="confirmBtnText || 'OK'" @onTap="$modal.close(true)" />
        </StackLayout>
      </FlexboxLayout>
    </StackLayout>
  </ModalBackdrop>
</template>

<script>
import ModalBackdrop from './ModalBackdrop';
import RoundButton from './Button/RoundButton';
export default {
  components: {
    ModalBackdrop,
    RoundButton,
  },
  props: {
    message: String,
    confirmBtnText: String,
    clickOutSide: Boolean,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
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

