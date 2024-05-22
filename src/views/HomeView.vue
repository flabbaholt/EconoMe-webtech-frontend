<script setup lang="ts">
import TransactionForm from "@/components/TransactionForm.vue";
import {ref} from "vue";

const total = 350;
const currency = "EUR";
const typeField = ref<string>('');

const setType = (type: string) => {
  typeField.value = type;
}
</script>

<template>
  <main>
    <h1 class="text-center fs-1">This Month:</h1>
    <p :class="{'text-success': total >= 0, 'text-danger': total < 0}" class="text-center fs-2">{{ total < 0 ? '-' : '+' }}{{ Math.abs(total) }} {{ currency }}</p>
    <div class="container-md mx-auto border bg-secondary-custom rounded w-50 justify-content-center">
      <div class="btn-group mt-2" role="group" aria-label="Expense and Income">
        <button type="button" class="btn border border-danger fw-bold text-danger" :class="{'text-bg-danger text-white': typeField === 'Expense'}" style="--bs-border-opacity: .5;" @click="setType('Expense')">Expense</button>
        <button type="button" class="btn border border-success fw-bold text-success" :class="{'text-bg-success text-white': typeField === 'Income'}" style="--bs-border-opacity: .5;" @click="setType('Income')">Income</button>
      </div>
      <TransactionForm />
    </div>

  </main>
</template>

<style>
.bg-secondary-custom {
  background-color: rgba(108, 117, 125, 0.1) !important;
}
</style>