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

async function fetchTransactions() {
  try {
    console.log('Backend URL:', import.meta.env.VITE_APP_BACKEND_BASE_URL); // Log the backend URL
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/transactions`);
    transactions.value = response.data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Transaktionen:", error);
  }
}

// Abrufen der Transaktionen beim Mounten der Komponente
onMounted(() => {
  fetchTransactions();
});
</script>

<template>
  <div class="container-md border bg-secondary-custom rounded w-50 mt-3">
    <table class="table table-striped mt-3 border rounded-1">
      <thead>
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