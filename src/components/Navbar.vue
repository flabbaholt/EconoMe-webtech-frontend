<script setup lang="ts">
// No script logic defined here.
</script>

<template>
  <!-- Navbar component for the EconoMe application. -->
  <nav class="navbar navbar-expand-lg bg-body-tertiar">
    <div class="container-fluid">
      <!-- Logo and link to the home page. -->
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/EconoMeLogo.jpg" alt="Logo" width="40" height="40" class="d-inline-block">
        EconoMe
      </router-link>
      <!-- Toggler for mobile navigation -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Navigation links -->
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="d-flex justify-content-center align-items-center w-100">
          <div class="navbar-nav nav-underline">
            <!-- Navigation link to the Home page -->
            <router-link class="nav-link" to="/" active-class="active">Home</router-link>
            <!-- Navigation link to the Overview page -->
            <router-link class="nav-link" to="/overview" active-class="active">Overview</router-link>
            <!-- Navigation link to the Dashboard page -->
            <router-link class="nav-link" to="/dashboard" active-class="active">Dashboard</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Styles for active or hovered navigation links */
.nav-underline .nav-link.active,
.nav-underline .nav-link:hover {
  border-bottom: 2px solid #008000;
}

/* Basic styling for the navbar */
.navbar {
  box-sizing: border-box;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 10px;
}
</style>