<template>
  <FlexboxLayout height="110" width="100%" flexWrap="wrap">
    <FlexboxLayout v-if="target && brand" height="50" width="100%" flexWrap="wrap" justifyContent="space-between" marginBottom="5">
      <StackLayout width="49%" height="50" paddingLeft="10" paddingRight="7">
        <Label height="20" :text="filters.target.label" class="font-roboto-black font-color filter-title" />
        <Selector :enableOnly="true" :options="targetOptions" :value="filters.target.selected" @onSelect="onChangeFilter('target', $event)" />
      </StackLayout>
      <StackLayout width="49%" height="50" paddingLeft="7" paddingRight="10">
        <Label height="20" :text="filters.brand.label" class="font-roboto-black font-color filter-title" />
        <Selector :enableOnly="true" :options="brandOptions" :value="filters.brand.selected" @onSelect="onChangeFilter('brand', $event)" />
      </StackLayout>
    </FlexboxLayout>
    <FlexboxLayout v-if="target && !brand" height="50" width="100%" flexWrap="wrap" marginBottom="5">
      <StackLayout width="100%" height="50" paddingLeft="10" paddingRight="10">
        <Label height="20" :text="filters.target.label" class="font-roboto-black font-color filter-title" />
        <Selector :enableOnly="true" :options="targetOptions" :value="filters.target.selected" @onSelect="onChangeFilter('target', $event)" />
      </StackLayout>
    </FlexboxLayout>
    <FlexboxLayout v-if="!target && brand" height="50" width="100%" flexWrap="wrap" marginBottom="5">
      <StackLayout width="100%" height="50" paddingLeft="10" paddingRight="10">
        <Label height="20" :text="filters.brand.label" class="font-roboto-black font-color filter-title" />
        <Selector :enableOnly="true" :options="brandOptions" :value="filters.brand.selected" @onSelect="onChangeFilter('brand', $event)" />
      </StackLayout>
    </FlexboxLayout>

    <FlexboxLayout v-if="category && sort" height="50" width="100%" flexWrap="wrap" justifyContent="space-between" marginBottom="5">
      <StackLayout width="49%" height="50" paddingLeft="10" paddingRight="7">
        <Label height="20" :text="filters.category.label" class="font-roboto-black font-color filter-title" />
        <Selector :enableOnly="true" :options="categoryOptions" :value="filters.category.selected" @onSelect="onChangeFilter('category', $event)" />
      </StackLayout>
      <StackLayout width="49%" height="50" paddingLeft="7" paddingRight="10">
        <Label height="20" :text="filters.sort.label" class="font-roboto-black font-color filter-title" />
        <Selector :enableOnly="true" :options="filters.sort.options" :value="filters.sort.selected" @onSelect="onChangeFilter('sort', $event)" />
      </StackLayout>
    </FlexboxLayout>
    <FlexboxLayout v-if="category && !sort" height="50" width="100%" flexWrap="wrap" marginBottom="5">
      <StackLayout width="100%" height="50" paddingLeft="10" paddingRight="10">
        <Label height="20" :text="filters.category.label" class="font-roboto-black font-color filter-title" />
        <Selector :enableOnly="true" :options="categoryOptions" :value="filters.category.selected" @onSelect="onChangeFilter('category', $event)" />
      </StackLayout>
    </FlexboxLayout>
    <FlexboxLayout v-if="!category && sort" height="50" width="100%" flexWrap="wrap" marginBottom="5">
      <StackLayout width="100%" height="50" paddingLeft="10" paddingRight="10">
        <Label height="20" :text="filters.sort.label" class="font-roboto-black font-color filter-title" />
        <Selector :enableOnly="true" :options="filters.sort.options" :value="filters.sort.selected" @onSelect="onChangeFilter('sort', $event)" />
      </StackLayout>
    </FlexboxLayout>
  </FlexboxLayout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { ACTIONS, GETTERS, MUTATORS } from '~/store/productList';
import { GETTERS as HOME_GETTERS } from '~/store/home';
import Selector from '~/components/Selector/index';

