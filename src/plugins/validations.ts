import type { App } from 'vue';
import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';
import {
  required,
  email,
  min,
  max,
  alpha_spaces,
  numeric,
  max_value,
  min_value,
  confirmed,
} from '@vee-validate/rules';

export default {
  install(app: App) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('email', email);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('min_value', min_value);
    defineRule('max_value', max_value);
    defineRule('alpha_spaces', alpha_spaces);
    defineRule('numeric', numeric);
    defineRule('confirmed', confirmed);

    configure({
      generateMessage(ctx) {
        const messages: { [key: string]: string } = {
          required: 'This field is required',
          email: 'Enter a valid email',
          min: 'Value too short',
          max: 'Value too long',
          confirmed: 'Fields do not match',
          alpha_spaces: 'Value may only contain alphabets and spaces',
          max_value: 'Value too high',
        };

        const message = ctx.rule
          ? messages[ctx.rule.name] || 'The field is invalid'
          : 'The field is invalid';

        return message;
      },
      validateOnChange: true,
      validateOnInput: false,
    });
  },
};
