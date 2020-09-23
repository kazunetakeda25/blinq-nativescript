<template>
  <Shadow>
    <FlexboxLayout backgroundColor="white" flexDirection="row" padding="5,10,10">
      <FlexboxLayout
        horizontalAlignment="left"
        :width="imgWidth"
        :height="100"
        paddingRight="10"
        flexDirection="column" alignItems="center"
      >
        <Image
          marginTop="5"
          width="100%"
          stretch="aspectFill"
          :src="item.ProductImage"
        />
      </FlexboxLayout>
      <FlexboxLayout horizontalAlignment="right" :width="infoWidth" flexDirection="column">
        <FlexboxLayout
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
          flexGrow="1"
        >
          <Label
            class="font-roboto-black"
            :fontSize="12"
            :text="item.Brand"
            :color="$colors.FONT_DEFAULT"
          />
          <StackLayout orientation="horizontal">
            <Label :color="$colors.FONT_DEFAULT">
              <FormattedString>
                <Span
                  text="x"
                  class="font-roboto-light"
                  :fontSize="14"
                />
                <Span
                  :text="item.Quantity"
                  class="font-roboto-black"
                  :fontSize="18"
                />
              </FormattedString>
            </Label>
          </StackLayout>
        </FlexboxLayout>
        <Label
          class="font-roboto-light"
          :color="$colors.FONT_DEFAULT"
          :text="$responsiveUI.toUpperCase(item.Name)"
          :fontSize="15"
        />
        <FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center">
          <Label
            class="font-roboto-light"
            color="grey"
            :fontSize="10"
            :text="item.Description"
          />
          <Label
            class="font-roboto-black"
            :color="$colors.FONT_DEFAULT"
            :fontSize="14"
            :text="item.Price"
          />
        </FlexboxLayout>
        <FlexboxLayout
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
          :marginTop="5"
        >
          <Label
            class="font-roboto-light"
            :color="$colors.FONT_DEFAULT"
            :fontSize="13"
            :text="item.UnitPrice"
          />
          <FlexboxLayout
            flexDirection="row"
            justifyContent="space-between"
            :width="$responsiveUI.scale(125)"
          >
            <FlexboxLayout
              v-if="editable"
              @tap="updateQuantity"
              class="bg-grey"
              justifyContent="center"
              alignItems="center"
              :borderRadius="$responsiveUI.scale(12.5)"
              :width="$responsiveUI.scale(60)"
              :height="$responsiveUI.scale(25)"
            >
              <Label
                text="edit"
                class="font-roboto-light"
                :color="$colors.FONT_BTN_GREY"
                :fontSize="$responsiveUI.moderateScale(11)"
              />
            </FlexboxLayout>
            <FlexboxLayout
              v-if="editable"
              @tap="removeItemCart"
              class="bg-grey"
              justifyContent="center"
              alignItems="center"
              :borderRadius="$responsiveUI.scale(12.5)"
              :width="$responsiveUI.scale(60)"
              :height="$responsiveUI.scale(25)"
            >
              <Label
                text="remove"
                class="font-roboto-light"
                :color="$colors.FONT_BTN_GREY"
                :fontSize="$responsiveUI.moderateScale(11)"
              />
            </FlexboxLayout>
          </FlexboxLayout>
        </FlexboxLayout>
      </FlexboxLayout>
    </FlexboxLayout>
  </Shadow>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { MUTATORS } from "~/store/cart";
import Modal from "~/components/Selector/modal";
import Shadow from '~/components/Shadow/Regular';
export default {
  props: {
    item: Object,
    editable: Boolean,
  },
  components: {
    Shadow,
  },
  computed: {
    imgWidth() {
      return (this.$responsiveUI.deviceWidth - 40) / 4;
    },
    infoWidth() {
      return (this.$responsiveUI.deviceWidth - 40) / 4 * 3 - 5;
    },
    itemQuantity() {
      return (this.item.Quantity - 0);
    },
    stockAvailable() {
      const stock = (this.item.Stock - 0);
      const listOptions = [];
      for (let index = 1; index <= stock; index++) {
        listOptions.push({
          Code: index,
          Name: index,
        });
      }
      return listOptions;
    },
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapMutations({
      removeCartItem: MUTATORS.REMOVE_CART_ITEM,
      updateCartItemQuantity: MUTATORS.UPDATE_CART_ITEM_QUANTITY
    }),
    updateQuantity() {
      console.log("UPDATE QUANTITY");
      this.$showModal(Modal, {
        props: {
          message: 'How many would you like to purchase?',
          center: true,
          options: this.stockAvailable,
          selectedItem:
            this.stockAvailable.find(e => e.Code === this.itemQuantity) || ""
        }
      }).then((selected) => {
        if ((selected.Code - 0) !== (this.itemQuantity - 0)) {
          this.updateCartItemQuantity({
            ID: this.item.ProductID,
            CombinationID: this.item.CombinationID,
            Quantity: selected.Code,
          });
        }
      });
    },
    removeItemCart() {
      this.removeCartItem({ ID: this.item.ProductID, CombinationID: this.item.CombinationID});
    }
  },
  mounted() {
    console.log("ITEM DATA: ", this.item.Quantity);
  }
};
</script>

<style lang="scss" scoped></style>
