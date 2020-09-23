<template>
  <PageContainer :title="addressId ? 'EDIT ADDRESS' : 'ADD ADDRESS'">

    <StackLayout width="100%" padding="0,10">

      <FlexboxLayout marginBottom="20" padding="0" flexDirection="column">
        <Label textWrap="true" text="Save your address today, along with the corresponding contact information, for easier management in the future!" class="common-section-content" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" flexDirection="column">
        <InputText ref="title" label="title" :required="true" v-model="addressDetail.Title" />
        <InputText ref="street" label="street" :required="true" v-model="addressDetail.Street" />
        <InputText ref="city" label="city" :required="true" v-model="addressDetail.City" />
        <InputText ref="postCode" label="post code" type="number" :required="true" v-model="addressDetail.Postcode" />
        <StackLayout width="100%">
          <InputSelect ref="country" label="country" :required="true" v-model="addressDetail.CountryID" :options="countryOptions" />
        </StackLayout>
        <StackLayout width="100%">
          <InputSelect ref="state" label="state" :required="true" v-model="addressDetail.StateID" :options="stateOptions" />
        </StackLayout>
      </FlexboxLayout>

      <FlexboxLayout marginBottom="200" height="auto" width="100%" flexDirection="column" alignItems="center">
        <StackLayout height="auto" width="auto" horizontalAlignment="center">
          <RoundButton :width="150" :pink="true" text="SAVE" @onTap="onSave" />
        </StackLayout>
      </FlexboxLayout>

    </StackLayout>
  </PageContainer>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { GETTERS as APP_GETTERS } from '~/store';
import { ACTIONS, GETTERS, MUTATORS } from '~/store/member';
import { GETTERS as MENU_GETTERS } from '~/store/menu';
import { getMemberAddressDetail, saveMemberAddress, getOptionStates } from '~/services';
import RoundButton from '~/components/Button/RoundButton';
import InputText from '~/components/Input/InputText';
import InputSelect from '~/components/Input/InputSelect';
import PageContainer from '../PageContainer';
export default {
  props: ['addressId'],
  components: {
    PageContainer,
    RoundButton,
    InputText,
    InputSelect,
  },
  data() {
    return {
      states: [],
      addressDetail: {
        Title: '',
        Street: '',
        City: '',
        Postcode: '',
        StateID: '',
        CountryID: '',
      },
      defaultOption: {
        Code: '',
        Name: 'Select One',
      },
    };
  },
  watch: {
    'addressDetail.CountryID'(countryID) {
      this.loadStates(countryID);
    },
  },
  computed: {
    ...mapGetters({
      isLoading: APP_GETTERS.PROCESSING,
      memberId: GETTERS.MEMBER_ID,
      countries: MENU_GETTERS.DROPDOWN_COUNTRIES,
      selectedCountry: MENU_GETTERS.SELECTED_COUNTRY,
      addressList: GETTERS.ADDRESSES,
    }),
    countryOptions() {
      return [
        this.defaultOption,
        ...this.countries.map((country) => ({
          Code: country.ID,
          Name: country.Name,
        })),
      ];
    },
    stateOptions() {
      const { CountryID } = this.addressDetail;
      return [
        this.defaultOption,
        ...this.states
        .filter((state) => (CountryID && CountryID === state.CountryID))
        .map((state) => ({
          Code: state.ID,
          Name: state.Name,
        })),
      ];
    },
  },
  methods: {
    ...mapActions({
      loadAddressList: ACTIONS.LOAD_ADDRESSES,
    }),
    ...mapMutations({
      updateAddressChangeStack: MUTATORS.ADDRESS_CHANGED,
    }),
    async loadStates(countryID) {
      try {
        this.states = await getOptionStates(countryID);
      } catch (error) {
        this.states = [];
      }
      const { StateID } = this.addressDetail;
      const state = this.states.find((s) => StateID === s.ID);
      if (!state) {
        this.addressDetail.StateID = '';
      }
    },
    async loadAddressDetail() {
      try {
        const response = await getMemberAddressDetail(this.memberId, this.addressId);
        await this.loadStates(response.CountryID);
        this.addressDetail.Title = response.Title;
        this.addressDetail.Street = response.Street;
        this.addressDetail.City = response.City;
        this.addressDetail.Postcode = response.Postcode;
        this.addressDetail.StateID = response.StateID;
        this.addressDetail.CountryID = response.CountryID;
      } catch (error) {
        console.log(error);
      }
    },
    validateAll() {
      const validTitle = this.$refs.title.valid();
      const validStreet = this.$refs.street.valid();
      const validCity = this.$refs.city.valid();
      const validPostcode = this.$refs.postCode.valid();
      const validStateID = this.$refs.state.valid();
      const validCountryID = this.$refs.country.valid();
      return validTitle && validStreet && validCity &&
        validPostcode && validStateID && validCountryID;
    },
    async onSave() {
      if (this.validateAll()) {
        try {
          const requestData = {
            ...this.addressDetail,
            MemberAddressID: this.addressId,
          };
          console.log(JSON.stringify(requestData));
          const response = await saveMemberAddress(this.memberId, requestData);
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
      } else {
        this.$showAlert('Some provided info are invalid. Please check!');
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
      this.$showAlert(msg || 'Your address is saved.', 2).then(() => {
        this.loadAddressList(this.memberId);
        this.updateAddressChangeStack();
        this.$navigateBack();
      });
    },
  },
  mounted() {
    console.log('options', JSON.stringify(this.countries), JSON.stringify(this.states), JSON.stringify(this.selectedCountry));
    if (this.addressId) {
      this.loadAddressDetail();
    } else if (this.selectedCountry) {
      const country = this.countries.find((c) => c.Alpha2Code === this.selectedCountry);
      if (country) {
        this.addressDetail.CountryID = country.ID;
      }
    }
  },
};
</script>

<style scoped>
</style>
