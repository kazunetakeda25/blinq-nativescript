export const state = {
  payment: {
    status: '',
    orderId: '',
  },
  cartItems: [],
  cart: {
    MemberID: null,
    CurrencyCode: null,
    CurrencyExchangeRate: null,
    Stage: null,
    CartData: {
      Items: [
        // {
        //   ProductID: '51',
        //   CombinationID: '133',
        //   Quantity: '1'
        // },
      ],
      GuestInfo: {
        Name: '',
        Email: '',
        MobileNo: '',
      },
      GuestAddress: {
        Title: '',
        Street: '',
        City: '',
        Postcode: '',
        StateID: '',
        CountryID: '',
      },
      DeliveryAddressID: '',
      BillingAddressID: '',
      CustomerRemarks: '',
      DeliveryMethodID: '',
      PaymentMethodCode: '',
    },
    PromoCode: '',
  },
};
