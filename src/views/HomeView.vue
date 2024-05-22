<script setup lang="ts">
import TransactionForm from "@/components/TransactionForm.vue";
import {ref} from "vue";

const total = 350;
const currency = "EUR";

</script>

<template>
  <main>
    <h1 class="text-center fs-1">This Month:</h1>
    <p :class="{'text-success': total >= 0, 'text-danger': total < 0}" class="text-center fs-2">{{ total < 0 ? '-' : '+' }}{{ Math.abs(total) }} {{ currency }}</p>
    <TransactionForm />

  </main>
</template>

<style>
.bg-secondary-custom {
  background-color: rgba(108, 117, 125, 0.1) !important;
}
</style>