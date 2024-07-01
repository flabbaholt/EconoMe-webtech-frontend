<template>
  <div class="container-md border bg-light p-4 rounded mt-3">
    <h2 class="mb-4">Dashboard</h2>
    <div class="controls mb-4">
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select Year
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li v-for="year in years" :key="year">
            <a class="dropdown-item" @click="fetchDataByYear(year)">{{ year }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="chart-area">
      <canvas id="incomeExpenseChart"></canvas>
    </div>
    <div class="chart-area mt-4">
      <canvas id="monthlyIncomeChart"></canvas>
    </div>
    <div class="chart-area mt-4">
      <canvas id="monthlyExpenseChart"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';

interface Transaction {
  transactionDate: string;
  type: { name: string };
  amount: number;
}

const years = ref<number[]>([]);
const incomeExpenseChart = ref<Chart | null>(null);
const monthlyIncomeChart = ref<Chart | null>(null);
const monthlyExpenseChart = ref<Chart | null>(null);

const fetchDataByYear = async (year: number) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/transactions/dashboard`, { params: { year } });
    const data: Transaction[] = response.data;

    let totalIncome = 0;
    let totalExpense = 0;

    const monthlyIncomeData = Array(12).fill(0);
    const monthlyExpenseData = Array(12).fill(0);

    data.forEach(item => {
      if (!item || !item.type || !item.type.name) {
        console.error(`Invalid item received: ${JSON.stringify(item)}`);
        return;
      }
      const month = new Date(item.transactionDate).getMonth();
      if (item.type.name === 'Income') {
        totalIncome += item.amount;
        monthlyIncomeData[month] += item.amount;
      } else if (item.type.name === 'Expense') {
        totalExpense += item.amount;
        monthlyExpenseData[month] += item.amount;
      }
    });

    updateChart(incomeExpenseChart, 'Income vs Expense', ['Income', 'Expense'], [totalIncome, totalExpense], 'doughnut', ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'], ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)']);
    updateChart(monthlyIncomeChart, 'Monthly Income', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], monthlyIncomeData, 'bar', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 1)');
    updateChart(monthlyExpenseChart, 'Monthly Expense', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], monthlyExpenseData, 'bar', 'rgba(75, 192, 192, 0.2)', 'rgba(75, 192, 192, 1)');
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
};

const updateChart = (chartRef: any, label: string, labels: string[], data: number[], type: 'doughnut' | 'bar', bgColors: string | string[], borderColors: string | string[]) => {
  const ctx = document.getElementById(
    chartRef === incomeExpenseChart
      ? 'incomeExpenseChart'
      : chartRef === monthlyIncomeChart
        ? 'monthlyIncomeChart'
        : 'monthlyExpenseChart'
  ) as HTMLCanvasElement;

  if (chartRef.value) {
    chartRef.value.destroy();
    chartRef.value = null;
  }

  if (ctx) {
    chartRef.value = new Chart(ctx, {
      type: type,
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: Array.isArray(bgColors) ? bgColors : [bgColors],
            borderColor: Array.isArray(borderColors) ? borderColors : [borderColors],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
};

onMounted(async () => {
  try {
    const yearsResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/transactions/getYears`);
    years.value = yearsResponse.data;
    if (years.value.length > 0) {
      fetchDataByYear(years.value[0]);
    }
  } catch (error) {
    console.error('Error fetching years:', error);
  }
});
</script>

<style scoped>
.chart-area {
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
}
</style>
