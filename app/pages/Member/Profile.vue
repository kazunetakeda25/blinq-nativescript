<template>
  <PageContainer title="MY PROFILE">

    <StackLayout width="100%" padding="0,10">

      <FlexboxLayout marginBottom="20" flexDirection="column">
        <Label textWrap="true" text="Keeping your profile updated and accurate ensures better service from us!" class="common-section-content" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" width="100%" flexDirection="row" alignItems="top">
        <Label flexGrow="1" text="ACCOUNT DETAILS" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" width="100%" alignItems="top">
        <InputText label="username" :readOnly="true" v-model="profile.Username" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" width="100%" flexDirection="row" alignItems="top">
        <Label flexGrow="1" text="PERSONAL DETAILS" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" width="100%">
        <InputText ref="name" label="name" :required="true" v-model="profile.Name" />
        <StackLayout width="100%">
          <InputSelect ref="gender" label="gender" :required="true" v-model="profile.GenderID" :options="genderOptions" />
        </StackLayout>
        <InputText ref="dob" label="date of birth" hint="DD-MM-YYYY" type="datetime" :required="true" v-model="profile.DOB" />
        <InputText ref="phoneno" label="phone no" hint="(e.g. 652054XXXX)" :required="true" v-model="profile.PhoneNo" />
        <InputText ref="email" label="email" hint="(e.g. your.name@domain.com)" type="email" :required="true" :typeValidate="true" v-model="profile.Email" />
        <StackLayout width="100%">
          <InputSelect ref="country" label="nationality" :required="true" v-model="profile.NationalityID" :options="countryOptions" />
        </StackLayout>
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" width="100%" flexDirection="row">
        <Label flexGrow="1" text="OTHER DETAILS" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" width="100%">
        <InputText ref="company" label="company" v-model="profile.Company" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="200" height="auto" width="100%" flexDirection="column" alignItems="center">
        <StackLayout height="auto" width="auto" horizontalAlignment="center">
          <RoundButton :width="120" :pink="true" text="Submit" @onTap="onSubmit" />
        </StackLayout>
      </FlexboxLayout>

    </StackLayout>
  </PageContainer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { ACTIONS, GETTERS } from '~/store/member';
import { GETTERS as MENU_GETTERS } from '~/store/menu';
import { getMemberProfile, updateMemberProfile } from '~/services/member';
import RoundButton from '~/components/Button/RoundButton';
import InputText from '~/components/Input/InputText';
import InputPassword from '~/components/Input/InputPassword';
import InputSelect from '~/components/Input/InputSelect';
import PageContainer from './PageContainer';
export default {
  props: {
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
      profile: {
        MemberID: '',
        Username: '',
        Name: '',
        GenderID: '',
        DOB: '',
        PhoneNo: '',
        Email: '',
        NationalityID: '',
        Company: '',
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
    ...mapGetters({
      memberId: GETTERS.MEMBER_ID,
      countries: MENU_GETTERS.DROPDOWN_COUNTRIES,
    }),
    countryOptions() {
      return this.countries.map((country) => ({
        Code: country.ID,
        Name: country.Name,
      }));
    },
  },
  methods: {
    async loadMemberProfile() {
      try {
        const profileData = await getMemberProfile(this.memberId);
        this.profile.Username = profileData.Username;
        this.profile.Name = profileData.Name;
        this.profile.GenderID = profileData.GenderID;
        this.profile.DOB = profileData.DOB;
        this.profile.PhoneNo = profileData.PhoneNo;
        this.profile.Email = profileData.Email;
        this.profile.NationalityID = profileData.NationalityID;
        this.profile.Company = profileData.Company;
      } catch (error) {
        console.log('error', error);
      }
    },
    validateAll() {
      const validName = this.$refs.name.valid();
      const validGender = this.$refs.gender.valid();
      const validBirthDay = this.$refs.dob.valid();
      const validPhone = this.$refs.phoneno.valid();
      const validEmail = this.$refs.email.valid();
      const validCountry = this.$refs.country.valid();
      return (
        validName && validGender && validBirthDay &&
        validPhone && validEmail && validCountry
      );
    },
    onSubmit() {
      if (this.validateAll()) {
        this.submitRequest();
        console.log('VALID');
      } else {
        this.$showAlert('Some provided info are invalid. Please check!');
      }
    },
    async submitRequest() {
      try {
        const requestData = {
          ...this.profile,
          MemberID: this.memberId,
        };
        console.log(JSON.stringify(requestData));
        const response = await updateMemberProfile(requestData);
        console.log('response', response);
        if (response) {
          if (response.Message) {
            this.onRequestFail(response.Message);
          } else {
            this.onRequestSuccess(response.Status);
          }
        } else {
          this.onRequestFail();
        }
      } catch (error) {
        this.onRequestFail(error.message);
      }
    },
    onRequestFail(msg = '') {
      this.$showConfirm({
          message: msg || 'Something went wrong, please try again later!',
        }).then(result => {
          if (result) {
            console.log('response to err: ', result);
          }
        });
    },
    onRequestSuccess(msg = '') {
      this.$showAlert(msg || 'Update profile successfully!', 2);
    },
  },
  mounted() {
    console.log('countryOptions', JSON.stringify(this.countryOptions));
    this.loadMemberProfile();
  },
};
</script>

<style scoped>
</style>
