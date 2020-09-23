<template>
  <FlexboxLayout flexDirection="column" paddingBottom="40">
    <PageTitle title="CHECKOUT" />

    <StackLayout width="100%" padding="10 10 10 10">
      <UserTypeCard text="Checkout as Member" @onSelect="$goToScreen('member-login')" />
    </StackLayout>

    <StackLayout width="100%" padding="0 10 10 10">
      <UserTypeCard text="Checkout as Guest" @onSelect="goToGuestAddr" />
    </StackLayout>

  </FlexboxLayout>
</template>

<script>
import PageTitle from '~/components/PageTitle';
import UserTypeCard from './userTypeCard';
export default {
  props: {
  },
  components: {
    PageTitle,
    UserTypeCard,
  },
  data() {
    return {
      // no API to call
      stage: 'user-type',
    };
  },
  computed: {
  },
  methods: {
    goToMemberAddr() {
      this.$emit('goMember');
    },
    goToGuestAddr() {
      this.$emit('goNext');
    },
  },
};
</script>

<style lang="scss" scoped></style>
