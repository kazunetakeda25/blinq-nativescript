<template>
  <Shadow padding="1,1,2,1" :borderRadius="borderRadius">
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
