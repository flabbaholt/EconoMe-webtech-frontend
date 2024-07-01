<script setup lang="ts">
import TransactionForm from "@/components/TransactionForm.vue";
import axios from 'axios';
import {onMounted, ref} from "vue";
import OverviewTable from "@/components/OverviewTable.vue";

const totalBalance = ref<number>(0);
const currency = "EUR";

/**
 * @async
 * @function fetchTotalBalance
 * @description Fetches the total balance for the current month and year from the backend and updates the totalBalance reactive variable.
 */
async function fetchTotalBalance() {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() is 0-based
    console.log(currentYear, currentMonth);
    const amountResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/transactions/totalBalance/${currentYear}/${currentMonth}`);
    totalBalance.value = amountResponse.data;
  } catch (error) {
    console.error("Error fetching total balance:", error);
  }
}

// Fetch the total balance when the component is mounted
onMounted(() => {
  fetchTotalBalance();
});
</script>

<template>
  <!--
  The HomeView component displays the total balance for the current month and year, and a form for adding new transactions.

  The total balance is displayed in green if it is greater than or equal to 0, and in red if it is less than 0.

  The TransactionForm component is responsible for providing a form for adding new transactions.
  -->
  <main>
    <h1 class="text-center fs-1">This Month:</h1>
    <p :class="{'text-success': totalBalance >= 0, 'text-danger': totalBalance < 0}" class="text-center fs-2">{{ totalBalance < 0 ? '-' : '+' }}{{ Math.abs(totalBalance) }} {{ currency }}</p>
    <TransactionForm @transaction-saved="fetchTotalBalance"/>

  </main>
</template>

<style>
.bg-secondary-custom {
  background-color: rgba(108, 117, 125, 0.1) !important;
}
</style>