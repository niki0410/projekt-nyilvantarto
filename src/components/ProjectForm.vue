<template>
    <form @submit.prevent="validateForm">
      <div class="mb-3">
        <input
          class="form-control"
          type="text"
          placeholder="Projekt neve"
          id="project-name"
          v-model="projectName"
          @input="validateForm"
          required
        />
      </div>
      <div class="mb-3">
        <textarea
          class="form-control"
          rows="2"
          cols="40"
          placeholder="Leírás"
          id="project-desc"
          v-model="projectDesc"
          @input="validateForm"
        />
      </div>
      <div class="mb-3">
        <label for="start-date" class="form-label">Kezdési dátum: </label>
        <input
          class="form-control"
          type="date"
          id="start-date"
          v-model="startDate"
          @input="validateForm"
        />
      </div>
      <div class="mb-3">
        <input
          class="form-control"
          type="number"
          placeholder="Költségvetés"
          min="0"
          id="project-budget"
          v-model="projectBudget"
          @input="validateForm"
        />
      </div>
      <input type="submit" class="btn btn-primary" />
    </form>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const projectName = ref("");
  const projectDesc = ref("");
  const startDate = ref("");
  const projectBudget = ref("");
  
  const isValidDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };
  
  const validateForm = () => {
    let valid = true;
  
    if (!projectName.value.trim()) {
      valid = false;
    }
  
    if (startDate.value && !isValidDate(startDate.value)) {
      valid = false;
    }
  
    if (projectBudget.value && projectBudget.value <= 0) {
      valid = false;
    }
  
    if (valid) {
      console.log("Űrlap érvényes");
    }
  };
  </script>
  