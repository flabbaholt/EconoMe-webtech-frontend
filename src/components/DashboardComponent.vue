<template>
  <div class="container-md border bg-secondary-custom rounded w-50 mt-3 p-4">
    <h2 class="text-center">Dashboard</h2>

    <div class="row mb-4">
      <div class="col-md-6 chart-container">
        <canvas id="incomeChart"></canvas>
      </div>
      <div class="col-md-6 chart-container">
        <canvas id="expenseChart"></canvas>
      </div>
    </div>

    <div class="chart-container mb-4">
      <canvas id="paymentMethodChart"></canvas>
    </div>

    <div class="chart-container mb-4">
      <canvas id="categoryChart"></canvas>
    </div>

    <div class="chart-container mb-4">
      <canvas id="currencyChart"></canvas>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

const incomeChartData = ref<ChartData<'bar'>>({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Income',
      backgroundColor: '#f87979',
      data: [400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500]
    }
  ]
});

const expenseChartData = ref<ChartData<'bar'>>({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Expenses',
      backgroundColor: '#36A2EB',
      data: [300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400]
    }
  ]
});

const paymentMethodChartData = ref<ChartData<'doughnut'>>({
  labels: [],
  datasets: [
    {
      label: 'Payment Methods',
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      data: []
    }
  ]
});

const categoryChartData = ref<ChartData<'pie'>>({
  labels: [],
  datasets: [
    {
      label: 'Categories',
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      data: []
    }
  ]
});

const currencyChartData = ref<ChartData<'bar'>>({
  labels: [],
  datasets: [
    {
      label: 'Currencies',
      backgroundColor: '#4BC0C0',
      data: []
    }
  ]
});

const chartOptions = ref<ChartOptions<'bar' | 'doughnut' | 'pie'>>({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          return tooltipItem.label;
        }
      }
    }
  },
  scales: {
    x: {
      display: false
    }
  }
});

function showChart(chartId: string, chartData: ChartData, chartType: 'bar' | 'doughnut' | 'pie') {
  const canvas = document.getElementById(chartId) as HTMLCanvasElement | null;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: chartType,
        data: chartData,
        options: chartOptions.value
      });
    }
  }
}

async function fetchChartData() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/transactions`);
    const transactions = response.data;

    // Aggregate data for charts
    const paymentMethods = new Map();
    const categories = new Map();
    const currencies = new Map();

    transactions.forEach((transaction: any) => {
      // Payment Methods
      if (!paymentMethods.has(transaction.paymentMethodName)) {
        paymentMethods.set(transaction.paymentMethodName, 0);
      }
      paymentMethods.set(transaction.paymentMethodName, paymentMethods.get(transaction.paymentMethodName) + 1);

      // Categories
      if (!categories.has(transaction.categoryName)) {
        categories.set(transaction.categoryName, 0);
      }
      categories.set(transaction.categoryName, categories.get(transaction.categoryName) + 1);

      // Currencies
      if (!currencies.has(transaction.currencyName)) {
        currencies.set(transaction.currencyName, 0);
      }
      currencies.set(transaction.currencyName, currencies.get(transaction.currencyName) + 1);
    });

    // Update chart data
    paymentMethodChartData.value.labels = Array.from(paymentMethods.keys());
    paymentMethodChartData.value.datasets[0].data = Array.from(paymentMethods.values());

    categoryChartData.value.labels = Array.from(categories.keys());
    categoryChartData.value.datasets[0].data = Array.from(categories.values());

    currencyChartData.value.labels = Array.from(currencies.keys());
    currencyChartData.value.datasets[0].data = Array.from(currencies.values());

    showChart('paymentMethodChart', paymentMethodChartData.value, 'doughnut');
    showChart('categoryChart', categoryChartData.value, 'pie');
    showChart('currencyChart', currencyChartData.value, 'bar');
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}

onMounted(() => {
  showChart('incomeChart', incomeChartData.value, 'bar');
  showChart('expenseChart', expenseChartData.value, 'bar');
  fetchChartData();
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 600px;
  margin: auto;
  margin-bottom: 20px;
}

.container-md {
  background-color: #f8f9fa;
  padding: 20px;
}

.d-flex {
  display: flex;
  justify-content: space-between;
}

.mb-3, .mb-4 {
  margin-bottom: 1rem !important;
}

.form-label {
  margin-right: 10px;
}

.form-select {
  max-width: 200px;
}
</style>
