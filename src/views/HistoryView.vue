<template>
  <div>
    <div class="page-title">
      <h3>{{ $filters.localize('History_Title') }}</h3>
    </div>

    <loader-component v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{ $filters.localize('NoRecords') }}
      <router-link to="/record">{{ $filters.localize('AddFirst') }}</router-link>
    </p>

    <section v-else>

      <bar-chart
        :categories="categories"
        :records="this.records"
      />

      <history-table :records="items" />

      <pagination-component
        v-model="page"
        :records="this.records.length"
        :per-page="5"
        @paginate="pageChangeHandler"
        :options="{ chunk: pageCount}"
      />

    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue';
import paginationMixin from '@/mixins/pagination.mixin';
import BarChart from '@/components/BarChart.vue';
import localizeFilter from '@/filters/localize.filter';

export default {
  name: 'historyComponent',
  mixins: [paginationMixin],
  metaInfo() {
    return {
      title: this.$title('Menu_History'),
    };
  },
  data: () => ({
    loading: true,
    records: [],
    chartData: [],
    categories: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.setup(categories);
    this.categories = categories;
    this.loading = false;
  },
  methods: {
    setup(categories) {
      this.setupPagination(this.records.map((record) => ({
        ...record,
        categoryName: categories.find((c) => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome'),
      })));
    },
  },
  components: {
    HistoryTable, BarChart,
  },
};

</script>
