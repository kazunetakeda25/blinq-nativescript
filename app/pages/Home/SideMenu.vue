<template>
  <StackLayout ref="menu-container" width="100%">
    <FlexboxLayout
      ref="item-container"
      flexDirection="column"
      paddingBottom="20"
      v-if="menuData.Catalog && menuData.Catalog.Target"
    >
      <FlexboxLayout
        flexDirection="column"
        v-for="(target, index) in menuData.Catalog.Target"
        :key="index"
      >
        <Label
          class="drawer-header"
          :text="$responsiveUI.toUpperCase(target.Label)"
          @tap="onClickedTargetHeader(target)"
        />
        <StackLayout :ref="`targetItem-${target.ID}`" width="100%" :height="getStatusHeight(target.ID)">
          <FlexboxLayout
            flexDirection="column"
            v-for="(brand, subIndex) in target.Brands"
            :key="subIndex"
          >
            <Label
              class="drawer-item"
              :text="brand.Name"
              @tap="toggleMenu(!isExpanded(target.ID, brand.ID), target.ID, brand.ID)"
            />
            <StackLayout :ref="`targetItem-${target.ID}-${brand.ID}`" width="100%" :height="getStatusHeight(target.ID, brand.ID)">
              <FlexboxLayout
                flexDirection="column"
                v-for="(category, subSubIndex) in brand.Categories"
                :key="subSubIndex"
              >
                <Label
                  class="drawer-sub-item"
                  :text="category.Name"
                  @tap="$goToProductListScreen(category.RouteID, {
                    targetId: target.ID,
                    brandId: brand.ID,
                    categoryId: category.ID,
                  }, category.Name)"
                />
              </FlexboxLayout>
            </StackLayout>
          </FlexboxLayout>
        </StackLayout>
      </FlexboxLayout>
    </FlexboxLayout>

    <FlexboxLayout class="profile-item-container" flexDirection="column" v-if="menuData.Member">
      <Label
        v-for="(menu, index) in menuData.Member"
        :key="index"
        class="profile-item"
        paddingBottom="5"
        :text="menu.Label"
        @tap="$goToScreen(menu.RouteID)"
      />
    </FlexboxLayout>

    <FlexboxLayout
      class="profile-item-container border"
      flexDirection="column"
      v-if="menuData.Others"
    >
      <Label
        v-for="(menu, index) in menuData.Others"
        :key="index"
        class="profile-item"
        paddingBottom="5"
        :text="menu.Label"
        @tap="$goToScreen(menu.RouteID)"
      />
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
// const { setTimeout } = require('tns-core-modules/timer');
import { Animation, Easing } from "~/common/helpers/animation";
export default {
  props: {
    menuData: Object
  },
  data() {
    return {
      expanding: {},
      animateHeight: 0
    };
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    toggleMenu(toExpand, targetId, brandId = null) {
      if (toExpand) {
        if (!brandId) {
          console.log("CLOSE TARGET");

          // this.closeExpanded();
        } else {
          console.log("CLOSE BRAND");
          // this.closeBrandExpanded();
        }
        this.expanding = {
          [targetId]: {}
        };
        if (brandId) {
          this.expanding[targetId][brandId] = true;
        }
      } else {
        if (brandId) {
          this.expanding = {
            [targetId]: {}
          };
        } else {
          this.expanding = {};
        }
      }
      // invoke animation
      // this.loadAnimateExpandOrCollapse(toExpand, targetId, brandId);

      // setTimeout(() => {
      //   const viewHeight = this.$refs['item-container'].nativeView.getMeasuredHeight();
      //   const menuHeight = this.$refs['menu-container'].nativeView.getMeasuredHeight();
      //   console.log('viewHeight', viewHeight);
      //   console.log('menuHeight', menuHeight);
      // }, 500);
    },
    onClickedTargetHeader(target) {
      if (this.shouldExpandMenu(target)) {
        this.toggleMenu(!this.isExpanded(target.ID), target.ID)
      } else {
        this.$goToScreen(target.RouteID)
      }
    },
    closeExpanded() {
      const targetExpandeds = Object.values(this.expanding);
      const targetExpanded =
        (targetExpandeds.length && targetExpandeds[0]) || null;
      if (targetExpanded) {
        const brandExpanded =
          (Object.keys(targetExpanded).length > 0 &&
            Object.keys(targetExpanded)[0]) ||
          null;
        if (brandExpanded) {
          this.loadAnimateExpandOrCollapse(
            false,
            Object.keys(this.expanding)[0],
            brandExpanded
          );
        }
        this.loadAnimateExpandOrCollapse(
          false,
          Object.keys(this.expanding)[0],
          null
        );
      }
    },
    closeBrandExpanded() {
      const targetExpandeds = Object.values(this.expanding);
      const targetExpanded =
        (targetExpandeds.length && targetExpandeds[0]) || null;
      if (targetExpanded) {
        const brandExpanded =
          (Object.keys(targetExpanded).length > 0 &&
            Object.keys(targetExpanded)[0]) ||
          null;
        if (brandExpanded) {
          this.loadAnimateExpandOrCollapse(
            false,
            Object.keys(this.expanding)[0],
            brandExpanded
          );
        }
      }
    },
    isExpanded(targetId, brandId = null) {
      if (brandId) {
        return this.expanding[targetId] && this.expanding[targetId][brandId]
          ? true
          : false;
      }
      return (this.expanding[targetId] && true) || false;
    },
    getStatusHeight(targetId, brandId = null) {
      const isExpand = this.isExpanded(targetId, brandId);
      return isExpand ? "auto" : 0;
    },
    shouldExpandMenu(targetItem) {
      return targetItem.ID && targetItem.Brands && targetItem.Brands.length > 0;
    },
    loadAnimateExpandOrCollapse(toExpand, targetId, brandId = null) {
      const targetItem = this.menuData.Catalog.Target.find(
        e => String(e.ID) === String(targetId)
      );
      let desHeight = 0;
      let desBrandHeight = 0;
      let view = this.$refs[`targetItem-${targetId}`];
      let viewBrand = null;
      if (!view) {
        return;
      }
      if (!targetId) {
        return;
      }
      if (targetItem && targetItem.Brands && targetItem.Brands.length > 0) {
        desHeight = targetItem.Brands.length * this.$responsiveUI.scale(25);
      }
      if (targetItem && brandId) {
        console.log("GET VIEW BRAND ITEM");
        const brandItem = targetItem.Brands.find(e => String(e.ID) === String(brandId));
        if (brandItem && brandItem.Categories.length > 0) {
          desBrandHeight =
            brandItem.Categories.length * this.$responsiveUI.scale(25);
        }
        viewBrand = this.$refs[`targetItem-${targetId}-${brandId}`];
      }

      if (toExpand) {
        // expand
        new Animation({
          height:
            (view[0].nativeView.height !== 0 &&
              view[0].nativeView.height !== "auto" &&
              view[0].nativeView.height) ||
            0,
          brandHeight: (viewBrand && viewBrand[0].nativeView.height) || 0
        })
          .to(
            { height: desHeight + desBrandHeight, brandHeight: desBrandHeight },
            brandId ? 300 : 500
          )
          .easing(Easing.Linear.None)
          .onUpdate(obj => {
            view[0].nativeView.height = obj.height;
            if (viewBrand) {
              viewBrand[0].nativeView.height = obj.brandHeight;
            }
          })
          .start()
          .onComplete(() => console.log("ANIMATE COMPLETED."));
      } else {
        // expand
        new Animation({
          height:
            (view[0].nativeView.height !== 0 &&
              view[0].nativeView.height !== "auto" &&
              view[0].nativeView.height) ||
            0,
          brandHeight: (viewBrand && viewBrand[0].nativeView.height) || 0
        })
          .to(
            { height: brandId ? desHeight : 0, brandHeight: 0 },
            brandId ? 300 : 500
          )
          .easing(Easing.Linear.None)
          .onUpdate(obj => {
            view[0].nativeView.height = obj.height;
            if (viewBrand) {
              viewBrand[0].nativeView.height = obj.brandHeight;
            }
          })
          .start()
          .onComplete(() => console.log("ANIMATE COMPLETED."));
      }
    }
  }
};
</script>

<style scoped>
.drawer-child {
  padding-left: 10;
  padding-right: 10;
}

.drawer-header {
  width: 80%;
  font-weight: bold;
  border-bottom-width: 1;
  border-bottom-color: #fff;
  padding: 10 0 10 0;
  margin-bottom: 5;
  color: #ffffff;
  font-size: 13;
  font-family: "Roboto", "Roboto-Black";
  font-weight: 900;
}

.drawer-item {
  padding: 3 0;
  color: #ffffff;
  font-size: 12;
  font-family: "Roboto", "Roboto-Black";
  font-weight: 900;
}

.drawer-sub-item {
  padding: 3 20;
  color: #ffffff;
  font-size: 12;
  font-family: "Roboto", "Roboto-Light";
  font-weight: 300;
}

.profile-item-container {
  padding-top: 10;
  padding-bottom: 10;
}

.profile-item-container.border {
  border-top-width: 1;
  border-top-color: #ffffff;
}

.profile-item {
  padding: 5 0;
  color: #ffffff;
  font-size: 12;
  font-family: "Roboto", "Roboto-Light";
  font-weight: 300;
}
</style>
