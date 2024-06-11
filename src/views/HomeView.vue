<script setup lang="ts">
import TransactionForm from "@/components/TransactionForm.vue";
import axios from 'axios';
import {onMounted, ref} from "vue";

const totalBalance = ref<number>(0);
const currency = "EUR";

async function fetchTotalBalance() {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() is 0-based
    console.log(currentYear, currentMonth);
    const amountResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/totalBalance/${currentYear}/${currentMonth}`);
    totalBalance.value = amountResponse.data;
  } catch (error) {
    console.error("Error fetching total balance:", error);
  }
}

onMounted(() => {
  fetchTotalBalance();
});
</script>

<template>
  <main>
    <h1 class="text-center fs-1">This Month:</h1>
    <p :class="{'text-success': totalBalance >= 0, 'text-danger': totalBalance < 0}" class="text-center fs-2">{{ totalBalance < 0 ? '-' : '+' }}{{ Math.abs(totalBalance) }} {{ currency }}</p>
    <TransactionForm />

  </main>
</template>

<style>
.bg-secondary-custom {
  background-color: rgba(108, 117, 125, 0.1) !important;
}
</style>