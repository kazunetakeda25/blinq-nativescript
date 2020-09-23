<template>
  <FlexboxLayout
    flexDirection="column"
    width="100%"
    height="100%"
    alignItems="center"
    justifyContent="center"
  >
    <FlexboxLayout
      marginTop="80"
      marginBottom="20"
      height="80"
      width="100%"
      flexDirection="column"
      alignItems="center"
    >
      <Image
        width="35%"
        height="80"
        stretch="aspectFit"
        src="~/assets/images/logo_login.png"
      />
    </FlexboxLayout>

    <FlexboxLayout marginTop="30" marginBottom="20" width="80%" flexDirection="column" alignItems="center">
      <Label text="ORDER NOT PROCESSED" class="page-section-title" marginBottom="15" />
      <Label
        width="70%"
        textWrap="true"
        textAlign="center"
        text="You are seeing this page possibly due to unsuccessful or aborted payment. Please try again by pressing the button below."
        class="page-section-content"
      />
    </FlexboxLayout>

    <FlexboxLayout
      marginBottom="120"
      height="auto"
      width="100%"
      flexDirection="column"
      alignItems="center"
    >
      <StackLayout height="auto" width="auto" horizontalAlignment="center">
        <RoundButton :pink="true" text="RETRY ORDER" @onTap="onGoToPay" />
      </StackLayout>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script>
import { mapMutations } from 'vuex';
import { MUTATORS } from '~/store/cart';
import RoundButton from '~/components/Button/RoundButton';
export default {
  props: {},
  components: {
    RoundButton
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {
  },
  destroyed() {
  },
  methods: {
    ...mapMutations({
      setPaymentData: MUTATORS.SET_PAYMENT_RESPONSE,
    }),
    onGoToPay() {
      this.setPaymentData({ status: '', orderId: '' });
      this.$emit('onGoToPay');
    },
  },
};
</script>

<style lang="scss" scoped></style>
