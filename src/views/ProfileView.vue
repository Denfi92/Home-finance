<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localize('ProfileTitle') }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: v$.name.$dirty && v$.name.required.$invalid}"
        >
        <label for="description">{{ $filters.localize('Name') }}</label>
        <small
          class="helper-text invalid"
          v-if="v$.name.$dirty && v$.name.required.$invalid"
        >{{ $filters.localize('Message_EnterName') }}
        </small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox"  v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ $filters.localize('Update')}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import * as M from 'materialize-css/dist/js/materialize.min';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle'),
    };
  },
  data: () => ({
    name: '',
    isRuLocale: true,
  }),
  setup() {
    return { v$: useVuelidate() };
  },
  validations: {
    name: { required },
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-RU';
    setTimeout(() => {
      M.updateTextFields();
    });
  },
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      this.v$.$validate();
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US',
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};

</script>

<style scoped>

  .switch {
    margin-bottom: 2rem;
  }

</style>
