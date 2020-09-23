<template>
  <PageContainer title="ORDER DETAIL">

    <StackLayout width="100%" padding="0,10,50,10">

      <FlexboxLayout marginBottom="20" height="auto" width="100%" flexDirection="column" alignItems="center">
        <Label :text="`Placed on ${orderDetail.OrderDate || ''}`" fontSize="14" />
      </FlexboxLayout>

      <StackLayout marginBottom="15">
        <CustomerInfo :order="orderDetail" />
      </StackLayout>

      <StackLayout width="100%" paddingTop="10"
        v-for="(item, index) in items" :key="index">
        <CartItem :item="item" />
      </StackLayout>

      <OrderSummary v-if="haveItems"
        :order="orderDetail"
        :subTotal="subTotal" :total="total"
        :discounts="discounts" :shipping="shipping" />

    </StackLayout>
  </PageContainer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { GETTERS as APP_GETTERS } from '~/store';
import { ACTIONS, GETTERS } from '~/store/member';
import { getOrderDetail } from '~/services';
import RoundButton from '~/components/Button/RoundButton';
import PageContainer from '../PageContainer';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import CustomerInfo from './CustomerInfo';
export default {
  props: ['orderId'],
  components: {
    PageContainer,
    RoundButton,
    CartItem,
    OrderSummary,
    CustomerInfo,
  },
  data() {
    return {
      orderDetail: {},
      items: [],
      subTotal: '',
      total: '',
      discounts: [],
      shipping: null,
    };
  },
  watch: {
    orderDetail(order) {
      this.items = order.OrderItem || [];
      this.total = `${order.Total || 0}`;
      this.subTotal = `${order.Subtotal || 0}`;
      if (order.DeliveryMethod && order.Shipping) {
        this.shipping = {
          CarrierName: order.DeliveryMethod.Name,
          Value: `${order.Shipping}`,
        };
      } else {
        this.shipping = {
          CarrierName: '',
          Value: '',
        };
      }
      if (order.Discounts) {
        this.discounts = [
          {
            PromoCodeName: order.DiscountsDescription || 'Discount',
            Value: order.Discounts,
          },
        ];
      } else {
        this.discounts = [];
      }
    },
  },
  computed: {
    ...mapGetters({
      isLoading: APP_GETTERS.PROCESSING,
      memberId: GETTERS.MEMBER_ID,
    }),
    haveItems() {
      return !this.isLoading && !!this.items.length;
    },
    itemCount() {
      return this.items.length;
    },
  },
  methods: {
    async loadOrderDetail() {
      try {
        this.orderDetail = await getOrderDetail(this.memberId, this.orderId);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.loadOrderDetail();
  },
  beforeDestroy() {
    this.orderDetail = {};
  },
};
</script>

<style scoped>
</style>
