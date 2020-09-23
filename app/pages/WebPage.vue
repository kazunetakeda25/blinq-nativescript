<template>
  <Page actionBarHidden="true">
    <AbsoluteLayout width="100%" height="100%">
      <WebView top="0" left="0" :src="url"
        width="100%" height="100%" />

      <BackButton />
      <CartButton />
    </AbsoluteLayout>
  </Page>
</template>

<script>
import BackButton from '~/components/Button/BackButton';
import CartButton from '~/components/Button/CartButton';
export default {
  props: {
    url: String,
  },
  components: {
    BackButton,
    CartButton,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped></style>
