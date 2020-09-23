<template>
  <FlexBoxLayout width="100%" padding="50,10,0,10" height="auto" flexDirection="column" alignItems="top" justifyContent="center" class="bg-default">
    <FlexboxLayout marginBottom="20" width="100%" flexDirection="row" alignItems="top">
      <Label flexGrow="1" text="HAVE A PROMO CODE?" class="page-section-title"/>
    </FlexboxLayout>

    <StackLayout width="100%" height="auto" padding="0" :backgroundColor="readOnly ? 'grey' : 'white'">
      <TextField v-model="promo"
        hint="Enter your promo code here"
        verticalAlignment="center"
        fontSize="14" width="100%" height="30"
        padding="0,10"
        @textChange="onChange" />
    </StackLayout>

    <StackLayout width="100%" v-if="!codeValid">
      <Label text="Invalid promo code" color="red" fontSize="12" />
    </StackLayout>

    <FlexBoxLayout alignItems="center" justifyContent="center" width="100%" height="50">
      <RoundButton :pink="true" :width="100" text="APPLY" @onTap="applyPromoCode" />
    </FlexBoxLayout>
  </FlexBoxLayout>
</template>

<script>
import RoundButton from '~/components/Button/RoundButton';
import InputText from '~/components/Input/InputText';
export default {
  props: {
    value: String,
    codeValid: Boolean,
  },
  data() {
    return {
      promo: '',
    };
  },
  watch: {
    value() {
      this.promo = this.value;
    },
    promo(val) {
      if (val !== this.value) {
        this.$emit('input', val);
        console.log('PROMO_CHANGED', val);
      }
    },
  },
  components: {
    RoundButton,
    InputText,
  },
  methods: {
    onChange(evt) {
      this.$emit('input', evt.value);
      console.log('PROMO_CHANGED', evt.value);
    },
    applyPromoCode() {
      console.log('ON_APPLY_PROMO', this.promo);
      this.$emit('onApply', this.promo);
    },
  },
  mounted() {
    this.promo = this.value;
  },
}
</script>

<style scoped></style>
