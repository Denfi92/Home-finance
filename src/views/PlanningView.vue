<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localize('Menu_Planning') }}</h3>
      <h4>{{ $filters.currency(info.bill, 'RUB') }}</h4>
    </div>

    <loader-component v-if="loading" />

    <p class="center" v-else-if="!categories.length">{{ $filters.localize('NoCategories') }}
      <router-link to="/categories">{{ $filters.localize('AddFirst') }}</router-link>
    </p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ $filters.currency(cat.spend) }}
          {{ $filters.localize('Of') }}
          {{ $filters.currency(cat.limit) }}
        </p>
        <div class="progress" v-tooltip.noloc="cat.tooltip">
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LoaderComponent from '@/components/app/LoaderComponent.vue';
import localizeFilter from '@/filters/localize.filter';
import { mapGetters } from 'vuex';
import currencyFilter from '../filters/currency.filter';

export default {
  name: 'planningComponent',
  components: { LoaderComponent },
  metaInfo() {
    return {
      title: this.$title('Menu_Planning'),
    };
  },
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(['info']),
    base() {
      return this.$store.getters.info.bill
      / (this.currency.rates.RUB / this.currency.rates.EUR);
    },
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.categories = categories.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === 'outcome')
        .reduce((total, record) => {
          const tot = total + +record.amount;
          return tot;
        }, 0);

      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      let progressColor;
      if (percent < 60) {
        progressColor = 'green';
      } else if (percent < 100) {
        progressColor = 'yellow';
      } else {
        progressColor = 'red';
      }
      const tooltipValue = cat.limit - spend;
      const tooltip = `${tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')}${currencyFilter(Math.abs(tooltipValue))}`;
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      };
    });
    this.loading = false;
  },
};

</script>
