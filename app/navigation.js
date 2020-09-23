import ProductList from './pages/Product/List/Index';
import ProductTryMe from './pages/Product/TryMe/Index';
import MemberMyAccount from './pages/Member/Account';
import MemberForgotPassword from './pages/Member/ForgotPassword';
import MemberAddressList from './pages/Member/Address/Addresses';
import MemberAddressDetail from './pages/Member/Address/AddressDetail';
import MemberOrderHistory from './pages/Member/OrderHistory/OrderHistory';
import MemberOrderHistoryDetail from './pages/Member/OrderHistory/OrderHistoryDetail';
import HomeScreen from './pages/Home/Index';
import MemberLogin from './pages/Member/Login';
import MemberProfile from './pages/Member/Profile';
import MemberPassword from './pages/Member/Password';
import MemberRegister from './pages/Member/Register';
import MemberModelUp from './pages/Member/ModelUp';
import MemberModelEdit from './pages/Member/ModelEdit';
import CartScreen from './pages/Cart/Index';
import ProductDetail from './pages/Product/Detail/Index';
import WebPage from './pages/WebPage';
import MessageModal from './components/MessageModal';
import ConfirmModal from './components/ConfirmModal';
import YesNoConfirmModal from './components/YesNoModal';
import { MUTATORS } from '~/store/member';

export const setupNavigation = (Vue) => {
  Vue.prototype.$goToProductListScreen = function (routeId, routeData, title = '') {
    this.$navigateTo(ProductList, {
      props: {
        title,
        routeId,
        routeData,
      },
    });
  };
  Vue.prototype.$goToCartScreen = function () {
    this.$navigateTo(CartScreen);
  };
  Vue.prototype.$goToScreen = function (routeId, data) {
    console.log('TODO:NAVIGATE:', routeId);
    if (routeId === 'home') {
      this.$navigateTo(HomeScreen, { clearHistory: true });
    }
    else if (routeId === 'product-detail') {
      this.$navigateTo(ProductDetail, { props: { itemDetail: data }});
    }
    else if (routeId === 'member-login') {
      if (data) {
        this.$navigateTo(MemberLogin, { props: { forceToHome: true } });
      } else {
        this.$navigateTo(MemberLogin);
      }
    }
    else if (routeId === 'member-register') {
      this.$navigateTo(MemberRegister, { props: data || {}});
    }
    else if (routeId === 'member-forgot-password') {
      this.$navigateTo(MemberForgotPassword);
    }
    else if (routeId === 'member-my-account') {
      this.$navigateTo(MemberMyAccount);
    }
    else if (routeId === 'member-profile' || routeId === 'member-my-profile') {
      this.$navigateTo(MemberProfile);
    }
    else if (routeId === 'member-address') {
      this.$navigateTo(MemberAddressList);
    }
    else if (routeId === 'member-address-detail') {
      this.$navigateTo(MemberAddressDetail, { props: data || {}});
    }
    else if (routeId === 'member-order-history') {
      this.$navigateTo(MemberOrderHistory);
    }
    else if (routeId === 'member-order-history-detail') {
      this.$navigateTo(MemberOrderHistoryDetail, { props: data || {}});
    }
    else if (routeId === 'member-password') {
      this.$navigateTo(MemberPassword);
    }
    else if (routeId === 'member-model-up') {
      this.$navigateTo(MemberModelUp);
    }
    else if (routeId === 'member-logout') {
      this.$logOut();
    }
    else if (routeId === 'member-model-edit') {
      this.$navigateTo(MemberModelEdit);
    }
    else if (routeId === 'product-try-me') {
      this.$navigateTo(ProductTryMe, {
        props: data || {},
      });
    }
    else if (routeId === 'preloved-product-list') {
      this.$goToProductListScreen('preloved', {}, 'PreLoved');
    }
  };
  Vue.prototype.$logOut = function() {
    this.$showYesNoModal({ message: 'Are you sure you want to logout?' })
    .then((res) => {
      if (res === 'YES') {
        this.$store.commit(MUTATORS.LOGOUT);
      }
    });
  };
  Vue.prototype.$showWebView = function(url) {
    this.$navigateTo(WebPage, {
      props: { url },
    });
  };
  Vue.prototype.$showAlert = function(message, autoClose = 0) {
    return this.$showModal(MessageModal, { props: { message, autoClose } });
  };
  Vue.prototype.$showConfirm = function(props) {
    return this.$showModal(ConfirmModal, { props });
  };
  Vue.prototype.$showYesNoModal = function(props) {
    return this.$showModal(YesNoConfirmModal, { props });
  };
};
