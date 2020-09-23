<template>
  <Page actionBarHidden="true">
    <AbsoluteLayout @tap="onTapOutSide">
      <ScrollView top="0" left="0" width="100%" height="100%" class="bg-default" @scroll="onTapOutSide">
        <StackLayout width="100%">
          <CartSummaryScreen @goNext="goNext" @onError="onError" v-if="stage === 'summary'" />
          <UserTypeScreen @goNext="goNext" @onError="onError" v-if="stage === 'user-type'" />
          <GuestAddressScreen @goNext="goNext" @onError="onError" v-if="stage === 'guest-address'" />
          <MemberAddressScreen @goNext="goNext" @onError="onError" v-if="stage === 'address'" />
          <DeliveryOptionScreen @goNext="goNext" @onError="onError" v-if="stage === 'delivery-option'" />
          <PaymentOptionScreen @goNext="goNext" @onError="onError" v-if="stage === 'payment-option'" />
          <CartConfirmScreen @goCheckCart="setStage('summary')" @goNext="goNext" @onError="onError" v-if="stage === 'confirm'" />
          <PaymentScreen @goToPay="setStage('payment-option')" @onError="onError" v-if="stage === 'create-order'" />
        </StackLayout>
      </ScrollView>
      <BackButton v-if="stage !== 'create-order'" :noDefault="true" @onTap="goBack" />
      <LoadingIndicator v-if="isLoading" />
    </AbsoluteLayout>
  </Page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { GETTERS, MUTATORS } from '~/store/cart';
import { GETTERS as MEMBER_GETTERS } from '~/store/member';
import { GETTERS as APP_GETTERS } from '~/store';
import LoadingIndicator from '~/components/LoadingIndicator';
import BackButton from '~/components/Button/BackButton';
import CartSummaryScreen from './cartSummary/Index';
import UserTypeScreen from './userType/Index';
import GuestAddressScreen from './address/GuestAddress';
import MemberAddressScreen from './address/MemberAddress';
import DeliveryOptionScreen from './deliveryOption/Index';
import PaymentOptionScreen from './paymentOption/Index';
import CartConfirmScreen from './cartConfirm/Index';
import PaymentScreen from './payment/Index';
const application = require('application');
const utils = require('utils/utils');
export default {
  props: {
  },
  components: {
    BackButton,
    CartSummaryScreen,
    UserTypeScreen,
    GuestAddressScreen,
    MemberAddressScreen,
    DeliveryOptionScreen,
    PaymentOptionScreen,
    CartConfirmScreen,
    PaymentScreen,
    LoadingIndicator,
  },
  data() {
    return {
      flowGuest: ['summary', 'user-type', 'guest-address', 'delivery-option', 'payment-option', 'confirm', 'create-order'],
      flowMember: ['summary', 'address', 'delivery-option', 'payment-option', 'confirm', 'create-order'],
    };
  },
  computed: {
    ...mapGetters({
      stage: GETTERS.CHECKOUT_STAGE,
      cartData: GETTERS.CART_DATA,
      memberId: MEMBER_GETTERS.MEMBER_ID,
      isLoading: APP_GETTERS.PROCESSING,
    }),
  },
  watch: {
    memberId(val) {
      if (val && this.stage === 'user-type') {
        this.setupCart({
          MemberID: val || '',
          Stage: 'address',
        });
      }
    },
  },
  methods: {
    ...mapMutations({
      setupCart: MUTATORS.SETUP_CART,
      setStage: MUTATORS.UPDATE_CART_STAGE,
      clearPaymentStatus: MUTATORS.CLEAR_PAYMENT_DATA,
    }),
    onError(err) {
      console.log('current-stage', this.stage, 'GOT_API_ERR_RESPONSE: ', JSON.stringify(err));
      if (err.Message) {
        this.$showConfirm({ message: err.Message }).then(result => {
          console.log('response to err: ', result);
        });
      } else {
        this.$showConfirm({ message: 'Something went wrong, please try again later.' }).then(result => {
          console.log('response to err: ', result);
        });
      }
    },
    getNextScreen() {
      if (this.stage === 'create-order') {
        return '';
      }
      const screens = this.memberId ? this.flowMember : this.flowGuest;
      const currScreenIndex = screens.indexOf(this.stage);
      return screens[currScreenIndex + 1];
    },
    getPrevScreen() {
      if (this.stage === 'summary') {
        return '';
      }
      const screens = this.memberId ? this.flowMember : this.flowGuest;
      const currScreenIndex = screens.indexOf(this.stage);
      return screens[currScreenIndex - 1];
    },
    goNext() {
      const nextScreen = this.getNextScreen();
      console.log('currScreen', this.stage);
      console.log('nextScreen', nextScreen);
      if (nextScreen) {
        this.setStage(nextScreen);
      }
      console.log('CURRENT_CART_DATA', JSON.stringify(this.cartData));
    },
    goBack() {
      const prevScreen = this.getPrevScreen();
      console.log('currScreen', this.stage);
      console.log('prevScreen', prevScreen);
      if (prevScreen) {
        this.setStage(prevScreen);
      } else {
        this.$navigateBack();
      }
      console.log('CURRENT_CART_DATA_ONBACK', JSON.stringify(this.cartData));
    },
    onTapOutSide() {
      console.log('USER TAP OUTSIDE');
      this.$looseFocusedInput();
    },
    backEventHandler(args) {
      args.cancel = true;
      if (this.stage !== 'create-order') {
        this.goBack();
      }
    },
    blockAndroidBackBtn() {
      if (application.android) {
        application.android.on(application.AndroidApplication.activityBackPressedEvent, this.backEventHandler);
      }
    },
    enableAndroidBackBtn() {
      if (application.android) {
        application.android.off(application.AndroidApplication.activityBackPressedEvent, this.backEventHandler);
      }
    },
  },
  mounted() {
    this.blockAndroidBackBtn();
    this.setStage('summary');
    this.clearPaymentStatus();
  },
  beforeDestroy() {
    this.enableAndroidBackBtn();
    this.setStage('summary');
  },
};
</script>

<style lang="scss" scoped></style>
