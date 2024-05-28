<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';

interface Transaction {
  name: string;
  type: string;
  amount: number;
  category: string;
  paymentMethod: string;
  currency: string;
  description: string;
  date: string;
}

// Reaktive Referenz für die Transaktionsdaten
const transactions = ref<Transaction[]>([]);

// Funktion zum Abrufen der Transaktionen vom Backend
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
        <th scope="col">Description</th>
        <th scope="col">Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in transactions" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ item.name }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.amount }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.paymentMethod }}</td>
        <td>{{ item.currency }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.date }}</td>
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