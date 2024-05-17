<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <navbar></navbar>
  <router-view/>
</template>

<style>
navbar {
  margin-bottom: 20px;
}
</style>
