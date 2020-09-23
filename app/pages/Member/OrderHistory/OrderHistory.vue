<template>
  <PageContainer title="ORDER HISTORY" @onScroll="onScroll">

    <StackLayout width="100%" padding="0,10">

      <FlexboxLayout marginBottom="20" :height="isNoItems ? 'auto' : 0" width="100%" flexDirection="column" alignItems="center">
        <Label fontSize="12" color="black" text="No order" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" :height="haveItems ? 'auto' : 0" width="100%" flexDirection="column" alignItems="center">
        <Label fontSize="14" color="black" :text="`Total results: ${orders.length}`" />
      </FlexboxLayout>

      <FlexboxLayout marginBottom="20" :height="haveItems ? 'auto' : 0" flexDirection="column">
        <StackLayout width="100%" v-for="(order, index) in orders" :key="index" marginBottom="15">
          <OrderHistoryCard :order="order"
            @onTap="$goToScreen('member-order-history-detail', { orderId: order.ID })"
            @onLongPress="confirmDelete(address.ID)" />
        </StackLayout>
      </FlexboxLayout>

    </StackLayout>
  </PageContainer>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { GETTERS as APP_GETTERS, MUTATORS } from '~/store';
import { ACTIONS, GETTERS } from '~/store/member';
import RoundButton from '~/components/Button/RoundButton';
import PageContainer from '../PageContainer';
import OrderHistoryCard from './OrderHistoryCard';
const { setTimeout } = require('timer');
export default {
  props: {
  },
  components: {
    PageContainer,
    RoundButton,
    OrderHistoryCard,
  },
  watch: {
  },
  data() {
    return {
      page: 1,
      perPage: 8,
    };
  },
  computed: {
    ...mapGetters({
      loading: APP_GETTERS.PROCESSING,
      memberId: GETTERS.MEMBER_ID,
      orders: GETTERS.ORDER_HISTORY_LIST,
    }),
    isNoItems() {
      return !this.loading && !this.orders.length;
    },
    haveItems() {
      return !this.loading && !!this.orders.length;
    },
  },
  methods: {
    ...mapActions({
      loadOrders: ACTIONS.LOAD_ORDER_HISTORY_LIST,
    }),
    ...mapMutations({
      showLoading: MUTATORS.ADD_PROCESSING,
      hideLoading: MUTATORS.REMOVE_PROCESSING,
    }),
    onScroll(event) {
      // if (!this.loading && event.lastY < event.currentY && (event.scrollableHeight - event.currentY) < 100) {
      //   if (this.page * this.perPage < this.orders.length) {
      //     this.loadMore();
      //   }
      // }
    },
    loadMore() {
      this.showLoading();
      this.page += 1;
      setTimeout(() => {
        this.hideLoading();
      }, 2000);
    },
  },
  mounted() {
    this.page = 1;
    this.loadOrders(this.memberId);
  },
};
</script>

<style scoped>
</style>
