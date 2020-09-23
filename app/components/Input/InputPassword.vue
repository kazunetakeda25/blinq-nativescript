<template>
  <InputBox :label="label" :required="required">
    <Shadow>
      <StackLayout width="100%" height="auto" padding="0" backgroundColor="white">
        <TextField ref="inputPassword" v-model="valueModal"
          verticalAlignment="center"
          :secure="true"
          fontSize="14" :hint="hint" width="100%" height="30"
          padding="0,10"
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
import { validatePassword } from '~/common/helpers/validators';
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
    typeValidate: Boolean,
    confirmCheck: Boolean,
    passwordValue: String,
  },
  data() {
    return {
      editing: false,
      validationErr: null,
      valueModal: '',
    };
  },
  computed: {
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
        console.log('here1');
      if (this.typeValidate) {
        console.log('here2', this.confirmCheck);
        if (this.confirmCheck) {
          // validate confirm password
          console.log('confirm check');
          console.log(textValue !== this.passwordValue);
          console.log(textValue);
          console.log(this.passwordValue);
          if (textValue !== this.passwordValue) {
            this.validationErr = VALIDATE_MSG.INVALID_CONFIRM_PASSWORD;
            return false;
          }
        } else {
          // validate password
          if (!validatePassword(textValue)) {
            this.validationErr = VALIDATE_MSG.INVALID_PASSWORD;
            return false;
          }
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
      this.$refs.inputPassword.nativeView.focus();
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
