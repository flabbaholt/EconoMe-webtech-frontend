<script setup lang="ts">
import { ref } from 'vue';

const transaction = ref({
  name: '',
  type: '',
  amount: 0,
  category: '',
  paymentMethod: '',
  currency: '',
  description: '',
  date: ''
});
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
    <tr v-if="transaction.length === 0">
      <td colspan="8">No transactions yet</td>
    </tr>
    <tr v-for="item in items" :key="item.id">
      <td>{{item.name}}</td>
      <td>{{item.type}}</td>
      <td>{{item.amount}}</td>
      <td>{{item.category}}</td>
      <td>{{item.paymentMethod}}</td>
      <td>{{item.currency}}</td>
      <td>{{item.description}}</td>
      <td>{{item.date}}</td>
    </tr>
    <tr>
      <td>{{ nameField }}</td>
      <td>{{ typeField }}</td>
      <td>{{ amountField }}</td>
      <td>{{ categoryField }}</td>
      <td>{{ paymentMethodField }}</td>
      <td>{{ currencyField }}</td>
      <td>{{ descriptionField }}</td>
      <td>{{ dateField }}</td>
    </tr>
    </tbody>
  </table>
</div>

</template>

<style scoped>

</style>