<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <Frame>
        <SplashScreen />
      </Frame>
    </StackLayout>
  </Page>
</template>

<script>
import { mapMutations } from 'vuex';
const application = require('application');
import { MUTATORS } from '~/store/cart';
import { MUTATORS as MEMBER_MUTATORS } from '~/store/member';
import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer';
import { handleOpenURL } from 'nativescript-urlhandler';
import SplashScreen from './Splash/SplashScreen';
export default {
  data() {
    return {
      transition: new SlideInOnTopTransition()
    };
  },
  components: {
    SplashScreen,
  },
  methods: {
    ...mapMutations({
      setPaymentData: MUTATORS.SET_PAYMENT_RESPONSE,
      setLogin: MEMBER_MUTATORS.SET_LOGIN_RESULT,
    }),
  },
  mounted() {
    // Hide status bar (Android)
    // if (application.android) {
    //   const win = application.android.startActivity.getWindow();
    //   win.addFlags(android.view.WindowManager.LayoutParams.FLAG_FULLSCREEN);
    // }

    handleOpenURL((appURL) => {
      console.log('BlinQ App Opened from appURL, data:', JSON.stringify(appURL));
      const OrderID = appURL.params.get('OrderID');
      const RouteID = appURL.params.get('RouteID');
      console.log('OrderID', OrderID, 'RouteID', RouteID);
      if (RouteID === 'cart-thank-you') {
        this.setPaymentData({ status: 'SUCCESS', orderId: OrderID });
      } else if (RouteID === 'cart-sorry') {
        this.setPaymentData({ status: 'FAIL', orderId: OrderID });
      } else if (RouteID === 'social-login-success') {
        const memberId = appURL.params.get('MemberID');
        if (memberId) {
          this.setLogin({ memberId });
        }
      } else if (RouteID === 'social-login-register') {
        const Email = appURL.params.get('Email');
        const FacebookID = appURL.params.get('FacebookID');
        const GoogleID = appURL.params.get('GoogleID');
        this.$goToScreen('member-register', { Email, FacebookID, GoogleID });
      }
    });
  },
};
</script>

<style lang="scss" src="../scss/style.scss"></style>
