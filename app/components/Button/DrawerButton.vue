<template>
  <Image @tap="onTap" src="~/assets/images/icons/icon_drawer.png"
    height="40" width="40" top="35" left="10" />
</template>

<script>
export default {
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
      this.$emit('onTap');
    },
  }
};
</script>

<style scoped>
</style>
