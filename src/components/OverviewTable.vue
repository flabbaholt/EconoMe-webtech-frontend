<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

interface Transaction {
  id: number;
  name: string;
  type: string;
  amount: number;
  category: string;
  paymentMethod: string;
  currency: string;
  description: string;
  date: string;
}

const transactions = ref<Transaction[]>([]);
const searchTerm = ref('');
const filterYear = ref('');
const filterMonth = ref('');
const filterType = ref('');
const filterCategory = ref('');

const years = ref([2022, 2023, 2024, 2025]);
const months = ref(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);

async function fetchTransactions() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/transactions`);
    transactions.value = response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Transaktionen:", error);
  }
}

async function fetchCurrencyRates() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/currency/rates`);
    console.log('Currency rates:', response.data);
  } catch (error) {
    console.error("Fehler beim Abrufen der Währungskurse:", error);
  }
}

onMounted(() => {
  fetchTransactions();
});

const filteredTransactions = computed(() => {
  return transactions.value.filter(transaction =>
    (filterYear.value === '' || new Date(transaction.date).getFullYear() === parseInt(filterYear.value)) &&
    (filterMonth.value === '' || new Date(transaction.date).toLocaleString('default', { month: 'short' }) === filterMonth.value) &&
    (transaction.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.value.toLowerCase())) &&
    (filterType.value === '' || transaction.type === filterType.value) &&
    (filterCategory.value === '' || transaction.category === filterCategory.value)
  );
});
</script>

<template>
  <div class="container-md border bg-secondary-custom rounded w-50 mt-3">
    <table class="table table-striped mt-3 border rounded-1">
      <thead>
        <div class="mb-2">
          <div class="btn-group me-2" role="group" aria-label="Year filter">
            <button v-for="year in years" :key="year" type="button" class="btn btn-outline-primary btn-sm" @click="filterYear = year.toString()">{{ year }}</button>
          </div>
        </div>
        <div>
          <div class="btn-group" role="group" aria-label="Month filter">
            <button v-for="month in months" :key="month" type="button" class="btn btn-outline-secondary btn-sm" @click="filterMonth = month">{{ month }}</button>
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-outline-success btn-sm" @click="fetchCurrencyRates">Currency</button>
    </div>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th scope="col">Amount</th>
        <th scope="col">Category</th>
        <th scope="col">Payment Method</th>
        <th scope="col">Currency</th>
        <th scope="col">Date</th>
      </tr>
      </thead>
      <tbody>
      
      <tr v-for="(item, index) in transactions" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ item.name }}</td>
        <td>{{ item.typeName }}</td>
        <td>{{ item.amount }}</td>
        <td>{{ item.categoryName }}</td>
        <td>{{ item.paymentMethodName }}</td>
        <td>{{ item.currencyName }}</td>
        <td>{{ item.transactionDate}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container-md {
  max-width: 80%;
  margin: auto;
  padding-top: 20px;
}

.table {
  width: 100%;
  margin-top: 20px;
}
</style>