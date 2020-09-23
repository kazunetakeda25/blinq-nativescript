<template>
  <DockLayout width="100%" stretchLastChild="true" height="30" @tap="onCheck">
    <StackLayout dock="left" width="30" padding="4,8,0,0">
      <StackLayout width="100%" height="22">
        <Image width="100%" height="100%"
          :src="(checked && '~/assets/images/icons/icon_checkbox_checked.png') || '~/assets/images/icons/icon_checkbox.png'"
          stretch="aspectFit" />
      </StackLayout>
    </StackLayout>
    <FlexBoxLayout dock="top" flexDirection="row" alignItems="center">
      <Label fontSize="12" :text="label" width="100%" />
    </FlexBoxLayout>
  </DockLayout>
</template>

<script>
export default {
  components: {
  },
  props: {
    label: String,
    value: Boolean,
  },
  data() {
    return {
      checked: false,
    };
  },
  computed: {
  },
  watch: {
    value(val) {
      this.checked = Boolean(this.value);
    },
  },
  beforeMount() {
  },
  mounted() {
    this.checked = Boolean(this.value);
  },
  methods: {
    onCheck() {
      this.checked = !this.checked;
      this.$emit('input', this.checked);
    },
  }
};
</script>

<style scoped>
</style>
