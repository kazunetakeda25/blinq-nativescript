<template>
  <PageContainer title="CHANGE PASSWORD">
    <StackLayout width="100%" padding="0,10">

      <FlexboxLayout flexDirection="column" marginBottom="20" width="100%" alignItems="flex-start">
        <InputPassword ref="currentPassword" label="current password" v-model="currentPassword" :required="true" />
        <InputPassword ref="newPassword" label="new password" v-model="newPassword" :required="true" :typeValidate="true" />
        <InputPassword ref="confirmNewPassword" label="confirm new password" v-model="confirmNewPassword" :required="true" :typeValidate="true" :confirmCheck="true" :passwordValue="newPassword" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="45" height="auto" width="100%" flexDirection="column" alignItems="center">
        <StackLayout height="auto" width="auto" horizontalAlignment="center">
          <RoundButton :width="120" :pink="true" text="Submit" @onTap="onChangePassword" />
        </StackLayout>
      </FlexboxLayout>

    </StackLayout>
  </PageContainer>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { GETTERS, MUTATORS } from '~/store/member';
import { changePassword as sendChangePwdRequest } from '~/services/member';
import RoundButton from '~/components/Button/RoundButton';
import InputPassword from '~/components/Input/InputPassword';
import PageContainer from './PageContainer';
export default {
  props: {
  },
  components: {
    RoundButton,
    InputPassword,
    PageContainer,
  },
  watch: {
    memberId() {
      if (!this.memberId) {
        this.$goToScreen('member-login', 'home');
      }
    },
  },
  beforeMount() {
  },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };
  },
  computed: {
    ...mapGetters({
      memberId: GETTERS.MEMBER_ID,
    }),
  },
  methods: {
    ...mapMutations({
      logOut: MUTATORS.LOGOUT,
    }),
    validateAll() {
      const validCurrentPassword = this.$refs.currentPassword.valid();
      const validNewPassword = this.$refs.newPassword.valid();
      const validConfirmNewPassword = this.$refs.confirmNewPassword.valid();
      return validCurrentPassword && validNewPassword && validConfirmNewPassword;
    },
    onChangePassword() {
      if (!this.memberId) {
        return;
      }
      if (this.validateAll()) {
        this.submitChangePswRequest();
      } else {
        this.$showAlert('Some provided info are invalid. Please check!');
      }
    },
    async submitChangePswRequest() {
      try {
        const response = await sendChangePwdRequest(this.memberId, this.currentPassword, this.newPassword);
        this.onSuccess(response.Status);
      } catch (error) {
        console.log(JSON.stringify(error));
        this.onError(error.message);
      }
    },
    onSuccess(msg) {
      this.$showConfirm({
          message: msg || 'Change password success!',
        }).then((result) => {
          this.logOut();
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
