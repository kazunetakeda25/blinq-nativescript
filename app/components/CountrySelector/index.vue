<template>
  <StackLayout orientation="horizontal" @tap="showCountriesModal">
    <Image :width="width" :height="height" :src="itemSelected && itemSelected.ImageURLThumb || ''" stretch="aspectFit"/>
    <Label v-if="isShowLabel" :color="textColor" marginLeft="5" class="name-display selected-option-text" :text="itemSelected.Name" />
    <Image width="10" height="7" marginLeft="5" src="~/assets/images/arrow_downwards.png" stretch="aspectFit"/>
  </StackLayout>
</template>

<script>
import CountriesModal from "./modal"
import { isArray } from 'util';
export default {
  props: {
    width: Number,
    height: Number,
    textColor: String,
    itemSelect: String,
    dataList: Array,
    isShowLabel: Boolean
  },
  data() {
    return {
    }
  },
  computed: {
    itemSelected() {
      if (!this.dataList || !isArray(this.dataList)) {
        return ""
      }
      return this.dataList.find(e => e.Alpha2Code.toLowerCase() === this.itemSelect.toLowerCase()) || this.dataList[0]
    }
  },
  methods: {
    showCountriesModal() {
      this.$showModal(CountriesModal, {
        props: {
          data: this.dataList,
          isSearching: false,
          itemSelected: this.itemSelected
        }
      }).then(item => this.$emit('onChangedItemSelect', item.Alpha2Code))
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

