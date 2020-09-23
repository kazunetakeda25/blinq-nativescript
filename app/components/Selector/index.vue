<template>
  <Shadow>
    <StackLayout class="selector-container" width="100%" @tap="showOptionsModal" backgroundColor="white">
      <DockLayout width="100%" stretchLastChild="true" height="30">
        <FlexboxLayout dock="right" width="30" height="30" alignItems="center" justifyContent="center">
          <Image width="20" height="20" src="~/assets/images/arrow_downwards_black.png" stretch="aspectFit" />
        </FlexboxLayout>
        <FlexboxLayout flexDirection="row" paddingLeft="10" alignItems="center">
          <Label class="name-display selected-option-text" :color="color || $colors.FONT_DEFAULT" :minWidth="$responsiveUI.scale(30)" :text="selectedDisplay" />
        </FlexboxLayout>
      </DockLayout>
    </StackLayout>
  </Shadow>
</template>

<script>
import Modal from './modal';
import { isArray } from 'util';
import Shadow from '~/components/Shadow/Thin';
export default {
  props: {
    value: String | Number,
    options: Array,
    enableOnly: Boolean,
    centerOption: Boolean,
    color: String,
  },
  components: {
    Shadow,
  },
  data() {
    return {
    }
  },
  watch: {
    options() {
      console.log('options changed', JSON.stringify(this.options));
      console.log('selectedItem', JSON.stringify(this.selectedItem));
    },
  },
  computed: {
    selectedItem() {
      if (!this.options || !isArray(this.options)) {
        return '';
      }
      if (this.options.length > 0) {
        const item = this.options.find(e => `${e.Code}` === `${this.value}`);
        return item || '';
      }
      return '';
    },
    selectedDisplay() {
      if (this.selectedItem) {
        return this.selectedItem.Name;
      }
      return '';
    },
  },
  methods: {
    showOptionsModal() {
      if (!this.enableOnly && this.options.length <= 1) {
        return;
      }
      this.$showModal(Modal, {
        props: {
          center: this.centerOption,
          options: this.options,
          selectedItem: this.selectedItem
        }
      }).then(item => this.$emit('onSelect', item.Code))
    }
  },
}
</script>

<style scoped>
</style>

