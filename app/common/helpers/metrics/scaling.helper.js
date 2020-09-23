const platformModule = require("tns-core-modules/platform");

const {
  widthPixels,
  heightPixels,
  heightDIPs,
  widthDIPs,
} = platformModule.screen.mainScreen

const width = platformModule.isIOS ? widthDIPs : widthPixels
const height = platformModule.isIOS ? heightDIPs : heightPixels

const screenWidth = width <= height ? width : height
const screenHeight = height > width ? height : width

const refit = platformModule.isIOS ? 1 : platformModule.screen.mainScreen.scale

// Guideline sizes are based on standard iphone X screen mobile device
const guidelineBaseWidth = 375
const guidelineBaseHeight = 667

const scale = (size) => (screenWidth / guidelineBaseWidth) / refit * size
const verticalScale = (size) => (screenHeight / guidelineBaseHeight) / refit * size
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor
const getStatusBarHeight = () => StatusBar.currentHeight || 0

const deviceWidth = scale(guidelineBaseWidth);
const deviceHeight = verticalScale(guidelineBaseHeight);

export {
  scale,
  verticalScale,
  moderateScale,
  getStatusBarHeight,
  deviceWidth,
  deviceHeight,
}
