<template>
  <Page class="page" actionBarHidden="true" :class="{ dialogOpen: dialogOpen }">
    <StackLayout
      top="0"
      left="0"
      :width="$responsiveUI.scale(375)"
      :height="$responsiveUI.verticalScale(667)"
    >
      <GridLayout>
        <CameraPlus
          debug="true"
          ref="camPlus"
          confirmPhotos="true"
          saveToGallery="true"
          showCaptureIcon="false"
          showFlashIcon="false"
          showToggleIcon="false"
          showGalleryIcon="false"
          enableVideo="false"
          @loaded="cameraLoaded()"
          @photoCapturedEvent="photoCapturedEvent($event)"
        ></CameraPlus>
        <StackLayout>
          <StackLayout height="5%" width="100%">
          </StackLayout>
          <Image :src="outlineSource" height="90%"/>
        </StackLayout>
        <AbsoluteLayout width="100%" height="100%">
          <Image
            class="capture-button"
            :left="$responsiveUI.scale(162.5)"
            :top="$responsiveUI.verticalScale(580)"
            src="~/assets/images/btn-takephoto.png"
            :width="$responsiveUI.scale(50)"
            :height="$responsiveUI.scale(50)"
            stretch="aspectFit"
            @tap="takePhoto"
          />
          <BackButton top="5" @onTap="$emit('onBack')" />
          <StackLayout
            orientation="horizontal"
            verticalAlignment="middle"
            horizontalAlignment="center"
            height="5%"
            width="100%"
          >
            <Label text="female" color="#404040" fontSize="12" verticalAlignment="center"></Label>
            <Switch checked="false" @checkedChange="onGenderSwitchChanged($event)" verticalAlignment="center" />
            <Label text="male" color="#404040" fontSize="12" verticalAlignment="center"></Label>
          </StackLayout>
        </AbsoluteLayout>
        <AbsoluteLayout class="dialog-wrapper" width="100%" height="100%">
          <StackLayout class="dialog">
            <Label class="h2" textWrap="true" text="Is this photo cool?"></Label>
            <Image :src="originalPath" :height="$responsiveUI.verticalScale(667 * 0.6)" />
            <GridLayout class="nav-bar" columns="*,*,*" width="100%">
              <Button row="0" col="0" class="btn btn-primary" text="Yes, save it!" @tap="saveThePhoto"></Button>
              <Button row="0" col="2" class="btn btn-outline" text="No" @tap="discardPhoto"></Button>
            </GridLayout>
          </StackLayout>
        </AbsoluteLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import { mapGetters } from "vuex";
import { GETTERS } from "~/store/member";
import { screen, isAndroid, isIOS } from "tns-core-modules/platform/platform";
import { Switch } from "tns-core-modules/ui/switch";
import * as applicationModule from "tns-core-modules/application/application";
import * as utilsModule from "tns-core-modules/utils/utils";
import axios from "axios";
import { Image } from "tns-core-modules/ui/image";
import { ACCOUNT } from "../../common/constants";
const imageSourceModule = require("tns-core-modules/image-source");
const BitmapFactory = require("nativescript-bitmap-factory");
import BackButton from '~/components/Button/BackButton';
import { ImageAsset } from 'tns-core-modules/image-asset';
import { hasFilePermissions, requestFilePermissions } from 'nativescript-advanced-permissions/files';
const fs = require('file-system');

