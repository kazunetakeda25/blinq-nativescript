<template>
  <PageContainer title="LOGIN" :overrideBackBtn="forceToHome" @onBack="$goToScreen('home')">
    <FlexboxLayout flexDirection="column" width="100%" alignItems="top">
      <StackLayout height="auto" width="auto" marginBottom="30" horizontalAlignment="center">
        <Image
          src="~/assets/images/logo_login.png"
          height="40"
          width="auto"
          @tap="$goToScreen('home')"
        />
      </StackLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" padding="0, 10%, 0" width="100%" alignItems="top">
        <InputText ref="username" label="username" v-model="login.username" />
        <InputPassword ref="password" label="password" v-model="login.password" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="25" height="auto" width="100%" flexDirection="column" alignItems="center">
        <StackLayout height="auto" width="auto" horizontalAlignment="center">
          <RoundButton :width="120" :pink="true" text="Login" @onTap="onLogin" />
        </StackLayout>
      </FlexboxLayout>

      <FlexboxLayout marginBottom="25" width="100%" flexDirection="row" alignItems="top">
        <Label flexGrow="1" text="or" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" height="auto" width="100%" flexDirection="column" alignItems="center">
        <StackLayout height="auto" width="auto" horizontalAlignment="center">
          <BlueRoundButton :width="250" text="Login with Facebook" @onTap="onLoginFacebook" />
        </StackLayout>
      </FlexboxLayout>

      <FlexboxLayout marginBottom="10" height="auto" width="100%" flexDirection="column" alignItems="center">
        <StackLayout height="auto" width="auto" horizontalAlignment="center">
          <RedRoundButton :width="250" text="Login with Google" @onTap="onLoginGoogle" />
        </StackLayout>
      </FlexboxLayout>

      <StackLayout width="100%" padding="0,10" margin="25,0">
        <StackLayout height="1" width="100%" class="bg-grey"></StackLayout>
      </StackLayout>

      <FlexboxLayout marginBottom="20" width="100%" flexDirection="row" alignItems="top">
        <Label flexGrow="1" text="New to BlinQ?" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" height="auto" width="100%" flexDirection="column" alignItems="center">
        <StackLayout height="auto" width="auto" horizontalAlignment="center">
          <RoundButton :width="120" :pink="true" text="Register" @onTap="$goToScreen('member-register')" />
        </StackLayout>
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" height="auto" width="100%" flexDirection="column" alignItems="center">
        <Label text="Forgot your password?" fontSize="12" @onTap="$goToScreen('member-forgot-password')" />
      </FlexboxLayout>

    </FlexboxLayout>
  </PageContainer>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
const application = require('application');
const utils = require('utils/utils');
import { ACTIONS, GETTERS, MUTATORS } from '~/store/member';
import { login } from '~/services/member';
import RoundButton from '~/components/Button/RoundButton';
import RedRoundButton from '~/components/Button/RedRoundButton';
import BlueRoundButton from '~/components/Button/BlueRoundButton';
import InputText from '~/components/Input/InputText';
import InputPassword from '~/components/Input/InputPassword';
import PageContainer from './PageContainer';
const FB_LOGIN_URL = 'https://www.blinq.fashion/mobileapp/member/facebooklogin?scenario=1';
const GG_LOGIN_URL = 'https://www.blinq.fashion/mobileapp/member/googlelogin?scenario=3';
export default {
  components: {
    RoundButton,
    RedRoundButton,
    BlueRoundButton,
    InputText,
    InputPassword,
    PageContainer,
  },
  props: {
    forceToHome: Boolean,
  },
  computed: {
    ...mapGetters({
      memberId: GETTERS.MEMBER_ID,
      loginError: GETTERS.AUTH_ERROR,
    }),
  },
  watch: {
    memberId() {
      if (this.memberId) {
        this.$showAlert('You have logged in successfully.', 2).then(this.onGoBack);
      }
    },
    loginError() {
      if (this.loginError) {
        this.$showConfirm({ message: 'Invalid username and/or password.' }).then(result => {
          this.login = {
            username: '',
            password: '',
          };
          this.$refs.username.focus();
        });
      }
    },
  },
  data() {
    return {
      loading: false,
      login: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapMutations({
      clearLoginInfo: MUTATORS.CLEAR_LOGIN_INFO,
    }),
    ...mapActions({
      requestLogin: ACTIONS.LOGIN,
    }),
    async onLogin() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      if (this.login.username && this.login.password) {
        this.clearLoginInfo();
        await this.requestLogin(this.login);
      } else {
        this.$showAlert('Please provide all required info.');
      }
      this.loading = false;
    },
    onLoginFacebook() {
      utils.openUrl(FB_LOGIN_URL);
    },
    onLoginGoogle() {
      utils.openUrl(GG_LOGIN_URL);
    },
    onGoBack() {
      if (this.forceToHome) {
        this.$goToScreen('home');
      } else {
        this.$navigateBack();
      }
    },
    backEventHandler(args) {
      args.cancel = true;
      this.onGoBack();
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
    if (this.forceToHome) {
      this.blockAndroidBackBtn();
    }
  },
  beforeDestroy() {
    if (this.forceToHome) {
      this.enableAndroidBackBtn();
    }
  },
};
</script>

<style scoped>
.page-title {
  text-align: center;
}
</style>
