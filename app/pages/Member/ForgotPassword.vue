<template>
  <PageContainer title="FORGOT PASSWORD">
    <StackLayout width="100%" padding="0,10">

      <FlexboxLayout marginBottom="20" padding="0" flexDirection="column">
        <Label textWrap="true" text="Please enter your username below and submit to retrieve a new password. If you have also lost your username or registered email, please contact us for further assistance." class="common-section-content" />
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" width="100%" alignItems="flex-start">
        <InputText ref="username" label="username" :required="true" v-model="username" />
        <InputText ref="email" label="email" type="email" :required="true" :typeValidate="true" v-model="email" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="45" height="auto" width="100%" flexDirection="column" alignItems="center">
        <StackLayout height="auto" width="auto" horizontalAlignment="center">
          <RoundButton :width="120" :pink="true" text="Submit" @onTap="onForgot" />
        </StackLayout>
      </FlexboxLayout>

    </StackLayout>
  </PageContainer>
</template>

<script>
import { forgotPassword } from '~/services/member';
import RoundButton from '~/components/Button/RoundButton';
import InputText from '~/components/Input/InputText';
import PageContainer from './PageContainer';
export default {
  props: {
  },
  components: {
    RoundButton,
    InputText,
    PageContainer,
  },
  watch: {
  },
  beforeMount() {
  },
  data() {
    return {
      username: '',
      email: '',
    };
  },
  computed: {
  },
  methods: {
    validateAll() {
      const validUserName = this.$refs.username.valid();
      const validEmail = this.$refs.email.valid();
      return validUserName && validEmail;
    },
    onForgot() {
      if (this.validateAll()) {
        this.submitForgotPswRequest();
      } else {
        this.$showAlert('Some provided info are invalid. Please check!');
      }
    },
    async submitForgotPswRequest() {
      try {
        const response = await forgotPassword(this.username, this.email);
        this.onSuccess(response.Status);
      } catch (error) {
        console.log(JSON.stringify(error));
        this.onError(error.message);
      }
    },
    onSuccess(msg) {
      this.$showConfirm({
          message: msg || 'Forgot password success!',
        }).then((result) => {
          this.$navigateBack();
        });
    },
    onError(msg) {
      this.$showConfirm({
          message: msg || 'Something went wrong, please try again later!',
        }).then((result) => {
          console.log('response to err: ', result);
        });
    },
  }
};
</script>

<style scoped>
.page-title {
  text-align: center;
}
</style>
