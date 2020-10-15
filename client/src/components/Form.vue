<template>
  <v-form v-model="valid" ref="form">
    <template v-for="field in schema">
      <template v-for="fieldAttr in getFieldAttributes(field.defaults)">
        <v-file-input
          v-if="fieldAttr.dataType === 'File'"
          :key="field.name || fieldAttr.name"
          outlined
          :prepend-inner-icon="field.prependIcon || fieldAttr.prependIcon"
          :accept="field.accept || fieldAttr.accept"
          :disabled="field.disabled"
          :placeholder="field.placeholder || fieldAttr.placeholder"
          :rules="field.rules || fieldAttr.rules"
          v-on:change="
            field.onChange
              ? field.onChange(field.name || fieldAttr.name)
              : fieldAttr.onChange
              ? fieldAttr.onChange(field.name || fieldAttr.name)
              : null
          "
          v-model="values[field.name || fieldAttr.name]"
        />
        <v-select
          outlined
          v-if="fieldAttr.dataType === Array"
          v-model="values[field.name || fieldAttr.name]"
          :key="field.name || fieldAttr.name"
          :placeholder="field.placeholder || fieldAttr.placeholder"
          :prepend-inner-icon="field.prependIcon || fieldAttr.prependIcon"
          :items="field.items || fieldAttr.items"
          :rules="field.rules || fieldAttr.rules"
          :disabled="field.disabled"
          v-on:change="
            field.onChange
              ? fieldAttr.onChange(values[field.name || fieldAttr.name])
              : fieldAttr.onChange
              ? fieldAttr.onChange(values[field.name || fieldAttr.name])
              : null
          "
        />
        <v-text-field
          outlined
          v-if="fieldAttr.dataType === String"
          v-model="values[field.name || fieldAttr.name]"
          :key="field.name || fieldAttr.name"
          :prepend-inner-icon="field.prependIcon || fieldAttr.prependIcon"
          :rules="field.rules || fieldAttr.rules"
          :counter="field.maxLength || fieldAttr.maxLength"
          :hint="field.hint || fieldAttr.hint"
          :placeholder="field.placeholder || fieldAttr.placeholder"
          :maxlength="field.maxLength || fieldAttr.maxLength"
          :disabled="field.disabled"
          :type="
            fieldAttr.name === 'password'
              ? showPassword
                ? 'text'
                : 'password'
              : fieldAttr.name === 'confirmPassword'
              ? showConfirmPassword
                ? 'text'
                : 'password'
              : fieldAttr.type
          "
          :append-icon="
            fieldAttr.type === 'password'
              ? showPassword
                ? 'mdi-eye'
                : 'mdi-eye-off'
              : fieldAttr.type === 'confirmPassword'
              ? showConfirmPassword
                ? 'mdi-eye'
                : 'mdi-eye-off'
              : fieldAttr.appendIcon
          "
          @click:append="fieldAttr.onClickAppend(fieldAttr)"
          clearable
        >
        </v-text-field>
      </template>
    </template>
  </v-form>
</template>
<script>
import csc from 'country-state-city';

