<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

interface Transaction {
  name: string;
  typeName: string;
  amount: number;
  categoryName: string;
  paymentMethodName: string;
  currencyName: string;
  transactionDate: string;
}

interface DropdownItem {
  id: number;
  name: string;
}

const transactions = ref<Transaction[]>([]);
const searchTerm = ref('');
const filterYear = ref('');
const filterMonth = ref('');
const filterType = ref('');
const filterCategory = ref('');

const categoryDropdownItems = ref<string[]>([]);
const currencyDropdownItems = ref<string[]>(['EUR']);
const selectedCurrency = ref('EUR');

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

async function fetchCurrencyItems() {
  try {
    const currencyResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/currencies`);
    currencyDropdownItems.value = currencyResponse.data.map((item: DropdownItem) => item.name);
  } catch (error) {
    console.error("Error fetching currency dropdown items:", error);
  }
}

async function fetchCategoryItems() {
  try {
    const categoryResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/categories`);
    categoryDropdownItems.value = categoryResponse.data.map((item: DropdownItem) => item.name);
  } catch (error) {
    console.error("Error fetching category dropdown items:", error);
  }
}
function selectCurrency(currency: string) {
  selectedCurrency.value = currency;
}
/*
async function fetchCurrencyRates() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/currency/rates`);
    console.log('Currency rates:', response.data);
  } catch (error) {
    console.error("Fehler beim Abrufen der Währungskurse:", error);
  }
}
*/
onMounted(() => {
  fetchTransactions();
});

const filteredTransactions = computed(() => {
  return transactions.value.filter(transaction =>
      (filterYear.value === '' || new Date(transaction.transactionDate).getFullYear() === parseInt(filterYear.value)) &&
      (filterMonth.value === '' || new Date(transaction.transactionDate).toLocaleString('default', { month: 'short' }) === filterMonth.value) &&
      (transaction.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          transaction.typeName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          transaction.categoryName.toLowerCase().includes(searchTerm.value.toLowerCase())) &&
      (filterType.value === '' || transaction.typeName === filterType.value) &&
      (filterCategory.value === '' || transaction.categoryName === filterCategory.value)
  );
});
</script>

<template>
  <div class="container-md border bg-light p-4 rounded mt-3">
    <h2 class="mb-4">Transaction Overview</h2>
    <div class="d-flex justify-content-between mb-3">
      <div>
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
      <div class="justify-content-center">
        <button class="btn btn-outline-success btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" @click="fetchCurrencyItems">{{selectedCurrency}}</button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li v-for="item in currencyDropdownItems" :key="item" :value = "item">
            <a class="dropdown-item" href="#" @click="selectCurrency(item)">{{ item }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="mb-3">
      <input v-model="searchTerm" type="text" class="form-control" placeholder="Search transactions..." />
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <select v-model="filterType" class="form-select">
          <option value="">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <div class="col-md-6">
        <select class="form-select" aria-label="category-filter" v-model="filterCategory" @click="fetchCategoryItems">
          <option value>All Categories</option>
          <option v-for="item in categoryDropdownItems" :key="item" :value = "item">
            {{ item }}
          </option>
        </select>
      </div>
    </div>
    <table class="table table-hover table-bordered">
      <thead class="table-dark">
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
      <tr v-for="(transaction, index) in filteredTransactions" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ transaction.name }}</td>
        <td>{{ transaction.typeName }}</td>
        <td>{{ transaction.amount }}</td>
        <td>{{ transaction.categoryName }}</td>
        <td>{{ transaction.paymentMethodName }}</td>
        <td>{{ transaction.currencyName }}</td>
        <td>{{ transaction.transactionDate }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container-md {
  background-color: #f8f9fa;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

.btn-group .btn {
  margin-right: 5px;
}

.mb-3 input {
  width: 100%;
}

.table-dark {
  background-color: #343a40;
  color: white;
}
</style>
