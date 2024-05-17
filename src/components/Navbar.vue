<script setup lang="ts">

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiar">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/EconoMeLogo.jpg" alt="Logo" width="40" height="40" class="d-inline-block">
        EconoMe
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="d-flex justify-content-center align-items-center w-100">
          <div class="navbar-nav nav-underline">
            <router-link class="nav-link" to="/" active-class="active">Home</router-link>
            <router-link class="nav-link" to="/overview" active-class="active">Overview</router-link>
            <router-link class="nav-link" to="/dashboard" active-class="active">Dashboard</router-link>
          </div>
        </div>
      </div>
      <div class="d-flex">
          <span class="navbar-text me-3">
            Hello UserName
            <!-- Implement User-Management Later : User Name needs to stand here later -->
          </span>
        <img class="img-thumbnail rounded-circle" style="width: 50px; height: 50px;" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg">
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-underline .nav-link.active,
.nav-underline .nav-link:hover {
  border-bottom: 2px solid #008000;
}

.navbar {
  box-sizing: border-box;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 10px;
}
</style>