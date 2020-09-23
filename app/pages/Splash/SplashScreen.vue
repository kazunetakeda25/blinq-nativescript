<template>
  <Page actionBarHidden="true">
    <AbsoluteLayout>
      <Image
        left="0" top="0"
        :width="screenWidth"
        :height="screenHeight"
        src="~/assets/images/splash_screen.png"
        stretch="aspectFill"
      />
      <FlexboxLayout left="0" top="0" width="100%" height="100%" alignItems="stretch" flexDirection="column">
         <Label flexGrow="1"/>
         <FlexboxLayout alignItems="center" class="version-container">
           <Label :text="`Version: ${APP_VERSION}`" class="text-center" verticalAlignment="middle" flexGrow="1"/>
         </FlexboxLayout>
      </FlexboxLayout>
    </AbsoluteLayout>
  </Page>
</template>
<script>
import HomeScreen from "../Home/Index";
import { APP_VERSION } from "../../common/constants";
import { mapGetters, mapActions } from "vuex";
import { ACTIONS, GETTERS } from "../../store";
import { ACTIONS as MENU_ACTIONS, GETTERS as MENU_GETTERS } from '../../store/menu';
export default {
  data() {
    return {
      APP_VERSION,
      apiLoaded: [],
      counted: false,
    };
  },
  computed: {
    ...mapGetters({
      appConfig: GETTERS.APP_CONFIG,
      defaultCountry: MENU_GETTERS.DEFAULT_COUNTRY,
    }),
    // size
    screenWidth() {
      return this.$responsiveUI.scale(375);
    },
    screenHeight() {
      return this.$responsiveUI.verticalScale(667);
    },
  },
  watch: {
    appConfig(newData) {
      this.navigateToHome();
    }
  },
  methods: {
    ...mapActions({
      loadAppConfig: ACTIONS.LOAD_APP_CONFIG,
      loadDropdownOptions: MENU_ACTIONS.LOAD_DROPDOWN_OPTIONS,
      loadMenuItems: MENU_ACTIONS.LOAD_MENU_ITEMS,
      loadGeoIP: MENU_ACTIONS.LOAD_GEOIP_CONFIG,
    }),
    loadAPI() {
      this.loadAppConfig().then(() => this.loadedOne('loadAppConfig'));
      this.loadDropdownOptions().then(() => this.loadedOne('loadDropdownOptions'));
      this.loadMenuItems().then(() => this.loadedOne('loadMenuItems'));
      this.loadGeoIP(this.defaultCountry).then(() => this.loadedOne('loadGeoIP'));
    },
    loadedOne(name) {
      this.apiLoaded.push(name);
      console.log('loadedOne', name);
      this.navigateToHome();
    },
    countDown() {
      setTimeout(() => {
        this.counted = true;
        this.navigateToHome();
      }, 3000);
    },
    navigateToHome() {
      console.log('navigateToHome-1');
      if (this.apiLoaded.length >= 4 && this.counted) {
        console.log('navigateToHome-2', this.$navigateTo);
        this.$navigateTo(HomeScreen, { clearHistory: true });
      }
    }
  },
  mounted() {
    console.log('SPLASHSCREEN_MOUNTED');
    this.countDown();
    this.loadAPI();
  }
};
</script>

<style lang="scss" scoped src="./SplashScreen.scss"></style>
