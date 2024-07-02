<script setup lang="ts">
import {ref, onMounted, computed, watch, defineEmits} from 'vue';
import axios from 'axios';
import AddOptionModal from "@/components/AddOptionModal.vue";
import HomeView from "@/views/HomeView.vue";
import { validCurrencies } from '../validCurrencies';

// Emits an event when a transaction is successfully saved
const emit = defineEmits(['transaction-saved']);

/**
 * @interface Transaction
 * @description Interface for a transaction object
 */
interface Transaction {
  name: string;
  typeId: number;
  amount: number;
  categoryId: number | null;
  paymentMethodId: number | null;
  currencyId: number | null;
  transactionDate: string;
}
/**
 * @interface DropdownItem
 * @description Interface for a dropdown item object
 */
export interface DropdownItem {
  id: number;
  name: string;
}

// Define the reactive variables
const nameField = ref<string>('');
const typeField = ref<string>('');
const amountField = ref<number>(0);
const categoryField = ref<number | null>(null);
const paymentMethodField = ref<number | null>(null);
const currencyField = ref<number | null>(null);
const dateField = ref<string>('');

// Reactive state variables for dropdown options
const currencyDropdownItems = ref<DropdownItem[]>([]);
const categoryDropdownItems = ref<DropdownItem[]>([]);
const paymentDropdownItems = ref<DropdownItem[]>([]);

// Computed property to validate form data
let formValid = ref(false);
watch([nameField, typeField, amountField, currencyField, dateField, categoryField, paymentMethodField], () => {
  formValid.value = Boolean(nameField.value && typeField.value && amountField.value && dateField.value && currencyField.value && categoryField.value && paymentMethodField.value && (typeField.value === 'Expense' || typeField.value === 'Income'));
}, { immediate: true });

/**
 * Adds a new category to the list of categories.
 * @param {DropdownItem} newCategory - The new category to add.
 */
const addCategory = async (newCategory: DropdownItem) => {
  if (newCategory && newCategory.name && !categoryDropdownItems.value.some(item => item.name === newCategory.name)) {
    try {
      const categoryData = {
        id: newCategory.id,
        name: newCategory.name
      };
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/categories`, categoryData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      categoryDropdownItems.value.push(response.data);
      await fetchCategoryItems(); // Fetch the updated list of categories
    } catch (error) {
      console.error("Error adding new category:", error);
    }
  }
}

/**
 * Adds a new payment method to the list of payment methods.
 * @param {DropdownItem} newPaymentMethod - The new payment method to add.
 */
const addPaymentMethod = async (newPaymentMethod: DropdownItem) => {
  if (newPaymentMethod && newPaymentMethod.name && !paymentDropdownItems.value.some(item => item.name === newPaymentMethod.name)) {
    try {
      const paymentMethodData = {
        id: newPaymentMethod.id,
        name: newPaymentMethod.name
      };
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/paymentMethods`, paymentMethodData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      paymentDropdownItems.value.push(response.data);
      await fetchPaymentItems(); // Fetch the updated list of payment methods
    } catch (error) {
      console.error("Error adding new payment method:", error);
    }
  }
}

/**
 * Adds a new currency to the list of currencies.
 * @param {DropdownItem} newCurrency - The new currency to add.
 */
const addCurrency = async (newCurrency: DropdownItem) => {
  if (newCurrency && newCurrency.name && !currencyDropdownItems.value.some(item => item.name === newCurrency.name)) {
    // Check if the new currency is valid
    if (!validCurrencies.includes(newCurrency.name)) {
      throw new Error("Invalid currency");
    }

    try {
      const currencyData = {
        id: newCurrency.id,
        name: newCurrency.name
      };
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/currencies`, currencyData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      currencyDropdownItems.value.push(response.data);
      await fetchCurrencyItems(); // Fetch the updated list of currencies
    } catch (error) {
      console.error("Error adding new currency:", error);
    }
  }
}

/**
 * Sets the transaction type (Expense or Income).
 * @param {string} type - The transaction type.
 */
const setType = (type: string) => {
  typeField.value = type;
}
// Reactive variable for holding the list of transactions
const transactions = ref<Transaction[]>([]);


// Methods for fetching data from the backend
async function fetchDropdownItems() {
  try {
    const currencyResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/currencies`);
    currencyDropdownItems.value = currencyResponse.data;

    const categoryResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/categories`);
    categoryDropdownItems.value = categoryResponse.data;

    const paymentResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/paymentMethods`);
    paymentDropdownItems.value = paymentResponse.data;
  } catch (error) {
    console.error("Error fetching dropdown items:", error);
  }
}

// Fetches currency items and sets the default currency if available

async function fetchCurrencyItems() {
  try {
    const currencyResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/currencies`);
    currencyDropdownItems.value = currencyResponse.data;

    // Find the ID of "EUR" and set it as the default value for currencyField
    const eurCurrency = currencyDropdownItems.value.find(item => item.name === 'EUR');
    if (eurCurrency) {
      currencyField.value = eurCurrency.id;
    }
  } catch (error) {
    console.error("Error fetching currency dropdown items:", error);
  }
}

async function fetchCategoryItems() {
  try {
    const categoryResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/categories`);
    categoryDropdownItems.value = categoryResponse.data;
  } catch (error) {
    console.error("Error fetching category dropdown items:", error);
  }
}


