<template>
  <InputBox :label="label" :required="required">
    <Shadow>
      <StackLayout width="100%" height="auto" padding="0" :backgroundColor="readOnly ? 'grey' : 'white'">
        <TextField ref="inputText" v-model="valueModal"
          :keyboardType="keyType"
          verticalAlignment="center"
          fontSize="14" :hint="hint" width="100%" height="30"
          padding="0,10"
          :editable="!readOnly"
          @textChange="onChange"
          @android:focus="onFocus"
          @android:blur="onBlur" />
      </StackLayout>
    </Shadow>
    <Label v-if="validationErr" fontSize="12" :text="validationErr" color="red" />
  </InputBox>
</template>

<script>
import InputBox from './InputBox';
import Shadow from '../Shadow/Thin';
import { validateEmail } from '~/common/helpers/validators';
import { VALIDATE_MSG } from '~/common/messages';
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
    type: String,
    typeValidate: Boolean,
    readOnly: Boolean,
  },
  data() {
    return {
      editing: false,
      validationErr: false,
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
    isEmail() {
      return this.type === 'email';
    },
  },
  watch: {
    value() {
      if (this.editing) {
        this.editing = false;
      }
      this.valueModal = this.value;
    },
  },
  beforeMount() {
  },
  mounted() {
    this.valueModal = this.value;
  },
  methods: {
    clear() {
      this.valueModal = '';
      this.validationErr = null;
    },
    valid(code) {
      const textValue = (typeof code !== 'undefined') ? code : this.valueModal;
      if (this.typeValidate) {
        const isValidEmail = Boolean(!this.isEmail || validateEmail(textValue));
        if (!isValidEmail) {
          this.validationErr = VALIDATE_MSG.INVALID_EMAIL;
          return false;
        }
      }
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
    focus() {
      this.$refs.inputText.nativeView.focus();
    },
    onFocus($event) {
      // this.$setFocusedInput($event.object);
    },
    onBlur($event) {
      $event.object.dismissSoftInput();
      this.validate();
    },
    onChange(evt) {
      this.editing = true;
      this.validate(evt.value);
      this.$emit('input', evt.value);
      this.$emit('onChange', evt);
    },
  }
};
</script>

<style scoped>
</style>
