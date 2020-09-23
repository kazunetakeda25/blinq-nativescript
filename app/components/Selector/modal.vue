<template>
  <ModalBackdrop @onTap="$modal.close()">
    <StackLayout :left="$responsiveUI.scale(75)" :top="$responsiveUI.verticalScale(166.75)" class="modal-content" height="auto">
      <Label v-if="message" :color="$colors.FONT_DEFAULT" :text="message" width="100%" textWrap="true" textAlignment="center" />
      <StackLayout width="100%" :height="maxHeight">
        <ListView class="data-display" ~listview for="(item, index) in items" @itemTap="onItemTap($event)" separatorColor="transparent">
          <v-template>
            <!-- Shows the list item label in the default color and style. -->
            <StackLayout :class="`item-display ${ index + 1 === totalCount ? 'item-display-last' : '' }`" orientation="horizontal">
              <FlexboxLayout class="name-container" alignItems="center">
                <Label class="name-display select-option-text" :text="item.Name" width="100%" :textAlignment="center ? 'center' : 'left'" verticalAlignment="center"/>
              </FlexboxLayout>
            </StackLayout>
          </v-template>
        </ListView>
      </StackLayout>
    </StackLayout>
  </ModalBackdrop>
</template>

<script>
import ModalBackdrop from '../ModalBackdrop';
export default {
  components: {
    ModalBackdrop,
  },
  props: {
    message: String,
    options: Array,
    isSearching: Boolean,
    selectedItem: Object,
    center: Boolean,
  },
  data() {
    return {
      searchText: "",
      items: this.options,
      totalCount: this.options.length,
      currentSelected: this.selectedItem,
    };
  },
  computed: {
    maxHeight() {
      return (this.options.length > 5 ? 5 : this.options.length) * 40 + 5;
    },
  },
  methods: {
    onItemTap(event) {
      console.log("EVENT ITEM TAP: ", JSON.stringify(event.item));
      this.$modal.close(event.item);
    }
  },
}
</script>

<style scoped>
  .modal-page {
    background-color: transparent;
  }
  .modal-content {
    background-color: white;
    width: 60%;
    border-radius: 5%;
    padding: 10;
  }
  .data-display {
    height: 100%;
    width: 100%;
  }
  .item-display {
    padding: 2;
    margin: 2;
    border-bottom-style: solid;
    border-bottom-width: 1;
    border-bottom-color: #e1e1e1;
  }
  .item-display.item-display-last {
    border-bottom-color: white;
  }
  .input-search {
    border-width: 0;
    border-bottom-color: transparent;
  }
  .img-display {
    width: 50;
    height: 35;
  }
  .name-container {
    height: 35;
  }
  .name-display {
    color: black;
  }
</style>

