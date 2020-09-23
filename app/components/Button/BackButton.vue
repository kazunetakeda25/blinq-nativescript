<template>
  <Image @tap="onTap" src="~/assets/images/icons/icon_back_arrow.png"
    height="40" width="40" :top="top || 35" :left="left || 10" />
</template>

<script>
export default {
  props: ['noDefault', 'top', 'left'],
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {},
  beforeMount() {},
  mounted() {
  },
  methods: {
    onTap() {
      if (!this.noDefault) {
        this.$navigateBack();
      } else {
        this.$emit('onTap');
      }
    },
  }
};
</script>

<style scoped>
</style>
