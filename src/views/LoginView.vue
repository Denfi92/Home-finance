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
          >{{ $filters.localize('Message_EmailRequired') }}</small>
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
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{ $filters.localize('Login') }}
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        {{ $filters.localize('NoAccount') }}
        <router-link to="/register">{{ $filters.localize('Register') }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { email, required, minLength } from '@vuelidate/validators';
import messages from '@/utlis/messages';
import localizeFilter from '@/filters/localize.filter';

export default {
  name: 'loginView',
  metaInfo() {
    return {
      title: this.$title('Login'),
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(localizeFilter(messages[this.$route.query.message]));
    }
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
      };
      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
      } catch (e) {
        console.log(e);
      }
    },
  },
};

</script>
