<template>
  <Page actionBarHidden="true" class="bg-default">
    <AbsoluteLayout @tap="onTapOutSide">
      <ScrollView ref="scrollView" top="0" left="0" width="100%" height="100%" class="bg-default" @scroll="onScroll">
        <FlexboxLayout flexDirection="column" paddingBottom="10">

          <PageTitle :title="pageTitle" />

          <slot></slot>

        </FlexboxLayout>
      </ScrollView>

      <!-- Controls -->
      <BackButton :noDefault="overrideBackBtn" @onTap="$emit('onBack')" />
      <LoadingIndicator v-if="isLoading" />
    </AbsoluteLayout>
  </Page>
</template>

<script>
import { mapGetters } from "vuex";
import { GETTERS as APP_GETTERS } from "~/store";
import LoadingIndicator from '~/components/LoadingIndicator';
import BackButton from '~/components/Button/BackButton';
import PageTitle from '~/components/PageTitle';
export default {
  components: {
    PageTitle,
    BackButton,
    LoadingIndicator,
  },
  props: {
    title: String,
    overrideBackBtn: Boolean,
  },
  watch: {
  },
  beforeMount() {
  },
  data() {
    return {
      lastY: 0,
    };
  },
  computed: {
    ...mapGetters({
      isLoading: APP_GETTERS.PROCESSING,
    }),
    pageTitle() {
      return (this.title || '').toUpperCase();
    }
  },
  methods: {
    onScroll(event) {
      this.$looseFocusedInput();
      const scrollY = event.scrollY;
      const scrollableHeight = this.$refs.scrollView.nativeView.scrollableHeight;
      this.$emit('onScroll', {
        lastY: this.lastY,
        currentY: scrollY,
        scrollableHeight: scrollableHeight,
      });
      this.lastY = scrollY;
    },
    onTapOutSide() {
      this.$looseFocusedInput();
    },
  }
};
</script>

<style scoped>
.page-title {
  text-align: center;
}
</style>
