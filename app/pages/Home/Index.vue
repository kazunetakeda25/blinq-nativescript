<template>
  <Page actionBarHidden="true">
    <AbsoluteLayout>
      <StackLayout top="0" left="0" width="100%" height="100%">
        <RadSideDrawer ref="drawer">
          <StackLayout ~drawerContent class="drawer">
            <ScrollView>
              <SideDrawer :isShowContent="true" contentFrame="home-frame"/>
            </ScrollView>
          </StackLayout>
          <GridLayout ~mainContent columns="*" rows="*">
            <Frame id="home-frame">
              <HomeScreen @onTabMenuIcon="$refs.drawer.nativeView.showDrawer()" />
            </Frame>
          </GridLayout>
        </RadSideDrawer>
      </StackLayout>
      <LoadingIndicator v-if="isLoading" />
    </AbsoluteLayout>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex';
import { GETTERS as APP_GETTERS } from '~/store';
import { GETTERS as MENU_GETTERS } from '~/store/menu';
import LoadingIndicator from '~/components/LoadingIndicator';
import HomeScreen from "./HomeScreen";
import SideDrawer from "./SideDrawer";
export default {
  components: {
    SideDrawer,
    HomeScreen,
    LoadingIndicator,
  },
  data() {
    return {
      isShowContent: false,
    };
  },
  computed: {
    ...mapGetters({
      isLoading: APP_GETTERS.PROCESSING,
      selectedCurrency: MENU_GETTERS.SELECTED_CURRENCY,
    }),
  },
  watch: {
    async selectedCurrency() {
      await this.$nextTick();
      this.$refs.drawer.nativeView.closeDrawer();
    },
  },
  beforeMount() {
    console.log("herereer");
  },
  mounted() {
    this.$setContentFrame("home-frame");
  },
  methods: {
    onDrawerOpening() {
      console.log("DRAWER OPENING");
      this.isShowContent = true
    },
    onDrawerOpened() {
      console.log("DRAWER OPENED");
    },
    onDrawerClosed() {
      console.log("DRAWER CLOSED");
      this.isShowContent = false;
    }
  }
};
</script>

<style scoped>
.drawer {
  background-color: rgba(0, 0, 0, 0.8);
  border-top-right-radius: 10;
  border-bottom-right-radius: 10;
}
</style>
