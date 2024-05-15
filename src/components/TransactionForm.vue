<script setup lang="ts">
import { ref, Ref } from 'vue';

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

const nameField = ref<string>('');
const typeField = ref<string>('');
const amountField = ref<number>(0);
const categoryField = ref<string>('');
const paymentMethodField = ref<string>('');
const currencyField = ref<string>('');
const descriptionField = ref<string>('');
const dateField = ref<string>('');

const transactions = ref<Transaction[]>([]);

function save() {
  const newTransaction: Transaction = {
    name: nameField.value,
    type: typeField.value,
    amount: amountField.value,
    category: categoryField.value,
    paymentMethod: paymentMethodField.value,
    currency: currencyField.value,
    description: descriptionField.value,
    date: dateField.value
  };

  transactions.value.push(newTransaction);

  // Clear fields after adding the transaction
  nameField.value = '';
  typeField.value = '';
  amountField.value = 0;
  categoryField.value = '';
  paymentMethodField.value = '';
  currencyField.value = '';
  descriptionField.value = '';
  dateField.value = '';
}
</script>


<template>
  <div>
    <input v-model="nameField" placeholder="Name" type="text">
    <input v-model="typeField" placeholder="Type" type="text">
    <input v-model="amountField" placeholder="Amount" type="number">
    <input v-model="categoryField" placeholder="Category" type="text">
    <input v-model="paymentMethodField" placeholder="Payment Method" type="text">
    <input v-model="currencyField" placeholder="Currency" type="text">
    <input v-model="descriptionField" placeholder="Description" type="text">
    <input v-model="dateField" placeholder="Date" type="date">
    <button type="button" @click="save()">Save</button>
  </div>

  <div>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Amount</th>
        <th>Category</th>
        <th>Payment Method</th>
        <th>Currency</th>
        <th>Description</th>
        <th>Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="transactions.length === 0">
        <td colspan="8">No transactions yet</td>
      </tr>
      <tr v-for="transaction in transactions" :key="transaction.date">
        <td>{{ transaction.name }}</td>
        <td>{{ transaction.type }}</td>
        <td>{{ transaction.amount }}</td>
        <td>{{ transaction.category }}</td>
        <td>{{ transaction.paymentMethod }}</td>
        <td>{{ transaction.currency }}</td>
        <td>{{ transaction.description }}</td>
        <td>{{ transaction.date }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<style scoped>

</style>
