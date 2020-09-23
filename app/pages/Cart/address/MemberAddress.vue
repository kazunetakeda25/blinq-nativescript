<template>
  <FlexboxLayout flexDirection="column" alignItems="top">
    <PageTitle title="ADDRESS INFORMATION" />

    <FlexboxLayout marginBottom="10" height="auto" width="100%" flexDirection="column" alignItems="center">
      <Label text="Step 2 of 5" fontSize="12" />
    </FlexboxLayout>

    <FlexboxLayout flexDirection="column" padding="0, 10%, 0" width="100%" alignItems="top">
      <FlexboxLayout marginBottom="20" width="100%" flexDirection="row" alignItems="top">
        <Label flexGrow="1" text="DELIVERY ADDRESS" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout flexDirection="column" width="100%" alignItems="top">
        <InputSelect ref="address" label="Choose delivery address" v-model="selectedAddressId" :options="addressOptions" />
        <Label class="font-roboto-light" color="gray" text="(This address is where the purchased items are delivered.)" fontSize="10" />

        <StackLayout v-if="selectedAddress" width="100%" marginTop="15">
          <AddressInfo :address="selectedAddress" />
        </StackLayout>

        <StackLayout v-if="selectedAddress" width="100%" marginTop="5">
          <InputCheckBox v-model="useSameAddress" label="Billing address same as delivery address" />
        </StackLayout>
      </FlexboxLayout>

      <StackLayout width="100%" marginTop="30">
        <FlexboxLayout :height="useSameAddress ? 'auto' : 0" width="100%" flexDirection="column">
          <Label flexGrow="1" text="DELIVERING TO NEW ADDRESS?" class="page-section-title"/>

          <FlexboxLayout marginTop="10" height="auto" width="100%" flexDirection="column" alignItems="center">
            <StackLayout height="auto" width="auto" horizontalAlignment="center">
              <RoundButton text="ADD ANOTHER ADDRESS" @onTap="$goToScreen('member-address-detail')" />
            </StackLayout>
          </FlexboxLayout>
        </FlexboxLayout>

        <FlexboxLayout :height="useSameAddress ? 0 : 'auto'" width="100%" flexDirection="column">
          <FlexboxLayout marginBottom="20" width="100%" flexDirection="row">
            <Label flexGrow="1" text="BILLING ADDRESS" class="page-section-title"/>
          </FlexboxLayout>

          <FlexboxLayout flexDirection="column" width="100%">
            <InputSelect ref="billingAddress" label="Choose billing address" v-model="selectedBillingAddressId" :options="addressOptions" />
            <Label class="font-roboto-light" color="gray" text="(This address is where the purchased items are delivered.)" fontSize="10" />

            <StackLayout v-if="selectedBillingAddress" width="100%" marginTop="15">
              <AddressInfo :address="selectedBillingAddress" />
            </StackLayout>
          </FlexboxLayout>
        </FlexboxLayout>

      </StackLayout>

      <FlexboxLayout marginTop="40" height="auto" width="100%" flexDirection="row">
        <Label flexGrow="1" text="CUSTOMER REMARKS" class="page-section-title"/>
      </FlexboxLayout>

      <FlexboxLayout height="auto" flexDirection="column" marginTop="10" marginBottom="20" padding="0" width="100%">
        <InputTextArea v-model="customerRemarks" hint="Write your notes here..." />
      </FlexboxLayout>

    </FlexboxLayout>

    <FlexboxLayout marginBottom="50" height="auto" width="100%" flexDirection="column" alignItems="center">
      <StackLayout height="auto" width="auto" horizontalAlignment="center">
        <RoundButton :width="120" :pink="true" text="NEXT" @onTap="goNext" />
      </StackLayout>
    </FlexboxLayout>

  </FlexboxLayout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { GETTERS, MUTATORS } from '~/store/cart';
import { GETTERS as MEMBER_GETTERS } from '~/store/member';
import { loadOrderCheckoutData } from '~/services';
import PageTitle from '~/components/PageTitle';
import RoundButton from '~/components/Button/RoundButton';
import InputTextArea from '~/components/Input/InputTextArea';
import InputSelect from '~/components/Input/InputSelect';
import InputCheckBox from '~/components/Input/InputCheckBox';
import AddressInfo from './addressInfo';
export default {
  props: {
  },
  components: {
    PageTitle,
    RoundButton,
    InputTextArea,
    InputSelect,
    InputCheckBox,
    AddressInfo,
  },
  data() {
    return {
      stage: 'address',
      customerRemarks: '',
      memberAddressOptions: [],
      selectedAddressId: '',
      useSameAddress: true,
      selectedBillingAddressId: '',
    };
  },
  computed: {
    ...mapGetters({
      cartData: GETTERS.CART_DATA,
      addressChanged: MEMBER_GETTERS.ADDRESS_CHANGE_STACK,
    }),
    addressOptions() {
      if (!this.memberAddressOptions.length) {
        const defaultOption = {
          Code: '',
          Name: 'Select an Address',
        };
        return [defaultOption];
      }
      return [
        ...this.memberAddressOptions.map(({ID, Title}) => ({ Code: ID, Name: Title })),
      ];
    },
    selectedAddress() {
      return this.memberAddressOptions.find(({ID}) => ID === this.selectedAddressId) || null;
    },
    selectedBillingAddress() {
      return this.memberAddressOptions.find(({ID}) => ID === this.selectedBillingAddressId) || null;
    },
  },
  watch: {
    memberAddressOptions() {
      console.log('memberAddressOptions');
      if (!this.selectedAddressId) {
        this.selectedAddressId = this.memberAddressOptions.length ? this.memberAddressOptions[0].ID : '';
      }
    },
    selectedAddressId(val) {
      console.log('selectedAddressId');
      if (this.useSameAddress) {
        this.selectedBillingAddressId = val;
      }
    },
    useSameAddress(val) {
      console.log('useSameAddress');
      if (val) {
        this.selectedBillingAddressId = this.selectedAddressId;
      }
    },
    addressChanged() {
      this.loadCheckoutData();
    },
  },
  methods: {
    ...mapMutations({
      updateCartData: MUTATORS.UPDATE_CART_DATA,
    }),
    async loadCheckoutData() {
      try {
        const response = await loadOrderCheckoutData(this.cartData);
        const { MemberAddressOptions } = response;
        if (response.Error) {
          this.$emit('onError', response.Error);
        }
        this.memberAddressOptions = MemberAddressOptions;
      } catch (error) {
        console.log(error);
        this.$emit('onError', { Code: 'APP_EXCEPTION' });
      }
    },
    validateAll() {
      return (
        this.selectedBillingAddressId &&
        this.selectedAddressId
      );
    },
    goNext() {
      if (this.validateAll()) {
        this.updateCartData({
          DeliveryAddressID: this.selectedAddressId,
          BillingAddressID: this.selectedBillingAddressId,
          CustomerRemarks: this.customerRemarks,
        });
        this.$emit('goNext');
      } else {
        this.$showAlert('Missing address info.');
      }
    },
  },
  mounted() {
    const { CartData } = this.cartData;
    this.useSameAddress = (CartData.DeliveryAddressID === CartData.BillingAddressID);
    this.selectedAddressId = CartData.DeliveryAddressID;
    this.selectedBillingAddressId = CartData.BillingAddressID;
    this.customerRemarks = CartData.CustomerRemarks;
    this.loadCheckoutData();
  },
};
</script>

<style lang="scss" scoped></style>
