<template>
  <PageContainer title="MODEL UP!">
    <StackLayout width="100%" padding="0,10">

      <Image src="~/assets/images/banner_model_up_intro.png" :height="$responsiveUI.scale(375/2)" width="auto" marginBottom="10"></Image>
      <Label
        text="At BlinQ, you are the model."
        color="black"
        textAlignment="center"
        marginBottom="10"
      ></Label>
      <Label
        text="Start by taking your first model photo!"
        color="black"
        textAlignment="center"
        marginBottom="20"
      ></Label>
      <!--<GridLayout rows="auto" columns="*,*,*">
        <Ripple
          row="0"
          col="1"
          rippleColor="white"
          height="80"
          width="80"
          rippleBorderRadius="50%"
          @tap="onNavigateToCamera()"
        >
          <Image src="~/assets/images/btn-takephoto.png"></Image>
        </Ripple>
        <Ripple
          row="0"
          col="2"
          rippleColor="white"
          height="40"
          width="40"
          rippleBorderRadius="50%"
          @tap="selectPicture()"
        >
          <Image src="~/assets/images/btn-gallery.png"></Image>
        </Ripple>
      </GridLayout>-->
      <StackLayout height="50" width="auto" horizontalAlignment="center">
        <RoundButton :width="120" :pink="true" text="Model Up!" @onTap="onNavigateToCamera()" />
      </StackLayout>

    </StackLayout>
  </PageContainer>
</template>

<script>
import * as imagepicker from "nativescript-imagepicker";
import { Image } from "tns-core-modules/ui/image";
import Camera from "./Camera";
const appSettings = require("tns-core-modules/application-settings");
import RoundButton from '~/components/Button/RoundButton';
import PageContainer from './PageContainer';
export default {
  components: {
    RoundButton,
    PageContainer,
  },
  data() {
    return {
      avatarImageSrc: ""
    };
  },
  created() {
    this.avatarImageSrc = appSettings.getString("avatarImageSrc", "");
  },
  methods: {
    selectPicture() {
      let context = imagepicker.create({
        mode: "single"
      });
      context.authorize()
        .then(function() {
          return context.present();
        })
        .then(selection => {
          selection.forEach(selected => {
            console.log(
              JSON.stringify(selected)
            );
            if (selected.android)
              this.avatarImageSrc =
                selected.android;
            else this.avatarImageSrc = selected.ios;
            appSettings.setString(
              "avatarImageSrc",
              this.avatarImageSrc
            );
          });
        })
        .catch(function(e) {
          console.log(
            "error in selectPicture",
            e
          );
        });
    },
    onNavigateToHome() {
      this.$navigateTo(Home, {
        animated: true,
        transition: {
          name: "slideBottom",
          duration: 300,
          curve: "easeIn"
        }
      });
    },
    onNavigateToCamera() {
      this.$navigateTo(Camera, {
        animated: true,
        transition: {
          name: "slideTop",
          duration: 300,
          curve: "easeIn"
        }
      });
    }
  }
};
</script>

<style scoped>
.page {
  background-color: white;
}

.nav-bar {
  margin-top: 40;
  height: 40;
}

.drawer-panel {
  background-image: url("~/assets/images/img-drawer-panel.png");
  background-repeat: no-repeat;
  background-position: left;
  background-size: 100% 100%;
}

.drawer-nav-item {
  color: white;
  width: 100%;
  padding: 10 0 10 25;
  text-align: left;
  background-color: transparent;
}

.drawer-nav-item-bold {
  font-weight: bold;
  color: white;
  width: 100%;
  padding: 10 0 10 25;
  text-align: left;
  background-color: transparent;
}

MDButton {
  border-width: 0.1;
  z-index: 0;
  border-color: transparent;
}
</style>
