<template>
  <PageContainer title="REGISTER">

    <StackLayout width="100%" padding="0,10">

      <FlexboxLayout marginBottom="20" flexDirection="column">
        <Label textWrap="true" text="Creating your account with us is easy! Start by filling up form below:" class="common-section-content" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" width="100%" flexDirection="row" alignItems="top">
        <Label flexGrow="1" text="PERSONAL DETAILS" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" width="100%" alignItems="top">
        <InputText ref="name" label="name" :required="true" v-model="register.Name" />
        <StackLayout width="100%">
          <InputSelect ref="gender" label="gender" :required="true" v-model="register.GenderID" :options="genderOptions" />
        </StackLayout>
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" width="100%" flexDirection="row" alignItems="top">
        <Label flexGrow="1" text="ACCOUNT DETAILS" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" width="100%">
        <InputText ref="username" label="username" hint="(You will use this to login)" :required="true" v-model="register.Username" />
        <InputPassword ref="password" label="password" v-model="register.Password" :required="true" :typeValidate="true" />
        <InputPassword ref="confirmpassword" label="confirm password" v-model="register.ConfirmPassword" :required="true" :typeValidate="true" :confirmCheck="true" :passwordValue="register.Password" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" width="100%" flexDirection="row">
        <Label flexGrow="1" text="CONTACT DETAILS" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" width="100%">
        <InputText ref="phoneno" label="phone no" hint="(e.g. 652054XXXX)" :required="true" v-model="register.PhoneNo" />
        <InputText ref="email" label="email" hint="(e.g. your.name@domain.com)" type="email" :required="true" :readOnly="!!Email" :typeValidate="true" v-model="register.Email" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" width="100%" flexDirection="row">
        <Label flexGrow="1" text="OTHER DETAILS" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" width="100%">
        <InputText ref="company" label="company" v-model="register.Company" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="200" height="auto" width="100%" flexDirection="column" alignItems="center">
        <StackLayout height="auto" width="auto" horizontalAlignment="center">
          <RoundButton :width="120" :pink="true" text="Submit" @onTap="onRegister" />
        </StackLayout>
      </FlexboxLayout>

    </StackLayout>
  </PageContainer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ACTIONS, GETTERS } from "~/store/member";
import { register as sendRegisterRequest } from '~/services/member';
import RoundButton from '~/components/Button/RoundButton';
import InputText from '~/components/Input/InputText';
import InputPassword from '~/components/Input/InputPassword';
import InputSelect from '~/components/Input/InputSelect';
import PageContainer from './PageContainer';
export default {
  props: {
    Email: String,
    FacebookID: String,
    GoogleID: String,
  },
  components: {
    PageContainer,
    RoundButton,
    InputText,
    InputPassword,
    InputSelect,
  },
  watch: {
  },
  beforeMount() {
  },
  data() {
    return {
      register: {
        Name: '',
        GenderID: '',
        Username: '',
        Password: '',
        ConfirmPassword: '',
        PhoneNo: '',
        Email: '',
        Company: '',
        FacebookID: '',
        GoogleID: '',
      },
      genderOptions: [
        {
          Code: '',
          Name: 'Select gender',
        },
        {
          Code: '1',
          Name: 'Male',
        },
        {
          Code: '2',
          Name: 'Female',
        },
      ],
    };
  },
  computed: {
  },
  methods: {
    validateAll() {
      const validName = this.$refs.name.valid();
      const validGender = this.$refs.gender.valid();
      const validUserName = this.$refs.username.valid();
      const validPassword = this.$refs.password.valid();
      const validConfirmPassword = this.$refs.confirmpassword.valid();
      const validPhone = this.$refs.phoneno.valid();
      const validEmail = this.$refs.email.valid();
      return (
        validName && validGender && validUserName &&
        validPassword && validConfirmPassword &&
        validPhone && validEmail
      );
    },
    onRegister() {
      console.log(JSON.stringify(this.register));
      if (this.validateAll()) {
        this.$showConfirm({
          confirmBtnText: 'YES',
          message: 'I agree that the information provided above is accurate, and I accept the terms of use of the app.',
        }).then(result => {
          if (result) {
            this.submitRegistrationRequest();
          }
        });
        console.log('VALID');
      } else {
        this.$showAlert('Some provided info are invalid. Please check!');
      }
    },
    async submitRegistrationRequest() {
      try {
        const response = await sendRegisterRequest(this.register);
        console.log('response', response);
        if (response) {
          if (response.Message) {
            this.onRegisterFail(response.Message);
          } else {
            this.onRegisterSuccess();
          }
        } else {
          this.onRegisterFail();
        }
      } catch (error) {
        this.onRegisterFail(error.message);
      }
    },
    onRegisterFail(msg = '') {
      this.$showConfirm({
          message: msg || 'Something went wrong, please try again later!',
        }).then(result => {
          if (result) {
            console.log('response to err: ', result);
          }
        });
    },
    onRegisterSuccess() {
      this.$showAlert('Registration successfully!').then(() => {
          this.$goToScreen('member-login', 'home');
        });
    },
  },
  mounted() {
    this.register.Email = this.Email || '';
    this.register.FacebookID = this.FacebookID || '';
    this.register.GoogleID = this.GoogleID || '';
  },
};
</script>

<style scoped>
</style>
