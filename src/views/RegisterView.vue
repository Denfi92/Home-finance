<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ $filters.localize('CRM_Title') }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: (v$.email.$dirty && v$.email.required.$invalid) ||
          (v$.email.$dirty && v$.email.email.$invalid)}"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="v$.email.$dirty && v$.email.required.$invalid"
          >П{{ $filters.localize('Message_EmailRequired') }}</small>
        <small
          class="helper-text invalid"
          v-else-if="v$.email.$dirty && v$.email.email.$invalid"
          >{{ $filters.localize('Message_EmailValid') }}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: (v$.password.$dirty && v$.password.required.$invalid) ||
          (v$.password.$dirty && v$.password.minLength.$invalid)}"
        >
        <label for="password">{{ $filters.localize('Password') }}</label>
        <small
          class="helper-text invalid"
          v-if="v$.password.$dirty && v$.password.required.$invalid"
          >{{ $filters.localize('Message_EnterPassword') }}</small>
        <small
          class="helper-text invalid"
          v-else-if="v$.password.$dirty && v$.password.minLength.$invalid"
          >{{ $filters.localize('Message_MinLength') }} {{v$.password.minLength.$params.min}}
          </small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: (v$.name.$dirty && v$.name.required.$invalid)}"
        >
        <label for="name">{{ $filters.localize('Name') }}</label>
        <small
          class="helper-text invalid"
          v-if="v$.name.$dirty && v$.name.required.$invalid"
          >{{ $filters.localize('Message_EnterName') }}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>{{ $filters.localize('AcceptRules') }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{ $filters.localize('Register') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        У{{ $filters.localize('HasAccount') }}
        <router-link to="/login">{{ $filters.localize('Login') }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { email, required, minLength } from '@vuelidate/validators';

export default {
  name: 'loginView',
  metaInfo() {
    return {
      title: this.$title('Register'),
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: (v) => v },
  },
  methods: {
    async submitHandler() {
      this.v$.$validate();
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
      } catch (e) {
        console.log(e);
      }
    },
  },
};

</script>
