<template>
  <InputBox :label="label" :required="required">
    <StackLayout width="100%" height="auto" padding="0">
      <Selector :value="selected"
        :options="options"
        :enableOnly="true"
        :centerOption="centerOption"
        @onSelect="onChange" />
      <Label v-if="validationErr" fontSize="12" :text="validationErr" color="red" />
    </StackLayout>
  </InputBox>
</template>

<script>
import { VALIDATE_MSG } from '~/common/messages';
import InputBox from './InputBox';
import Selector from '../Selector/index';
export default {
  components: {
    InputBox,
    Selector,
  },
  // props: ['label', 'required', 'value', 'options'],
  props: {
    label: String,
    required: Boolean,
    value: String | Number,
    options: Array,
    centerOption: Boolean,
  },
  data() {
    return {
      validationErr: null,
      selected: '',
    };
  },
  computed: {
  },
  watch: {
    value() {
      this.selected = this.value;
    },
  },
  beforeMount() {
  },
  mounted() {
    this.selected = this.value;
    console.log('this.required', this.required);
  },
  methods: {
    clear() {
      this.selected = '';
      if (this.options && this.options.length) {
        this.selected = this.options[0].Code;
      }
      this.validationErr = null;
    },
    valid(code) {
      console.log('code', (typeof code !== 'undefined'), code);
      const textValue = (typeof code !== 'undefined') ? code : this.selected;
      const isValidRequired = Boolean(!this.required || textValue);
      if (!isValidRequired) {
        this.validationErr = VALIDATE_MSG.REQUIRED;
        return false;
      }
      return true;
    },
    validate(code) {
      const isValid = this.valid(code);
      if (isValid) {
        this.validationErr = null;
      }
      return isValid;
    },
    onChange(code) {
      this.validate(code);
      this.$emit('input', code);
      this.$emit('onChange', { value: code });
    },
  }
};
</script>

<style scoped>
</style>
