<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localize('Bill') }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <loader-component v-if="loading" />

    <div v-else class="row">
      <home-bill
        :rates="currency.rates"
      />

      <home-currency
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>

<script>
import LoaderComponent from '@/components/app/LoaderComponent.vue';
import HomeBill from '../components/HomeBill.vue';
import HomeCurrency from '../components/HomeCurrency.vue';

export default {
  name: 'HomeView',
  metaInfo() {
    return {
      title: this.$title('Menu_Bill'),
    };
  },
  data: () => ({
    loading: true,
    currency: null,
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
  },
  components: {
    HomeBill,
    HomeCurrency,
    LoaderComponent,
  },
};
</script>
