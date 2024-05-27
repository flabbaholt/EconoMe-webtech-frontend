<script setup lang="ts">

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
      <tr v-for="(item, index) in data" :key="index">
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

</style>