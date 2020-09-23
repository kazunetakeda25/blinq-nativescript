<template>
  <FlexboxLayout flexDirection="column" paddingBottom="10" alignItems="top">
    <PageTitle title="GUEST INFORMATION" />

    <FlexboxLayout marginBottom="10" height="auto" width="100%" flexDirection="column" alignItems="center">
      <Label text="Step 2 of 5" fontSize="12" />
    </FlexboxLayout>

    <FlexboxLayout flexDirection="column" padding="0, 10%, 40" width="100%" alignItems="top">
      <FlexboxLayout marginBottom="20" width="100%" flexDirection="row" alignItems="top">
        <Label flexGrow="1" text="CONTACT DETAILS" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" padding="0, 10%, 0" width="100%" alignItems="top">
        <InputText ref="name" label="name" :required="true" v-model="contact.Name" />
        <InputText ref="email" label="email" type="email" :required="true" v-model="contact.Email" hint="(e.g. your.name@domain.com)" />
        <InputText ref="mobile" label="mobile no" type="number" :required="true" v-model="contact.MobileNo" hint="(e.g. 65XXXXXXXX)" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" width="100%" flexDirection="row" alignItems="top">
        <Label flexGrow="1" text="DELIVERY ADDRESS" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" padding="0, 10%, 0" width="100%" alignItems="top">
        <InputText ref="title" label="title" :required="true" v-model="delivery.Title" />
        <InputText ref="street" label="street" :required="true" v-model="delivery.Street" />
        <InputText ref="city" label="city" :required="true" v-model="delivery.City" />
        <InputText ref="postcode" label="postcode" :required="true" v-model="delivery.Postcode" />
        <InputSelect ref="country" label="country" :required="true" v-model="delivery.CountryID" :options="countryOptions" />
        <InputSelect ref="state" label="state" :required="true" v-model="delivery.StateID" :options="stateOptions" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="10" width="100%" flexDirection="row" alignItems="top">
        <Label flexGrow="1" text="CUSTOMER REMARKS" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" marginBottom="20" padding="0, 10%, 0" width="100%" alignItems="top">
        <InputTextArea v-model="customerRemarks" hint="Write your notes here..." />
      </FlexboxLayout>

    </FlexboxLayout>

    <FlexboxLayout marginBottom="200" height="auto" width="100%" flexDirection="column" alignItems="center">
      <StackLayout height="auto" width="auto" horizontalAlignment="center">
        <RoundButton :width="120" :pink="true" text="NEXT" @onTap="goNext" />
      </StackLayout>
    </FlexboxLayout>

  </FlexboxLayout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
const timer = require('tns-core-modules/timer');
import { GETTERS, MUTATORS } from '~/store/cart';
import { loadOrderCheckoutData } from '~/services';
import PageTitle from '~/components/PageTitle';
import RoundButton from '~/components/Button/RoundButton';
import InputText from '~/components/Input/InputText';
import InputTextArea from '~/components/Input/InputTextArea';
import InputSelect from '~/components/Input/InputSelect';
export default {
  props: {
  },
  components: {
    PageTitle,
    RoundButton,
    InputText,
    InputTextArea,
    InputSelect,
  },
  data() {
    return {
      stage: 'guest-address',
      countries: [],
      states: [],
      contact: {
        Name: '',
        Email: '',
        MobileNo: '',
      },
      delivery: {
        Title: '',
        Street: '',
        City: '',
        Postcode: '',
        CountryID: '',
        StateID: '',
      },
      customerRemarks: '',
      canStateChange: false,
    };
  },
  computed: {
    ...mapGetters({
      currentStage: GETTERS.CHECKOUT_STAGE,
      cartData: GETTERS.CART_DATA,
    }),
    countryOptions() {
      const defaultOption = {
        Code: '',
        Name: 'Select One',
      };
      return [
        defaultOption,
        ...this.countries.map(({ID, Name}) => ({ Code: ID, Name })),
      ];
    },
    stateOptions() {
      const defaultOption = {
        Code: '',
        Name: 'Select One',
      };
      return [
        defaultOption,
        ...this.states.filter(({CountryID}) => this.delivery.CountryID === CountryID).map(({ID, Name}) => ({ Code: ID, Name })),
      ];
    },
  },
  watch: {
    'delivery.CountryID'() {
      if (this.canStateChange) {
        this.delivery.StateID = '';
      }
    },
  },
  methods: {
    ...mapMutations({
      setStage: MUTATORS.UPDATE_CART_STAGE,
      updateCartData: MUTATORS.UPDATE_CART_DATA,
    }),
    async loadCheckoutData() {
      try {
        const response = await loadOrderCheckoutData(this.cartData);
        const { Country, State } = response;
        if (response.Error) {
          this.$emit('onError', response.Error);
        }
        this.countries = Object.values(Country);
        this.states = Object.values(State);
      } catch (error) {
        console.log(error);
        this.$emit('onError', { Code: 'APP_EXCEPTION' });
      }
    },
    validateAll() {
      return (
        this.$refs.name.valid() &&
        this.$refs.email.valid() &&
        this.$refs.mobile.valid() &&
        this.$refs.title.valid() &&
        this.$refs.street.valid() &&
        this.$refs.city.valid() &&
        this.$refs.postcode.valid() &&
        this.$refs.country.valid() &&
        this.$refs.state.valid()
      );
    },
    goNext() {
      if (this.validateAll()) {
        this.updateCartData({
          GuestInfo: this.contact,
          GuestAddress: this.delivery,
          CustomerRemarks: this.customerRemarks,
        });
        this.$emit('goNext');
      } else {
        this.$showAlert('Please provide all required info.');
      }
    },
  },
  mounted() {
    this.setStage(this.stage);
    const { CartData } = this.cartData;
    this.contact = {
      ...CartData.GuestInfo,
    };
    this.delivery = {
      ...CartData.GuestAddress,
    };
    this.customerRemarks = CartData.CustomerRemarks,
    timer.setTimeout(() => {
      this.canStateChange = true;
    }, 1000);
    this.loadCheckoutData();
  },
};
</script>

<style lang="scss" scoped></style>