export default {
  name: 'Form',
  methods: {
    getFieldAttributes(type) {
      switch (type) {
        case 'email':
          return [
            {
              name: 'email',
              dataType: String,
              maxLength: 254,
              allowNull: false,
              prependIcon: 'mdi-email',
              rules: [(v) => /.+@.+/.test(v) || 'E-mail must be valid'],
              hint: 'Enter your email',
              placeholder: 'Email',
              type: 'text',
            },
          ];
        case 'name':
          return [
            {
              name: 'name',
              dataType: String,
              maxLength: 256,
              allowNull: false,
              prependIcon: 'mdi-pen',
              rules: this.notEmptyRules,
              hint: 'Enter your name',
              placeholder: 'Name',
              type: 'text',
            },
          ];
        case 'confirmPassword':
          return [
            {
              name: 'confirmPassword',
              maxLength: 30,
              dataType: String,
              allowNull: false,
              prependIcon: 'mdi-lock',
              rules: this.confirmPasswordRules,
              hint: 'Confirm your password',
              placeholder: 'Confirm Password',
              type: 'password',
              onClickAppend: () => {
                this.showConfirmPassword = !this.showConfirmPassword;
              },
            },
          ];
        case 'password':
          return [
            {
              name: 'password',
              maxLength: 30,
              dataType: String,
              allowNull: false,
              prependIcon: 'mdi-lock',
              rules: this.passwordRules,
              hint: 'Enter your password',
              placeholder: 'Password',
              type: 'password',
              onClickAppend: () => {
                this.showPassword = !this.showPassword;
              },
            },
          ];
        case 'mobile':
          return [
            {
              name: 'mobile',
              dataType: String,
              allowNull: false,
              prependIcon: 'mdi-phone',
              rules: this.mobileRules,
              hint: 'Enter your mobile number',
              placeholder: 'Mobile',
              type: 'text',
              maxLength: 10,
            },
          ];
        case 'state':
          return [
            {
              name: 'state',
              dataType: Array,
              allowNull: false,
              rules: this.notEmptyRules,
              prependIcon: 'fa-globe',
              placeholder: 'State',
              items: this.states.map((state) => state.name),
              onChange: (value) => {
                this.cities = csc.getCitiesOfState(this.stateMap.get(value));
              },
            },
          ];
        case 'city':
          return [
            {
              name: 'city',
              dataType: Array,
              allowNull: false,
              rules: this.notEmptyRules,
              prependIcon: 'fa-map-marker',
              placeholder: 'City',
              items: this.cities.map((city) => city.name),
            },
          ];
        case 'avatar':
          return [
            {
              name: 'avatar',
              dataType: 'File',
              allowNull: false,
              rules: this.avatarRules,
              prependIcon: 'fa-image',
              placeholder: 'Avatar',
              accept: 'image/png, image/jpeg, image/bmp',
            },
          ];
        default:
          return null;
      }
    },
    validate() {
      return this.$refs.form.validate();
    },
  },
  created() {
    this.schema.forEach((field) => {
      const attr = this.getFieldAttributes(field.defaults);
      const name = attr ? attr[0].name : field.name;
      this.$set(this.values, name, field.defaultValue || null);
      if (name === 'state') {
        this.states = csc.getStatesOfCountry('101');
        this.states.forEach((state) => {
          this.stateMap.set(state.name, state.id);
        });
        if (name === 'state' && field.defaultValue) {
          this.cities = csc.getCitiesOfState(this.stateMap.get(field.defaultValue));
        }
      }
    });
  },
  data: (vm) => ({
    values: {},
    valid: false,
    stateMap: new Map(),
    cities: [],
    states: [],
    showPassword: false,
    avatarRules: [
      (v) => !!v || 'Please choose an avatar',
      (v) => !v || v.size < 2000000 || 'Avatar size should be less than 2 MB!',
    ],
    showConfirmPassword: false,
    notEmptyRules: [(v) => !!v || v?.length > 0 || 'Field cannot be empty'],
    emailRules: [(v) => /.+@.+/.test(v) || 'E-mail must be valid'],
    mobileRules: [(v) => /\d{10}/.test(v) || 'Invalid mobile number'],
    confirmPasswordRules: [(v) => v === vm.values.password || 'Passwords does not match'],
    passwordRules: [
      (v) => v?.length >= 8 || 'Password length must be greater than 8 characters',
      /* eslint-disable */
      (v) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(v) ||
        'Password must contain a nummber, a lowercase alphabet and an uppercase alphabet',
      /* eslint-enable */
    ],
  }),
  props: {
    schema: {
      type: Array,
    },
  },
  mounted() {
    this.$emit('mounted');
  },
};
</script>
