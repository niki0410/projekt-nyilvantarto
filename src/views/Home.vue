<template>
  <div>
    <div class="hero">
      <h1>Projekt Nyilvántartó Alkalmazás</h1>
      <div class="container">
        <div class="row">
          <div class="col" @click="navToList">
            <div class="icon"><i class="bi bi-table"></i></div>
            <div>Projektek Listája</div>
          </div>
          <div class="col" @click="navToForm">
            <div class="icon"><i class="bi bi-file-earmark-plus"></i></div>
            <div>Új Projekt Hozzáadása</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function navToList() {
  router.push("/project-list");
}

function navToForm() {
  router.push("/project-form");
}
</script>
