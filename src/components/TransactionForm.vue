<script setup lang="ts">
import { ref } from 'vue';
import AddOptionModal from "@/components/AddOptionModal.vue";

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
const currencyField = ref<string>('EUR');
const descriptionField = ref<string>('');
const dateField = ref<string>('');

const currencyDropdownItems = ref<string[]>(['USD', 'EUR', 'GBP', 'JPY', 'CAD']);
const categoryDropdownItems = ref<string[]>(['Grocery', 'Shopping', 'Apartment', 'Fun', 'Restaurant']);
const paymentDropdownItems = ref<string[]>(['Card', 'Cash', 'Paypal']);

const addCurrency = (newCurrency: string) => {
  if (newCurrency && !currencyDropdownItems.value.includes(newCurrency)) {
    currencyDropdownItems.value.push(newCurrency);
  }
}

const addCategory = (newCategory: string) => {
  if (newCategory && !categoryDropdownItems.value.includes(newCategory)) {
    categoryDropdownItems.value.push(newCategory);
  }
}

const addPaymentMethod = (newPaymentMethod: string) => {
  if (newPaymentMethod && !paymentDropdownItems.value.includes(newPaymentMethod)) {
    paymentDropdownItems.value.push(newPaymentMethod);
  }
}
const setType = (type: string) => {
  typeField.value = type;
}

const transactions = ref<Transaction[]>([]);

function save() {
  let amount = Math.abs(amountField.value);

  if (typeField.value === 'Expense') {
    amount = -amount;
  }
  const newTransaction: Transaction = {
    name: nameField.value,
    type: typeField.value,
    amount: amount,
    category: categoryField.value,
    paymentMethod: paymentMethodField.value,
    currency: currencyField.value,
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
  <div class="container-md border bg-secondary-custom rounded w-50">
    <div class="btn-group mt-2 mb-2" role="group" aria-label="Expense and Income">
      <button type="button" class="btn border border-danger fw-bold text-danger" :class="{'text-bg-danger text-white': typeField === 'Expense'}" style="--bs-border-opacity: .5;" @click="setType('Expense')">Expense</button>
      <button type="button" class="btn border border-success fw-bold text-success" :class="{'text-bg-success text-white': typeField === 'Income'}" style="--bs-border-opacity: .5;" @click="setType('Income')">Income</button>
    </div>


    <form class="row g-3 mb-4">
      <div class="col-md-6">
        <label for="name" class="form-label">Name*</label>
        <input type="text" class="form-control" id="name" v-model="nameField">
      </div>
      <div class="col-md-6">
        <label for="amount" class="form-label">Amount*</label>
        <div class="input-group">
          <input type="number" class="form-control" id="amount" v-model="amountField">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ currencyField }}</button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li v-for="item in currencyDropdownItems" :key="item" @click="currencyField = item">
              <a class="dropdown-item" href="#">{{ item }}</a>
            </li>
            <li>
              <button type="button" class="dropdown-item text-bg-secondary" data-bs-toggle="modal" data-bs-target="#addCurrencyModal">
                + Add Currency
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <label for="category" class="form-label">Category</label>
        <div class="input-group">
          <select class="form-select" id="category" aria-label="category select" v-model="categoryField">
            <option selected disabled>Choose Category...</option>
            <option v-for="item in categoryDropdownItems" :key="item" :value = "item">
              {{ item }}
            </option>
          </select>
          <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#addCategoryModal">Add New</button>
        </div>
      </div>
      <div class="col-md-6">
        <label for="payment" class="form-label">Payment Method</label>
        <div class="input-group">
          <select class="form-select" id="payment" aria-label="paymentMethod select" v-model="paymentMethodField">
            <option selected disabled>Choose Payment Method...</option>
            <option v-for="item in paymentDropdownItems" :key="item" :value = "item">
              {{ item }}
            </option>
          </select>
          <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#addPaymentMethodModal">Add New</button>
        </div>
      </div>
      <div class="col-md-6">
        <label for="date" class="form-label">Date*</label>
        <input type="date" class="form-control" id="date" v-model="dateField">
      </div>
      <div class="col-md-12">
        <button type="submit" class="btn btn-outline-primary btn-lg"  @click.prevent="save">Submit</button>
        <p class="mt-2"> *Make sure the mandatory fields are filled and you chose the correct type!</p>
      </div>
    </form>

    <AddOptionModal modalId="addCurrencyModal" title="Add Currency" placeholder="New currency" @add-option="addCurrency" />
    <AddOptionModal modalId="addCategoryModal" title="Add Category" placeholder="New category" @add-option="addCategory" />
    <AddOptionModal modalId="addPaymentMethodModal" title="Add Payment Method" placeholder="New payment method" @add-option="addPaymentMethod" />

  </div>

  <div>
    <h3 class="mt-3">For Testing Cases Only - To be deleted</h3>
  </div>
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