export default {
  components: {
    Selector,
  },
  props: [
    'screen', 'target', 'brand', 'category', 'sort',
    'targetValue', 'brandValue', 'categoryValue',
  ],
  watch: {
    screen() {
      this.resetFilterEnabled();
      this.resetFilters();
    },
    target() {
      this.resetFilterEnabled();
    },
    targetValue() {
      this.bindDefaultFilterValue();
    },
    brand() {
      this.resetFilterEnabled();
    },
    brandValue() {
      this.bindDefaultFilterValue();
    },
    category() {
      this.resetFilterEnabled();
    },
    categoryValue() {
      this.bindDefaultFilterValue();
    },
    sort() {
      this.resetFilterEnabled();
    },
    targets() {
      console.log('this.targets', JSON.stringify(this.targets));
    },
    brands() {
      console.log('this.brands', JSON.stringify(this.brands));
    },
    categories() {
      console.log('this.categories', JSON.stringify(this.categories));
    },
  },
  data() {
    return {
      enabledFilters: [],
      filters: {
        target: {
          label: 'for',
          selected: '',
          default: '',
        },
        brand: {
          label: 'brand',
          selected: '',
          default: '',
        },
        category: {
          label: 'category',
          selected: '',
          default: '',
        },
        sort: {
          label: 'sort by',
          selected: '',
          default: '',
          options: [
            {
              Code: '',
              Name: 'Recent',
            },
            {
              Code: 'az',
              Name: 'A - Z',
            },
            {
              Code: 'za',
              Name: 'Z - A',
            },
            {
              Code: 'lf',
              Name: 'Price: Lowest - Highest',
            },
            {
              Code: 'hf',
              Name: 'Price: Highest - Lowest',
            },
          ],
        },
      },
    };
  },
  beforeMount() {
  },
  mounted() {
    this.resetFilterEnabled();
    this.bindDefaultFilterValue();
  },
  computed: {
    ...mapGetters({
      targets: GETTERS.FILTER_TARGET,
      brands: GETTERS.FILTER_BRAND,
      categories: GETTERS.FILTER_CATEGORY,
    }),
    targetOptions() {
      const defaultOption = {
        Code: '',
        Name: 'All',
      };
      return this.getOptions(defaultOption, this.targets);
    },
    brandOptions() {
      const defaultOption = {
        Code: '',
        Name: 'All',
      };
      return this.getOptions(defaultOption, this.brands);
    },
    categoryOptions() {
      const defaultOption = {
        Code: '',
        Name: 'All',
      };
      return this.getOptions(defaultOption, this.categories);
    },
  },
  methods: {
    resetFilters() {
      this.enabledFilters.forEach((filter, index) => {
        this.filters[filter].selected = this.filters[filter].default;
      });
    },
    getOptions(defaultOption, dataList = []) {
      if (!dataList) {
        return [defaultOption];
      }
      const all = dataList.map((item) => ({
        Code: item.ID,
        Name: item.Label || item.Name,
      }));
      return [
        defaultOption,
        ...all,
      ];
    },
    resetFilterEnabled() {
      this.enabledFilters = [];
      if (this.target) {
        this.enabledFilters.push('target');
      }
      if (this.brand) {
        this.enabledFilters.push('brand');
      }
      if (this.category) {
        this.enabledFilters.push('category');
      }
      if (this.sort) {
        this.enabledFilters.push('sort');
      }
    },
    bindDefaultFilterValue() {
      if (this.targetValue !== this.filters.target.selected) {
        this.filters.target.selected = this.targetValue;
      }
      if (this.brandValue !== this.filters.brand.selected) {
        this.filters.brand.selected = this.brandValue;
      }
      if (this.categoryValue !== this.filters.category.selected) {
        this.filters.category.selected = this.categoryValue;
      }
    },
    onChangeFilter(filterName, value) {
      console.log('FILTER_PRODUCTS', filterName, value);
      console.log('FILTER_ENABLED', this.enabledFilters);
      const indexOfCurrent = this.enabledFilters.indexOf(filterName);
      if (indexOfCurrent > -1 && this.filters[filterName].selected !== value) {
        this.filters[filterName].selected = value;
        this.enabledFilters.forEach((filter, index) => {
          if (index > indexOfCurrent) {
            this.filters[filter].selected = this.filters[filter].default;
          }
        });
      }
      const filterData = {};
      Object.keys(this.filters).forEach((filterName) => {
        filterData[filterName] = this.filters[filterName].selected;
      });
      this.$emit('onFilterChange', filterData);
    },
  }
};
</script>

<style scoped>
.filter-title {
  font-size: 12;
  margin-bottom: 0;
}
</style>
