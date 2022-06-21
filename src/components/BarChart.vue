<template>
  <Pie
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { h } from 'vue';
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: 'PieChart',
  components: { Pie },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    categories: {
      type: Object,
    },
    records: {
      type: Object,
    },
  },
  setup(props) {
    const chartData = {
      labels: props.categories.map((c) => c.title),
      datasets: [{
        label: ['Расходы по категориям'],
        data: props.categories.map((c) => props.records.reduce((total, r) => {
          if (r.categoryId === c.id && r.type === 'outcome') {
            const tot = total + +r.amount;
            return tot;
          }
          return total;
        }, 0)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
      }],
    };
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };
    return () => h(Pie, {
      chartData,
      chartOptions,
      chartId: props.chartId,
      width: props.width,
      height: props.height,
      cssClasses: props.cssClasses,
      plugins: props.plugins,
      categories: props.categories,
      records: props.records,
    });
  },
};

</script>
