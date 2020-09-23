<template>
  <InputBox :label="label" :required="required">
    <Shadow>
      <StackLayout width="100%" height="auto" padding="0" backgroundColor="white">
        <TextView v-model="valueModal" fontSize="14"
          :hint="hint"
          minHeight="80"
          paddingLeft="10"
          paddingRight="10"
          @textChange="onChange"
          @android:focus="onFocus"
          @android:blur="onBlur" />
      </StackLayout>
    </Shadow>
  </InputBox>
</template>

<script>
import InputBox from './InputBox';
import Shadow from '~/components/Shadow/Thin';
export default {
  components: {
    InputBox,
    Shadow,
  },
  props: {
    label: String,
    required: Boolean,
    hint: String,
    value: String,
  },
  data() {
    return {
      valueModal: '',
    };
  },
  computed: {
    keyType() {
      const acceptedTypes = [
        'datetime', 'phone', 'number', 'url', 'email'
      ];
      if (acceptedTypes.indexOf(this.type)) {
        return this.type;
      }
      return null;
    },
  },
  watch: {
    value() {
      this.valueModal = this.value;
    },
  },
  beforeMount() {
  },
  mounted() {
    this.valueModal = this.value;
  },
  methods: {
    valid() {
      return Boolean(!this.required || this.valueModal);
    },
    onFocus($event) {
      // this.$setFocusedInput($event.object);
    },
    onBlur($event) {
      $event.object.dismissSoftInput();
      if (!this.valid()) {
        this.requireErr = true;
      } else {
        this.requireErr = false;
      }
    },
    onChange(evt) {
      if (!this.valid(evt.value)) {
        this.requireErr = true;
      } else {
        this.requireErr = false;
      }
      this.$emit('input', evt.value);
      this.$emit('onChange', evt);
    },
  }
};
</script>

<style scoped>
</style>
