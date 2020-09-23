<template>
  <Page actionBarHidden="true" class="bg-default">
    <AbsoluteLayout>
      <ScrollView ref="scrollView" top="0" left="0" width="100%" height="100%" class="bg-default">
        <FlexboxLayout flexDirection="column" paddingBottom="10">

          <PageTitle title="TRY ME" />

          <FlexboxLayout width="100%" flexDirection="column">
            <FlexboxLayout marginBottom="20" padding="0, 10%" justifyContent="center" alignItems="center" flexDirection="column">
              <Label textWrap="true" text="You look great!" class="common-section-content" />
            </FlexboxLayout>

            <!-- MEMBER MODEL PHOTOS -->
            <GridLayout id="modelPhoto" :columns="width" :rows="height" :width="width" :height="height">
              <Carousel ref="carousel" row="0" col="0" height="100%" width="100%" showIndicator="true"
                @pageChanged="carouselChanged" bounce="false" android:indicatorAnimation="THIN_WORM"
                verticalAlignment="top">
                <CarouselItem backgroundColor="black" verticalAlignment="middle" v-for="(photo, index) in modelPhotoList" :key="index">
                  <Image row="0" col="0" height="100%" width="auto" stretch="aspectFill" class="card-img" :src="photo.PhotoURL" />
                </CarouselItem>
              </Carousel>
              <!-- <Image row="0" col="0" :height="placeholderHeight" width="100%" stretch="aspectFit" src="~/assets/images/img-man-outline2.png"/> -->
              <AbsoluteLayout row="0" col="0" height="100%" width="100%">
                <Image :top="clothesTop" :left="clothesLeft" :width="clothesWidth" height="auto" stretch="aspectFit" :src="productOverlayPhotoImage"/>
              </AbsoluteLayout>
            </GridLayout>

          </FlexboxLayout>

        </FlexboxLayout>
      </ScrollView>

      <!-- Controls -->
      <BackButton @onTap="$navigateBack()" />
    </AbsoluteLayout>
  </Page>
</template>

<script>
const { screen, isAndroid, isIOS } = require('tns-core-modules/platform');
const { setTimeout } = require('tns-core-modules/timer');
import { mapGetters, mapActions } from "vuex";
import { GETTERS } from '~/store/member';
import { getMemberModelPhotoList } from '~/services/member';
import BackButton from '~/components/Button/BackButton';
import PageTitle from '~/components/PageTitle';

const M_RAW_WIDTH = 625;
const M_RAW_HEIGHT = 1801;

const M_M_RAW_SHOULDER_POS_Y = 328;
const M_M_RAW_SHOULDER_WIDTH = 453;
const M_M_RAW_BUTTOCKS_POS_Y = 844;
const M_M_RAW_BUTTOCKS_WIDTH = 317;

const W_M_RAW_SHOULDER_POS_Y = 333;
const W_M_RAW_SHOULDER_WIDTH = 387;
const W_M_RAW_BUTTOCKS_POS_Y = 846;
const W_M_RAW_BUTTOCKS_WIDTH = 317;

