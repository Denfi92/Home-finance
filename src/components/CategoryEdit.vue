<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $filters.localize('Edit') }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >{{c.title}}</option>
          </select>
          <label>{{ $filters.localize('SelectCategory') }}</label>
        </div>

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
          {{ $filters.localize('Update') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import * as M from 'materialize-css/dist/js/materialize.min';
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import localizeFilter from '@/filters/localize.filter';

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId);
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  methods: {
    async submitHandler() {
      this.v$.$validate();
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message(localizeFilter('Category_HasBeenUpdated'));
        this.$emit('updated', categoryData);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  unmounted() {
    if (this.secelt && this.select.destroy) {
      this.select.destroy();
    }
  },
};

</script>
