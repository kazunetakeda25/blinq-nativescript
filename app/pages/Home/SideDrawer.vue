<template>
  <StackLayout
    v-if="isEnable"
    ref="body"
    :width="$responsiveUI.scale(300)"
    class="drawer-child"
    paddingBottom="30"
  >
    <Image
      horizontalAlignment="left"
      marginLeft="5"
      marginTop="45"
      src="~/assets/images/drawer_open.png"
      height="20"
      width="20"
    />
    <Image
      marginTop="20"
      src="~/assets/images/logo.png"
      height="40"
      width="auto"
      @tap="$goToScreen('home')"
    />

    <FlexboxLayout marginTop="20" :height="memberName ? 'auto' : 0" width="100%" flexDirection="column" alignItems="center">
      <Label fontSize="14" color="white" :text="`Welcome, ${memberName}!`" />
    </FlexboxLayout>

    <StackLayout
      :key="isShowContent"
      horizontalAlignment="middle"
      :width="$responsiveUI.scale(270)"
      height="auto"
      paddingLeft="10"
      paddingRight="10"
      paddingTop="10"
    >
      <FlexboxLayout
        class="all-option-container"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        width="100%"
        height="35"
      >
        <CountrySelector
          flexGrow="1"
          :width="20"
          :height="14"
          textColor="white"
          :isShowLabel="false"
          :itemSelect="selectedCountry"
          :dataList="countryOptions"
          @onChangedItemSelect="onItemCountryChanged($event)"
        />
        <LanguageSelector
          flexGrow="1"
          :isShowImage="false"
          :isShowLabel="true"
          textColor="white"
          :itemSelect="selectedLanguage"
          :dataList="languageOptions"
          @onChangedItemSelect="onItemLanguageChanged($event)"
        />
        <CurrencySelector
          flexGrow="1"
          :isShowImage="false"
          :isShowLabel="true"
          textColor="white"
          :itemSelect="selectedCurrency"
          :dataList="currencyDropdown"
          @onChangedItemSelect="onItemCurrencyChanged($event)"
        />
      </FlexboxLayout>

      <StackLayout width="100%" marginLeft="10" marginRight="10" marginTop="10">
        <SideMenu v-if="menuItemReady" :menuData="menuItems" />
      </StackLayout>
    </StackLayout>
  </StackLayout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import HomeScreen from "./HomeScreen";
import ProductList from "../Product/List/Index";
import Account from "../Member/Account";
import Login from "../Member/Login";
import Register from "../Member/Register";
import { GETTERS, MUTATORS, ACTIONS } from "~/store/menu";
import { GETTERS as MEMBER_GETTERS } from "~/store/member";
import { COUNTRIES } from "~/common/constants";
import CountrySelector from "~/components/CountrySelector";
import LanguageSelector from "~/components/LanguageSelector";
import CurrencySelector from "~/components/CurrencySelector";
import SideMenu from "./SideMenu";
export default {
  props: {
    contentFrame: String,
    isShowContent: Boolean,
  },
  watch: {
    memberId() {
      this.loadMenuItems(this.memberId);
    },
    menuItems() {
      this.menuItemReady = true;
    },
    isShowContent() {
      console.log("Changed: ", this.isShowContent);
    }
  },
  data() {
    return {
      menuItemReady: false,
      countrySelected: COUNTRIES[0],
      listOfItems: COUNTRIES
    };
  },
  components: {
    CountrySelector,
    LanguageSelector,
    CurrencySelector,
    SideMenu
  },
  computed: {
    ...mapGetters({
      memberId: MEMBER_GETTERS.MEMBER_ID,
      memberName: MEMBER_GETTERS.MEMBER_NAME,
      menuItems: GETTERS.MENU_ITEMS,
      countryOptions: GETTERS.DROPDOWN_COUNTRIES,
      languageOptions: GETTERS.DROPDOWN_LANGUAGES,
      currencyOptions: GETTERS.DROPDOWN_CURRENCIES,
      selectedLanguage: GETTERS.SELECTED_LANGUAGE,
      selectedCountry: GETTERS.SELECTED_COUNTRY,
      selectedCurrency: GETTERS.SELECTED_CURRENCY
    }),
    isEnable() {
      return (
        this.countryOptions &&
        this.languageOptions &&
        this.currencyOptions &&
        this.selectedLanguage &&
        this.selectedCountry &&
        this.selectedCurrency
      );
    },
    currencyDropdown() {
      if (this.selectedCurrency) {
        return this.currencyOptions.filter(
          currency => currency.Code === this.selectedCurrency
        );
      }
      return this.currencyOptions;
    }
  },
  mounted() {
    this.loadMenuItems(this.memberId);
    console.log("MENU width: ", this.$refs.body.nativeView.width);
  },
  methods: {
    ...mapMutations({
      setSelectedOption: MUTATORS.SET_SELECTED
    }),
    ...mapActions({
      loadMenuItems: ACTIONS.LOAD_MENU_ITEMS,
      loadGeoIP: ACTIONS.LOAD_GEOIP_CONFIG
    }),
    onItemCountryChanged(country) {
      this.loadGeoIP(country);
      this.setSelectedOption({ country });
    },
    onItemLanguageChanged(language) {
      this.setSelectedOption({ language });
    },
    onItemCurrencyChanged(currency) {
      this.setSelectedOption({ currency });
    }
  }
};
</script>

<style scoped>
.drawer {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  border-top-right-radius: 10;
  border-bottom-right-radius: 10;
}

.drawer-child {
  padding-left: 15;
  padding-right: 15;
}

.drawer-header {
  width: 80%;
  font-weight: bold;
  border-width: 1;
  border-bottom-color: #fff;
  padding: 10 0 10 0;
  margin-bottom: 5;
  color: #ffffff;
  font-size: 13;
  font-family: "Roboto", "Roboto-Black";
  font-weight: 900;
}

.drawer-item {
  padding: 3 0;
  color: #ffffff;
  font-size: 12;
  font-family: "Roboto", "Roboto-Black";
  font-weight: 900;
}

.drawer-sub-item {
  padding: 3 20;
  color: #ffffff;
  font-size: 12;
  font-family: "Roboto", "Roboto-Light";
  font-weight: 300;
}

.profile-item-container {
  padding-top: 10;
  padding-bottom: 10;
}

.profile-item-container.border {
  border-top-width: 1;
  border-top-color: #ffffff;
}

.profile-item {
  padding: 5 0;
  color: #ffffff;
  font-size: 12;
  font-family: "Roboto", "Roboto-Light";
  font-weight: 300;
}

.logout-item {
  width: 80%;
  padding: 10 0 10 0;
  margin-bottom: 5;
  color: #ffffff;
  font-size: 12;
}

.all-option-container {
  margin-top: 30;
  margin-bottom: 20;
  border-top-width: 1;
  border-bottom-width: 1;
  border-top-color: #fff;
  border-bottom-color: #fff;
  padding-left: 10;
  padding-right: 10;
}

.country-selector {
  margin-left: 0;
}
</style>
