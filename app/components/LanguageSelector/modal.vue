<template>
  <ModalBackdrop @onTap="$modal.close()">
    <StackLayout :left="$responsiveUI.scale(75)" :top="$responsiveUI.verticalScale(166.75)" class="modal-content" :height="maxHeight">
      <TextField v-if="isSearching" class="input-search" hint="Enter country..." @textChange="searchInputChanged($event)"></TextField>
      <ListView class="data-display" ~listview for="(item, index) in localData" @itemTap="onItemTap($event)" separatorColor="transparent">
        <v-template>
          <!-- Shows the list item label in the default color and style. -->
          <StackLayout :class="`item-display ${ index + 1 === totalCount ? 'item-display-last' : '' }`" orientation="horizontal">
            <FlexboxLayout class="name-container" alignItems="center">
              <Label class="name-display select-option-text" :text="item.Name" verticalAlignment="center"/>
            </FlexboxLayout>
          </StackLayout>
        </v-template>
      </ListView>
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
    data: Array,
    isSearching: Boolean,
    itemSelected: Object,
  },
  data() {
    return {
      searchText: "",
      localData: this.data,
      currentSelected: this.itemSelected,
      totalCount: this.data.length,
    };
  },
  computed: {
    maxHeight() {
      return (this.data.length > 5 ? 5 : this.data.length) * 40 + 25;
    },
  },
  methods: {
    searchInputChanged(event) {
      // this.localData = this.data.filter(e => e.name.trim().toLowerCase().includes(newText.trim().toLowerCase()))
      // this.searchText = newText;
    },
    onItemTap(event) {
      console.log("EVENT ITEM TAP: ", event.item);
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
    height: 50%;
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
    width: 100%;
    color: black;
    text-align: center;
  }
</style>

