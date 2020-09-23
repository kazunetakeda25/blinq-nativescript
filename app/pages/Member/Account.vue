<template>
  <PageContainer title="MY ACCOUNT">

    <FlexboxLayout flexDirection="column" width="100%" alignItems="top">

      <FlexboxLayout marginTop="5" marginBottom="3" padding="0, 10%" flexDirection="column">
        <Label width="100%" text="manage my order" fontSize="12" marginTop="5" marginBottom="3" padding="0 5" class="font-roboto-black" color='black'/>
      </FlexboxLayout>

      <StackLayout width="100%" padding="0 10 10 10">
        <SelectionCard text="Order History" @onSelect="$goToScreen('member-order-history')" />
      </StackLayout>

      <StackLayout width="100%" padding="0 10 10 10">
        <SelectionCard text="My Wishlist" @onSelect="$goToScreen('member-my-wishlist')" />
      </StackLayout>

      <FlexboxLayout marginTop="5" marginBottom="3" padding="0, 10%" flexDirection="column">
        <Label width="100%" text="manage my models" fontSize="12" marginTop="5" marginBottom="3" padding="0 5" class="font-roboto-black" color='black'/>
      </FlexboxLayout>

      <StackLayout width="100%" padding="0 10 10 10">
        <SelectionCard text="My Model Photos" @onSelect="$goToScreen('member-my-models')" />
      </StackLayout>

      <FlexboxLayout marginTop="5" marginBottom="3" padding="0, 10%" flexDirection="column">
        <Label width="100%" text="manage my account" fontSize="12" marginTop="5" marginBottom="3" padding="0 5" class="font-roboto-black" color='black'/>
      </FlexboxLayout>

      <StackLayout width="100%" padding="0 10 10 10">
        <SelectionCard text="My Profile" @onSelect="$goToScreen('member-my-profile')" />
      </StackLayout>

      <StackLayout width="100%" padding="0 10 10 10">
        <SelectionCard text="My Addresses" @onSelect="$goToScreen('member-address')" />
      </StackLayout>

      <StackLayout width="100%" padding="0 10 10 10">
        <SelectionCard text="Change Password" @onSelect="$goToScreen('member-password')" />
      </StackLayout>

      <!--<FlexboxLayout flexDirection="column" marginBottom="20" padding="0, 10%, 0" width="100%" alignItems="top">
        <InputText ref="name" label="name" :required="true" v-model="register.Name" />
        <InputSelect ref="gender" label="gender" :required="true" v-model="register.Gender" :options="genderOptions" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" width="100%" flexDirection="row" alignItems="top">
        <Label flexGrow="1" text="Account Details" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" padding="0, 10%, 0" width="100%" alignItems="top">
        <InputText ref="username" label="username" :required="true" v-model="register.Username" />
        <InputText ref="password" label="password" :required="true" v-model="register.Password" />
        <InputText ref="confirmpassword" label="confirm password" :required="true" v-model="register.ConfirmPassword" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" width="100%" flexDirection="row" alignItems="top">
        <Label flexGrow="1" text="Contact Details" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" padding="0, 10%, 0" width="100%" alignItems="top">
        <InputText ref="phoneno" label="phone no" :required="true" v-model="register.PhoneNo" />
        <InputText ref="email" label="email" :required="true" v-model="register.Email" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" width="100%" flexDirection="row" alignItems="top">
        <Label flexGrow="1" text="Other Details" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" padding="0, 10%, 0" width="100%" alignItems="top">
        <InputText ref="company" label="company" :required="false" v-model="register.Company" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" height="auto" width="100%" flexDirection="column" alignItems="center">
        <StackLayout height="auto" width="auto" horizontalAlignment="center">
          <RoundButton :width="120" :pink="true" text="Submit" @onTap="onRegister" />
        </StackLayout>
      </FlexboxLayout>-->

    </FlexboxLayout>
  </PageContainer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SelectionCard from './selectionCard';
import PageContainer from './PageContainer';
export default {
  props: {
  },
  components: {
    SelectionCard,
    PageContainer
  },
  watch: {
  },
  beforeMount() {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  }
};
</script>

<style scoped>
.page-title {
  text-align: center;
}
</style>