async function fetchPaymentItems() {
  try {
    const paymentResponse = await axios.get(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/paymentMethods`);
    paymentDropdownItems.value = paymentResponse.data;
  } catch (error) {
    console.error("Error fetching paymentmethod dropdown items:", error);
  }
}

  async function save() {
    let amount = Math.abs(amountField.value);

    let typeId: number;
    if (typeField.value === 'Expense') {
      amount = -amount;
      typeId = 1;
    } else if (typeField.value === 'Income') {
      typeId = 2;
    } else {
      console.error("Invalid transaction type");
      return;
    }

    const newTransaction: Transaction = {
      name: nameField.value,
      typeId: typeId,
      amount: amount,
      categoryId: categoryDropdownItems.value.find(item => item.id === categoryField.value)?.id || null,
      paymentMethodId: paymentDropdownItems.value.find(item => item.id === paymentMethodField.value)?.id || null,
      currencyId: currencyDropdownItems.value.find(item => item.id === currencyField.value)?.id || null,
      transactionDate: dateField.value,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}/transactions`, newTransaction);
      console.log(response.data);
      transactions.value.push(newTransaction);
      emit('transaction-saved');
    } catch (error) {
      console.error("Error posting transaction:", error);
    }

    // Clear fields after adding the transaction
    nameField.value = '';
    typeField.value = '';
    amountField.value = 0;
    categoryField.value = null;
    paymentMethodField.value = null;
    currencyField.value = null;
    dateField.value = '';



  }


onMounted(() => {
  fetchDropdownItems();
  fetchCurrencyItems();
});

</script>


<template>
  <!-- The TransactionForm component provides a form for adding new transactions. -->
  <div class="container-md border bg-secondary-custom rounded w-50">
    <div class="btn-group mt-2 mb-2" role="group" aria-label="Expense and Income">
      <button type="button" class="btn border border-danger fw-bold text-danger" :class="{'text-bg-danger text-white': typeField === 'Expense'}" style="--bs-border-opacity: .5;" @click="setType('Expense')">Expense</button>
      <button type="button" class="btn border border-success fw-bold text-success" :class="{'text-bg-success text-white': typeField === 'Income'}" style="--bs-border-opacity: .5;" @click="setType('Income')">Income</button>
    </div>

    <!-- Form for adding new transactions -->
    <form class="row g-3 mb-4" @submit.prevent="save">
      <div class="col-md-6">
        <label for="name" class="form-label">Name*</label>
        <input type="text" class="form-control" id="name" v-model="nameField">
      </div>
      <div class="col-md-6">
        <label for="amount" class="form-label">Amount*</label>
        <div class="input-group">
          <input type="number" class="form-control" id="amount" v-model="amountField" step="0.01">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" @click="fetchCurrencyItems">
            {{ currencyDropdownItems.find(item => item.id === (currencyField || 0))?.name || 'Select Currency' }}
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li v-for="item in currencyDropdownItems" :key="item.id" @click="currencyField = item.id">
              <a class="dropdown-item" href="#">{{ item.name }}</a>
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
        <label for="category" class="form-label">Category*</label>
        <div class="input-group">
          <select class="form-select" id="category" aria-label="category select" v-model="categoryField" @click="fetchCategoryItems">
            <option selected disabled>Choose Category...</option>
            <option v-for="item in categoryDropdownItems" :key="item.id" :value = "item.id">
              {{ item.name }}
            </option>
          </select>
          <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#addCategoryModal">Add New</button>
        </div>
      </div>
      <div class="col-md-6">
        <label for="payment" class="form-label">Payment Method*</label>
        <div class="input-group">
          <select class="form-select" id="payment" aria-label="paymentMethod select" v-model="paymentMethodField" @click="fetchPaymentItems">
            <option selected disabled>Choose Payment Method...</option>
            <option v-for="item in paymentDropdownItems" :key="item.id" :value = "item.id">
              {{ item.name }}
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
        <button type="submit" class="btn btn-outline-primary btn-lg" :disabled="!formValid" >Submit</button>
        <p class="mt-2"> *Make sure the mandatory fields are filled and you chose the correct type!</p>
      </div>
    </form>

    <AddOptionModal modalId="addCurrencyModal" title="Add Currency" placeholder="New currency" endpoint="currencies" @add-option="addCurrency" />
    <AddOptionModal modalId="addCategoryModal" title="Add Category" placeholder="New category" endpoint="categories" @add-option="addCategory" />
    <AddOptionModal modalId="addPaymentMethodModal" title="Add Payment Method" placeholder="New payment method" endpoint="paymentMethods" @add-option="addPaymentMethod" />


  </div>


</template>

<style scoped>
</style>
