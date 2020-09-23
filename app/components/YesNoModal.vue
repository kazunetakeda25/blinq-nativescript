<template>
  <ModalBackdrop>
    <StackLayout
      :left="$responsiveUI.scale(375 * 0.1)"
      :top="$responsiveUI.verticalScale(166.75)"
      :width="$responsiveUI.scale(375 * 0.8)"
      class="modal-content" height="auto">

      <Label :text="message" :color="$colors.FONT_DEFAULT"
        fontSize="14" textWrap="true"
        horizontalAlignment="center" textAlignment="center" />

      <GridLayout width="100%" columns="*,*" rows="*" marginTop="20">
        <StackLayout row="0" col="0" horizontalAlignment="left">
          <RoundButton :text="noBtnText || 'NO'" @onTap="onNo" />
        </StackLayout>
        <StackLayout row="0" col="1" horizontalAlignment="right">
          <RoundButton :pink="true" :text="yesBtnText || 'YES'" @onTap="onYes" />
        </StackLayout>
      </GridLayout>

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
    yesBtnText: String,
    noBtnText: String,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    onYes() {
      this.$modal.close('YES');
    },
    onNo() {
      this.$modal.close('NO');
    },
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

