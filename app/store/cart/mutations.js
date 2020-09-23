import CONST from './const';

export const mutations = {
  [CONST._MUTATORS.ADD_TO_CART]: (state, item) => {
    const cartItems = [
      ...state.cartItems,
    ];
    const allIndexes = cartItems.map((p) => `${p.ID}|${p.CombinationID}`);
    const existingIndex = allIndexes.indexOf(`${item.ID}|${item.CombinationID}`);
    if (existingIndex > -1) {
      item.Quantity = (item.Quantity - 0) + (cartItems[existingIndex].Quantity - 0);
      cartItems[existingIndex] = item;
    } else {
      cartItems.push(item);
    }
    state.cartItems = cartItems;
  },
  [CONST._MUTATORS.SETUP_CART]: (state, cartInfo = {}) => {
    const cart = { ...state.cart };
    const cartItems = [ ...state.cartItems ];
    const {
      MemberID,
      CurrencyCode,
      CurrencyExchangeRate,
      Stage,
    } = cartInfo;
    if (MemberID) {
      cart.MemberID = MemberID;
    }
    if (CurrencyCode) {
      cart.CurrencyCode = CurrencyCode;
    }
    if (CurrencyExchangeRate) {
      cart.CurrencyExchangeRate = CurrencyExchangeRate;
    }
    if (Stage) {
      cart.Stage = Stage;
    }
    if (cartItems && cartItems.length) {
      cart.CartData.Items = cartItems.map((item) => ({
        ProductID: item.ID,
        CombinationID: item.CombinationID,
        Quantity: item.Quantity,
      }));
    }
    state.cart = {
      ...cart,
      CartData: {
        ...cart.CartData,
        Items: [ ...cart.CartData.Items ],
      },
    };
  },
  [CONST._MUTATORS.UPDATE_CART_STAGE]: (state, stage) => {
    state.cart = {
      ...state.cart,
      Stage: stage,
    };
  },
  [CONST._MUTATORS.UPDATE_CART_DATA]: (state, data) => {
    delete data.Items;
    let PromoCode = state.cart.PromoCode;
    if (data.PromoCode !== undefined && PromoCode !== data.PromoCode) {
      PromoCode = data.PromoCode;
      delete data.PromoCode;
    }
    state.cart = {
      ...state.cart,
      PromoCode,
      CartData: {
        ...state.cart.CartData,
        ...data,
      },
    };
  },
  [CONST._MUTATORS.UPDATE_CART_ITEM_QUANTITY]: (state, { ID, CombinationID, Quantity }) => {
    const cartItems = [ ...state.cartItems ];
    const cart = { ...state.cart };
    const indexOfID = cartItems.map((item) => `${item.ID}|${item.CombinationID}`).indexOf(`${ID}|${CombinationID}`);
    if (indexOfID >= 0) {
      const item = { ...cartItems[indexOfID] };
      item.Quantity = Quantity;
      cartItems[indexOfID] = { ...item };
      // update cart items
      state.cartItems = [ ...cartItems ];
      // update cart Data
      cart.CartData.Items = cartItems.map((item) => ({
        ProductID: item.ID,
        CombinationID: item.CombinationID,
        Quantity: item.Quantity,
      }));
      state.cart = {
        ...cart,
        CartData: {
          ...cart.CartData,
          Items: [ ...cart.CartData.Items ],
        },
      };
    }
  },
  [CONST._MUTATORS.UPDATE_ITEM_STOCK]: (state, items = []) => {
    const newItems = items.map((item) => {
      const cartItem = state.cartItems.find(({ID, CombinationID}) => (`${ID}|${CombinationID}` === `${item.ProductID}|${item.CombinationID}`));
      if (cartItem) {
        return {
          ...cartItem,
          Quantity: item.Quantity,
          Stock: item.Stock,
        };
      } else {
        return {
          ...item,
          ID: item.ProductID,
        };
      }
    });
    const dataItems = newItems.map((item) => ({
      ProductID: item.ID,
      CombinationID: item.CombinationID,
      Quantity: item.Quantity,
    }));
    // update cart items
    state.cartItems = [ ...newItems ];
    // update cart Data
    state.cart = {
      ...cart,
      CartData: {
        ...cart.CartData,
        Items: [ ...dataItems ],
      },
    };
  },
  [CONST._MUTATORS.REMOVE_CART_ITEM]: (state, {ID, CombinationID}) => {
    const cartItems = [ ...state.cartItems ];
    const cart = { ...state.cart };
    const indexOfID = cartItems.map((item) => `${item.ID}|${item.CombinationID}`).indexOf(`${ID}|${CombinationID}`);
    if (indexOfID >= 0) {
      cartItems.splice(indexOfID, 1);
      // update cart items
      state.cartItems = [ ...cartItems ];
      // update cart Data
      cart.CartData.Items = cartItems.map((item) => ({
        ProductID: item.ID,
        CombinationID: item.CombinationID,
        Quantity: item.Quantity,
      }));
      state.cart = {
        ...cart,
        CartData: {
          ...cart.CartData,
          Items: [ ...cart.CartData.Items ],
        },
      };
    }
  },
  [CONST._MUTATORS.CLEAR_SHOPPING_CART]: (state) => {
    // update cart items
    if (state.cartItems.length) {
      state.cartItems = [];
    }
    // update cart Data
    state.cart = {
      ...state.cart,
      CartData: {
        ...state.cart.CartData,
        Items: [],
      },
    };
    // clear payment status data
    state.payment = {
      status: '',
      orderId: '',
    };
  },
  [CONST._MUTATORS.SET_PAYMENT_RESPONSE]: (state, { status, orderId }) => {
    state.payment = {
      status,
      orderId,
    };
  },
  [CONST._MUTATORS.CLEAR_PAYMENT_DATA]: (state) => {
    state.payment = {
      status: '',
      orderId: '',
    };
  },
};
