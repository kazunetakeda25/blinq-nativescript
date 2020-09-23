<template>
  <FlexboxLayout flexWrap="wrap" class="bg-default">
    <StackLayout
      width="33%"
      padding="10"
      v-for="(brand, index) in items"
      :key="index"
    >
      <Shadow borderRadius="50%">
        <StackLayout width="100%" borderRadius="50%" backgroundColor="white">
          <Image
            backgroundColor="white"
            horizontalAlignment="center"
            width="100%"
            borderRadius="50%"
            :src="brand.ImageURLCover"
            @tap="$goToProductListScreen('product-brand-product-list', {
              brandId: brand.ID,
            }, brand.Name)"
          />
        </StackLayout>
      </Shadow>
    </StackLayout>
  </FlexboxLayout>
</template>

<script>
import Shadow from '~/components/Shadow/Thin';
export default {
  components: {
    Shadow,
  },
  props: {
    brands: Array,
    random: Boolean,
    limit: Number,
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
  },
  watch: {
    brands() {
      this.items = this.getItems();
    console.log('items', this.items);
    },
  },
  beforeMount() {
  },
  mounted() {
    this.items = this.getItems();
  },
  methods: {
    getItems() {
      if (this.random) {
        return this.getRandomItems(this.limit || this.brands.length);
      }
      return this.brands.filter((b, index) => !this.limit || index < this.limit);
    },
    getRandomItems(numberOfItems) {
      const allIndexs = this.brands.map((b, index) => index);
      let selected = [];
      while (allIndexs.length > 0 && selected.length < numberOfItems) {
        const rand = this.$responsiveUI.getRandomNumber(0, allIndexs.length - 1);
        selected = selected.concat(allIndexs.splice(rand, 1));
        console.log(rand);
        console.log(selected);
      }
      return selected.map((index) => this.brands[index]);
    },
  }
};
</script>

<style scoped>
.brand-view-more {
  width: 100%;
  text-align: center;
  font-size: 12;
  font-family: 'Roboto', 'Roboto-Regular';
  font-weight: 400;
}
</style>
