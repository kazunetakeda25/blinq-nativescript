<template>
  <StackLayout orientation="horizontal" @tap="showCountriesModal">
    <Image v-if="isShowImage" class="img-display" :src="itemSelected.ImageURLThumb || ''" stretch="aspectFit"/>
    <FlexboxLayout class="name-container" alignItems="center">
      <Label v-if="isShowLabel" :color="textColor" class="font-roboto-medium" :minWidth="$responsiveUI.scale(30)" :text="itemSelected && itemSelected.Code.toUpperCase() || ''" />
    </FlexboxLayout>
    <Image class="arrow-display" src="~/assets/images/arrow_downwards.png" stretch="aspectFit"/>
  </StackLayout>
</template>

<script>
import Modal from "./modal"
import { isArray } from 'util';
export default {
  props: {
    itemSelect: String,
    dataList: Array,
    textColor: String,
    isShowLabel: Boolean,
    isShowImage: Boolean,
  },
  data() {
    return {
    }
  },
  computed: {
    itemSelected() {
      if (!this.dataList || !isArray(this.dataList) || !this.itemSelect) {
        return ""
      }
      return this.dataList.length > 0 && this.dataList.find(e => e.Code.toLowerCase() === this.itemSelect.toLowerCase()) || this.dataList[0]
    }
  },
  methods: {
    showCountriesModal() {
      this.$showModal(Modal, {
        props: {
          data: this.dataList,
          isSearching: false,
          itemSelected: this.itemSelected
        }
      }).then(item => this.$emit('onChangedItemSelect', item.Code))
    }
  },
}
</script>

<style scoped>
  .img-display {
    width: 10;
    height: 7;
  }
  .arrow-display {
    width: 10;
    height: 7;
    margin-left: 5;
  }
</style>

