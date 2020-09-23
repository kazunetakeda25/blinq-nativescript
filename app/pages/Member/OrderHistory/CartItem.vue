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
          :src="item.CoverImage.ImageURLThumb"
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
            :text="item.Product.Brand.Name"
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
            :text="item.UnitPrice || item.Price"
          />
          <FlexboxLayout
            flexDirection="row"
            justifyContent="space-between"
            :width="$responsiveUI.scale(125)"
          ></FlexboxLayout>
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
  },
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped></style>
