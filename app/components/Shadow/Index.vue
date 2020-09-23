<template>
  <StackLayout width="100%"
    :borderRadius="borderRadius || '0'"
    v-shadow="isAndroid ? 0 : (shadow || 2)"
    :padding="padding || defaultPadding"
    :backgroundColor="backgroundColor">
    <slot></slot>
  </StackLayout>
</template>

<script>
const application = require('application');
export default {
  components: {
  },
  props: {
    shadow: Number,
    padding: String,
    borderRadius: String,
  },
  data() {
    return {
      defaultPadding: '1,1,1,1'
    };
  },
  computed: {
    isAndroid() {
      return application.android;
    },
    shadowPadding() {
      if (this.isAndroid) {
        return this.padding || this.defaultPadding;
      } else {
        return '0';
      }
    },
    backgroundColor() {
      if (this.isAndroid) {
        return this.$colors.SHADOW_COLOR;
      } else {
        return 'transparent';
      }
    },
  },
  watch: {
  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style scoped></style>
