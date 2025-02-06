<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">🌿</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Főoldal</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/project-list">Projektek Listája</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/project-form">Új Projekt Hozzáadása</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </template>
  <script setup>
  import '.././style.css'
  </script>
