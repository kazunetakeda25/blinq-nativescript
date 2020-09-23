import Vue from 'nativescript-vue';
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue';
import {
  ModalStack,
  overrideModalViewMethod,
  VueWindowedModal
} from 'nativescript-windowed-modal';
import * as SocialShare from 'nativescript-social-share';
import NSVueShadow from 'nativescript-vue-shadow';
const utils = require('utils/utils');
const application = require('application');
import App from './pages/App';
import * as responsiveUI from './common/helpers';
import * as constants from './common/constants';
import { setContentFrame, getContentFrame } from './common/helpers/navigation.helper';
import store from './store';
import { setupNavigation } from './navigation';
import ButtonPlugin from 'nativescript-material-button/vue';
import FloatingActionButtonPlugin from 'nativescript-material-floatingactionbutton/vue';
import { CameraPlus } from '@nstudio/nativescript-camera-plus';
import Firebase from "nativescript-plugin-firebase";
setupNavigation(Vue);

overrideModalViewMethod();
Vue.registerElement('ModalStack', () => ModalStack);
Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem);

Vue.use(RadSideDrawer);
Vue.use(VueWindowedModal);
Vue.use(NSVueShadow);

Vue.config.silent = (TNS_ENV === 'production');

Vue.prototype.$socialShareURL = function (url, text, desc) {
  SocialShare.shareUrl(url, text, desc)
};
Vue.prototype.$responsiveUI = responsiveUI;
Vue.prototype.$constants = constants;
Vue.prototype.$colors = constants.COLOR;
Vue.prototype.$setContentFrame = setContentFrame;
Vue.prototype.$contentFrame = getContentFrame;

let focusedEl = null;
Vue.prototype.$setFocusedInput = function(el) {
  focusedEl = el;
};
Vue.prototype.$focusedInput = function() {
  return focusedEl;
};
Vue.prototype.$looseFocusedInput = function() {
  if (application.android) {
    utils.ad.dismissSoftInput();
  }
};
// Modified on 8/21/2019
Vue.registerElement('CameraPlus', () => CameraPlus);
Vue.registerElement('Ripple', () => require('nativescript-ripple').Ripple);

Vue.use(ButtonPlugin);
Vue.use(FloatingActionButtonPlugin);
// Modified on 8/21/2019
const setUpIOSKeyboardManager = () => {
  if (application.ios) {
    const iqKeyboard = IQKeyboardManager.sharedManager();
    iqKeyboard.shouldResignOnTouchOutside = true;
  }
};

setUpIOSKeyboardManager();

// Setup Firebase plugin

Firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
  function () {
    console.log("firebase.init done");
  },
  function (error) {
    console.log("firebase.init error: " + error);
  }
);

Vue.prototype.$firebaseSDK = Firebase;

new Vue({
  store,
  render(h) {
    return h(App);
  }
}).$start();
