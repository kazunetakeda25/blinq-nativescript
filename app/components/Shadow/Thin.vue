<template>
  <Shadow padding="0.5,0.5,1,0.5" :borderRadius="borderRadius">
    <slot></slot>
  </Shadow>
</template>

<script>
import Shadow from './Index';
export default {
  components: {
    Shadow,
  },
  props: {
    borderRadius: String,
  },
  data() {
    return {
    };
  },
  computed: {
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