export default {
  props: ['memberModelPhoto', 'productOverlayPhoto', 'productOverlayPhotoJson'],
  components: {
    PageTitle,
    BackButton,
  },
  watch: {
    async modelPhotoList() {
      await this.$nextTick();
      this.refreshCarousel();
    },
    memberId() {
      if (this.memberId) {
        this.loadModelPhotoList();
      }
    },
  },
  beforeMount() {
  },
  data() {
    return {
      width: this.$responsiveUI.scale(375),
      height: this.$responsiveUI.verticalScale(667 * 0.75),
      currentIndex: 0,
      markerScaleFactor: 1,
      clothesTop: 0,
      clothesLeft: 0,
      clothesWidth: 0,
      placeholderHeight: 0,
      productOverlayPhotoImage: null,
      modelPhotoList: [],
    };
  },
  computed: {
    ...mapGetters({
      memberId: GETTERS.MEMBER_ID,
    }),
    haveImg() {
      return this.modelPhotoList && this.modelPhotoList.length;
    },
  },
  methods: {
    refreshCarousel() {
      if (isAndroid) {
        const adapter = this.$refs.carousel.nativeView.android.getAdapter();
        adapter && adapter.notifyDataSetChanged();
      }
      this.$refs.carousel.nativeView.refresh();
    },
    async loadModelPhotoList() {
      try {
        this.modelPhotoList = await getMemberModelPhotoList(this.memberId);
        console.log('this.modelPhotoList', JSON.stringify(this.modelPhotoList));
      } catch (err) {
        this.modelPhotoList = [];
      }
    },
    carouselChanged(args) {

    },
    adjustClothes() {
      if (this.productOverlayPhoto[0].OverlayPositionID == 1) {
        console.log("Top Clothes");
        if (this.productOverlayPhoto[0].GenderID == 1) {
          this.markerScaleFactor = this.height * 0.9 / M_RAW_HEIGHT;
          this.clothesTop = M_M_RAW_SHOULDER_POS_Y * this.markerScaleFactor + this.height / 20/* + slickImage.position().top*/;
          this.clothesWidth = M_M_RAW_SHOULDER_WIDTH * this.markerScaleFactor * this.productOverlayPhoto[0].ClothesWidth / this.productOverlayPhoto[0].ShoulderWidth;
        } else {
          this.markerScaleFactor = this.height * 0.9 / M_RAW_HEIGHT;
          this.clothesTop = W_M_RAW_SHOULDER_POS_Y * this.markerScaleFactor + this.height / 20/* + slickImage.position().top*/;
          this.clothesWidth = W_M_RAW_SHOULDER_WIDTH * this.markerScaleFactor * this.productOverlayPhoto[0].ClothesWidth / this.productOverlayPhoto[0].ShoulderWidth;
        }
      } else {
        console.log("Pants Clothes");
        if (this.productOverlayPhoto[0].GenderID == 1) {
          this.markerScaleFactor = this.height * 0.9 / M_RAW_HEIGHT;
          this.clothesTop = M_M_RAW_BUTTOCKS_POS_Y * this.markerScaleFactor + this.height / 20/* + slickImage.position().top*/;
          this.clothesWidth = M_M_RAW_BUTTOCKS_WIDTH * this.markerScaleFactor * this.productOverlayPhoto[0].ClothesWidth / this.productOverlayPhoto[0].ButtocksWidth;
        } else {
          this.markerScaleFactor = this.height * 0.9 / M_RAW_HEIGHT;
          this.clothesTop = W_M_RAW_BUTTOCKS_POS_Y * this.markerScaleFactor + this.height / 20/* + slickImage.position().top*/;
          this.clothesWidth = W_M_RAW_BUTTOCKS_WIDTH * this.markerScaleFactor * this.productOverlayPhoto[0].ClothesWidth / this.productOverlayPhoto[0].ButtocksWidth;
        }
      }

      console.log("Scale Factor: " + this.markerScaleFactor);
      console.log("Top: " + this.clothesTop);

      this.clothesLeft = (screen.mainScreen.widthDIPs - this.clothesWidth) / 2;
    },
    downloadModelPhoto() {
      if (isAndroid) {
        var ViewModule = require("ui/core/view");
        const CompressFormat = android.graphics.Bitmap.CompressFormat;
        const FileOutputStream= java.io.FileOutputStream;

        let modelPhoto = ViewModule.getViewById("modelPhoto");
        modelPhoto.android.setDrawingCacheEnabled(true);
        var myBitmap = modelPhoto.getDrawingCache();
        const absolutePath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DCIM).getAbsolutePath();
        console.log("Absolute Path: " + absolutePath);
        myBitmap.compress(CompressFormat.PNG, 100, new FileOutputStream(absolutePath + 'my-photo.png'));
      }
    }
  },
  mounted() {
    if (this.memberId) {
      this.loadModelPhotoList();
      this.productOverlayPhotoImage = "https://www.blinq.fashion" + this.productOverlayPhoto[0].OverlayImageURLTopOverlay;
      this.placeholderHeight = this.height * 0.9;
      this.adjustClothes();
    } else {
      setTimeout(() => {
        this.$goToScreen('member-login');
      })
    }
  },
  beforeDestroy() {
    this.modelPhotoList = [];
  },
};
</script>

<style scoped>
</style>
