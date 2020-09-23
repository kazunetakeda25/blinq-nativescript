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

    <FlexboxLayout
      marginTop="30"
      marginBottom="20"
      width="80%"
      flexDirection="column"
      alignItems="center"
    >
      <Label text="THANK YOU" class="page-section-title" marginBottom="15" />
      <Label
        width="60%"
        textWrap="true"
        text="Thank you for your purchase with BlinQ! Your order is now being processed."
        class="page-section-content"
      />
    </FlexboxLayout>

    <FlexboxLayout
      marginTop="20"
      height="auto"
      width="100%"
      flexDirection="column"
      alignItems="center"
    >
      <StackLayout height="auto" width="auto" horizontalAlignment="center">
        <RoundButton :pink="true" text="VIEW MY ORDER HERE" @onTap="goHome" />
      </StackLayout>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script>
import { mapMutations } from 'vuex';
import { MUTATORS } from '~/store/cart';
import RoundButton from '~/components/Button/RoundButton';
import HomeScreen from '~/pages/Home/Index';
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
    this.clearShoppingCart();
  },
  destroyed() {
  },
  methods: {
    ...mapMutations({
      clearShoppingCart: MUTATORS.CLEAR_SHOPPING_CART
    }),
    goHome() {
      this.$navigateTo(HomeScreen, { clearHistory: true });
    }
  }
};
</script>

<style lang="scss" scoped></style>
