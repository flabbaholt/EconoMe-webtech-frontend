<script setup lang="ts">

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="@/assets/EconoMeLogo.jpg" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
        EconoMe
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="d-flex justify-content-center align-items-center w-100">
          <div class="navbar-nav nav-underline">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
            <a class="nav-link" href="#">Overview</a>
            <a class="nav-link" href="#">Dashboard</a>
          </div>
        </div>
      </div>
      <div class="d-flex">
          <span class="navbar-text me-3">
            UserName
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