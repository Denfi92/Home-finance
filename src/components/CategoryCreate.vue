<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $filters.localize('Create') }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: v$.title.$dirty && v$.title.required.$invalid}"
          >
          <label for="name">{{ $filters.localize('Title') }}</label>
          <span
            class="helper-text invalid"
            v-if="v$.title.$dirty && v$.title.required.$invalid"
            >{{ $filters.localize('Message_CategoryTitle') }}</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: v$.limit.$dirty && v$.limit.minValue.$invalid}"
          >
          <label for="limit">{{ $filters.localize('Limit') }}</label>
          <span
            class="helper-text invalid"
            v-if="v$.limit.$dirty && v$.limit.minValue.$invalid"
            >{{ $filters.localize('Message_MinLength') }} {{v$.limit.minValue.$params.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $filters.localize('Create') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import * as M from 'materialize-css/dist/js/materialize.min';
import localizeFilter from '@/filters/localize.filter';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    title: '',
    limit: 100,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      this.v$.$validate();
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        });
        this.title = '';
        this.limit = 100;
        this.v$.$reset();
        this.$message(localizeFilter('Category_HasBeenCreated'));
        this.$emit('created', category);
      } catch (e) {
        console.log(e);
      }
    },
  },
};

</script>
