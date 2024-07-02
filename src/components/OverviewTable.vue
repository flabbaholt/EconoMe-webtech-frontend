<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

interface Transaction {
  id: number;
  name: string;
  typeName: string;
  amount: number;
  categoryName: string;
  paymentMethodName: string;
  currencyName: string;
  transactionDate: string;
}
// Define the DropdownItem interface
interface DropdownItem {
  id: number;
  name: string;
}
// Define the reactive variables
const transactions = ref<Transaction[]>([]);
const searchTerm = ref('');
const filterYear = ref('');
const filterMonth = ref('');
const filterType = ref('');
const filterCategory = ref('');
const isLoading = ref(true);

const categoryDropdownItems = ref<string[]>([]);
const currencyDropdownItems = ref<string[]>(['EUR']);
const selectedCurrency = ref('EUR');
const selectedYear = ref<number | null>(null);
const selectedMonth = ref<number | null>(null);
const years = ref([]);
const months = ref<number[]>([]);
const currencyRates = new Map<string, number>()

// Define the methods for fetching data, deleting transactions, and handling user interactions
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

async function deleteTransaction(id: number) {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/transactions/deleteById/${id}`);
    console.log('Transaction deleted:', response.data);
    await fetchTransactions();
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
}

async function fetchYears() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/transactions/getYears`);
    years.value = response.data;
    console.log('Years:', years.value)
  } catch (error) {
    console.error("Error fetching years:", error);
  }
}

async function fetchMonths() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/transactions/getMonths`);
    months.value = response.data;
  } catch (error) {
    console.error("Error fetching months:", error);
  }
}

async function fetchMonthsByYear(year: number) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/transactions/getMonthsByYear/${year}`);
    months.value = response.data;
    selectedYear.value = year;
  } catch (error) {
    console.error(`Error fetching months for year ${year}:`, error);
  }
}
async function fetchCurrencyRatesBasedEUR() {
  try {
    isLoading.value = true;
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/currencies/exchangeRates`);
    currencyRates.clear();
    Object.entries(response.data).forEach(([currency, rate]) => {
      currencyRates.set(currency, rate as number);
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Währungskurse:", error);
  } finally {
    isLoading.value = false;
  }
}

function selectCurrency(currency: string) {
  selectedCurrency.value = currency;
}

function getMonthName(monthNumber: number): string {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthNames[monthNumber - 1];
}

function selectMonth(month: number) {
  selectedMonth.value = month;
  filterMonth.value = getMonthName(month); // Update filterMonth when a month is selected
}

function selectYear(year: number) {
  selectedYear.value = year;
  filterYear.value = year.toString(); // Update filterYear when a year is selected
}

function resetFilters() {
  selectedYear.value = null;
  selectedMonth.value = null;
  filterYear.value = '';
  filterMonth.value = '';
}
/*
function calculateAmountInCurrency(amount: number, currency: string, selectedCurrency: string): number {
  if (currency === selectedCurrency) {
    return amount;
  }
  const rate = currencyRates.get(currency);
  const selectedRate = currencyRates.get(selectedCurrency);

  console.log(`Rate for ${currency}:`, rate); // Add logging
  console.log(`Rate for ${selectedCurrency}:`, selectedRate); // Add logging

  if (rate) {
    const eurRate = rate * amount;
    return eurRate / selectedRate!;

  }
  return 0;
}*/

function calculateAmountInCurrency(amount: number, currency: string, selectedCurrency: string): number {
  if (!currency || !selectedCurrency) {
    throw new Error(`Currency or selected currency is undefined`);
  }

  if (currency === selectedCurrency) {
    return amount;
  }

  const rate = currencyRates.get(currency);
  const selectedRate = currencyRates.get(selectedCurrency);

  if (!rate || !selectedRate) {
    throw new Error(`Rates for ${currency} or ${selectedCurrency} not found`);
  }
  const eurAmount = amount / rate;
  const result = eurAmount * selectedRate;
  return parseFloat(result.toFixed(2));
}

function calculateAndCheckAmountInCurrency(amount: number, currency: string, selectedCurrency: string): number {
  if (currency && selectedCurrency) {
    return calculateAmountInCurrency(amount, currency, selectedCurrency);
  } else {
    console.error(`Currency or selected currency is undefined. Currency: ${currency}, Selected Currency: ${selectedCurrency}`);
    return 0;
  }
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
// Fetch data when the component is mounted

onMounted(() => {
  fetchTransactions();
  fetchYears();
  fetchMonths();
  fetchCurrencyRatesBasedEUR();
  fetchCurrencyItems();
});
// Compute the filtered transactions

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
  <!-- The OverviewTable component displays a table of transactions with various controls for filtering and sorting the data. -->
  <div class="container-md border bg-light p-4 rounded mt-3">
    <h2 class="mb-4">Transaction Overview</h2>
    <!-- Controls for filtering and sorting the data -->
    <div class="d-flex justify-content-between mb-3">
      <div>
        <div class="mb-2">
          <button type="button" class="btn btn-outline-danger btn-sm me-2" @click="resetFilters">Remove Filter</button>
          <div class="btn-group me-2" role="group" aria-label="Year filter">
            <button v-for="year in years" :key="year" :class="{'btn-primary text-light': year === selectedYear}" type="button" class="btn btn-outline-primary btn-sm" @click="fetchMonthsByYear(year)">{{ year }}</button>
          </div>
        </div>
        <div>
          <div class="btn-group" role="group" aria-label="Month filter">
            <button v-for="month in months" :key="month" :disabled="selectedYear === null" :class="{'btn-secondary text-light': month === selectedMonth}" class="btn btn-outline-secondary btn-sm" @click="selectMonth(month)">{{ getMonthName(month) }}</button>
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
    <!-- Search input -->
    <div class="mb-3">
      <input v-model="searchTerm" type="text" class="form-control" placeholder="Search transactions..." />
    </div>
    <!-- More controls for filtering the data -->
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
    <!-- The table of transactions -->
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
        <th scope="col">in {{selectedCurrency}}</th>
        <th scope="col">Actions</th>
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
        <td v-if="isLoading">Loading...</td>
        <td v-else>{{calculateAndCheckAmountInCurrency(transaction.amount,transaction.currencyName,selectedCurrency)}}</td>
        <td>
          <div class="btn-group" role="group" aria-label="Transaction Actions">
            <button type="button" class="btn btn-outline-danger" @click="deleteTransaction(transaction.id)" >Delete</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Styles for the OverviewTable component */
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
