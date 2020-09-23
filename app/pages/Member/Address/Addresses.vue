<template>
  <PageContainer title="MY ADDRESSES">

    <StackLayout width="100%" padding="0,10">

      <FlexboxLayout marginBottom="20" :height="isNoItems ? 'auto' : 0" width="100%" flexDirection="column" alignItems="center">
        <Label fontSize="12" color="black" text="No address added" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" :height="haveItems ? 'auto' : 0" flexDirection="column">
        <StackLayout width="100%" v-for="(address, index) in addressList" :key="index" marginBottom="15">
          <AddressCard :address="address"
            @onTap="$goToScreen('member-address-detail', { addressId: address.ID })"
            @onLongPress="confirmDelete(address.ID)" />
        </StackLayout>
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" height="auto" width="100%" flexDirection="column" alignItems="center">
        <StackLayout height="auto" width="auto" horizontalAlignment="center">
          <RoundButton :width="150" :pink="true" text="ADD ADDRESS" @onTap="$goToScreen('member-address-detail')" />
        </StackLayout>
      </FlexboxLayout>

    </StackLayout>
  </PageContainer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { GETTERS as APP_GETTERS } from '~/store';
import { ACTIONS, GETTERS } from '~/store/member';
import { GETTERS as MENU_GETTERS } from '~/store/menu';
import { getMemberAddressList, deleteMemberAddress } from '~/services/member';
import RoundButton from '~/components/Button/RoundButton';
import PageContainer from '../PageContainer';
import AddressCard from './AddressCard';
export default {
  props: {
  },
  components: {
    PageContainer,
    RoundButton,
    AddressCard,
  },
  watch: {
  },
  computed: {
    ...mapGetters({
      loading: APP_GETTERS.PROCESSING,
      memberId: GETTERS.MEMBER_ID,
      countries: MENU_GETTERS.DROPDOWN_COUNTRIES,
      states: MENU_GETTERS.DROPDOWN_STATES,
      selectedCountry: MENU_GETTERS.SELECTED_COUNTRY,
      addressList: GETTERS.ADDRESSES,
    }),
    countryOptions() {
      return this.countries.map((country) => ({
        Code: country.ID,
        Name: country.Name,
      }));
    },
    stateOptions() {
      return this.states.map((state) => ({
        Code: state.ID,
        Name: state.Name,
      }));
    },
    isNoItems() {
      return !this.loading && !this.addressList.length;
    },
    haveItems() {
      return !this.loading && !!this.addressList.length;
    },
  },
  methods: {
    ...mapActions({
      loadAddressList: ACTIONS.LOAD_ADDRESSES,
    }),
    confirmDelete(addressId) {
      this.$showYesNoModal({
          message: 'Are you sure you want to delete this address?',
        }).then(result => {
          console.log('response to confirm: ', result);
          if (result === 'YES') {
            this.deleteAddress(addressId);
          }
        });
    },
    async deleteAddress(addressId) {
      try {
        const response = await deleteMemberAddress(this.memberId, addressId);
        if (response && response.Status) {
          this.$showAlert(response.Status).then(() => {
            this.loadAddressList(this.memberId);
          });
        } else {
          this.$showConfirm({
            message: 'Something went wrong, please try again later!',
          });
        }
      } catch (error) {
        this.$showConfirm({
          message: 'Something went wrong, please try again later!',
        });
      }
    },
  },
  mounted() {
    this.loadAddressList(this.memberId);
  },
};
</script>

<style scoped>
</style>
