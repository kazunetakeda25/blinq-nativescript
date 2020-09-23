<template>
  <StackLayout width="100%" height="auto" padding="5,0" class="bg-default">
    <Label v-if="label" width="100%" fontSize="12" marginBottom="5" padding="0" class="font-roboto-black">
      <FormattedString>
        <Span :text="label" class="font-roboto-black" color="black" />
        <Span v-if="required" text="*" class="font-roboto-black" color="red" />
      </FormattedString>
    </Label>
    <slot></slot>
  </StackLayout>
</template>

<script>
export default {
  components: {
  },
  props: {
    label: String,
    required: Boolean,
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

<style scoped>
</style>