export default {
  components: {
    BackButton,
  },
  data() {
    return {
      dialogOpen: false, 
      captured: false,
      isMan: false,
      originalPath: "", 
      outlineSource: "~/assets/images/img-woman-outline2.png"
    };
  },
  computed: {
    ...mapGetters({
      memberId: GETTERS.MEMBER_ID
    })
  },
  created() {},
  methods: {
    takePhoto() {
      // this.$refs.camPlus.nativeView.takePicture();
      this.photoCapturedEvent({});
    },
    onGenderSwitchChanged($event) {
        this.isMan = $event.object.checked;
        if (this.isMan == true) {
          this.outlineSource = "~/assets/images/img-man-outline2.png";
        } else {
          this.outlineSource = "~/assets/images/img-woman-outline2.png";
        }
      },
      cameraLoaded() {
        // console.log("Camera Loaded");
        this.$refs.camPlus.nativeView.cameraWidth = screen.mainScreen.widthDIPs.toFixed();
        this.$refs.camPlus.nativeView.cameraHeight = screen.mainScreen.heightDIPs.toFixed();
        // this.captured = false;
      },
      showDialog() {
        this.dialogOpen = true;
      }, 
      closeDialog() {
        this.dialogOpen = false;
      }, 
      noAction() {
      },
      saveThePhoto() {
        const img = imageSourceModule.fromFile(this.originalPath);
        const base64String = img.toBase64String("jpg");
        let instance = this;
        axios.post("https://www.blinq.fashion/api/membermodelphoto/savephoto",
          {
            PublicKey: ACCOUNT.PUBLIC_KEY, 
            Hash: ACCOUNT.HASH, 
            Timestamp: ACCOUNT.TIME_STAMP, 
            MemberID: this.memberId,
            PhotoURL: base64String
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        ).then(function(response) {
          if (response.data.ok == true)
            console.log("Successfully Sent!");
          else
            console.log("Failed");
          
          instance.originalPath = "";
          instance.dialogOpen = false;
        })
        .catch(function(error) {
          if (error == undefined)
            console.log(error);
          instance.originalPath = "";
          instance.dialogOpen = false;
        });
      }, 
      discardPhoto() {
        this.closeDialog();
      }, 
      capturePhoto() {}, 
      photoCapturedEvent($event) {

        console.log("photoCapturedEvent");
        
        let instance = this;

        // if (this.captured == true)
        //   return;

        console.log("check event");

        if ($event.data) {

          this.originalPath = "";

          if (isAndroid) {
            this.originalPath = $event.data.android;
            $event.data.options.autoScaleFactor = false;
            $event.data.options.keepAspectRatio = true;
            $event.data.options.width = screen.mainScreen.widthDIPs.toFixed();
            console.log("Android Photo Saved Path: " + this.originalPath);
            this.showDialog();
            return;
          }

          if (isIOS) {
            let documents = fs.knownFolders.documents();
            console.log('folder - ' + documents.path);
            let path = fs.path.join(documents.path, "pic.png");
            imageSourceModule.fromAsset($event.data)
            .then(imageSource => {
              imageSource.saveToFile(path, "png");
              this.originalPath = path;
              console.log("iOS Photo Saved Path: " + this.originalPath);
              this.showDialog();
              return;
            });
            console.log("Returned");
            return;
          }
        }

        console.log("no pic, ask permission");

        this.$refs.camPlus.nativeView
          .requestCameraPermissions()
          .then(() => {
            try {
              console.log("have permission, taking pic");
              
              if( !hasFilePermissions() ) {
                  requestFilePermissions().then((hasPermission) => {
                      if( hasPermission ) {
                          instance.$refs.camPlus.nativeView.takePicture({
                            width: screen.mainScreen.widthDIPs.toFixed(),
                            height: screen.mainScreen.heightDIPs.toFixed(),
                            keepAspectRatio: true,
                            saveToGallery: true
                          });

                          console.log("PhotoSaved with permission");
                          return;
                      } else {
                          console.log("File Access Failed");
                          return;
                      }
                  });
              } else {
                instance.$refs.camPlus.nativeView.takePicture({
                            width: screen.mainScreen.widthDIPs.toFixed(),
                            height: screen.mainScreen.heightDIPs.toFixed(),
                            keepAspectRatio: true,
                            saveToGallery: true
                          });
                          console.log("PhotoSaved without permission");
              }
              
              // this.captured = true;
            } catch (error) {
              console.log('got error', error);
            }
          });
      }
  }
};
</script>

<style scoped>
  Switch {
    color: #ff048c;
    background-color: #ff048c;
  }
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .dialogOpen .content,
  .dialogOpen .action-bar {
    opacity: 0.2;
  }

  .dialogOpen .dialog-wrapper {
    visibility: visible;
    animation-name: show;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

  .dialog-wrapper {
    background: rgba(0, 0, 0, 0.8);
    visibility: collapse;
    opacity: 0;
  }

  .dialog {
    background-color: white;
    width: 96%;
    margin-top: 8%;
    margin-left: 2%;
    padding: 20;
  }

  .dialog Label {
    margin: 0 15 15 15;
    font-size: 18px;
    color: black;
    text-align: center;
  }

  .dialogOpen button {
    margin-top: 10;
    background-color: #ff048c;
    color: white;
    text-transform: none;
  }
</style>
