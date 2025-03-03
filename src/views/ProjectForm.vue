<template>
    <div class="hero">
    <h2>Új projekt hozzáadása</h2>
    <form @submit.prevent="validateForm">
      <div class="mb-3">
        <input
          class="form-control"
          type="text"
          placeholder="Projekt neve"
          id="project-name"
          v-model="projectName"
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
        />
      </div>
      <div class="mb-3">
        <label for="start-date" class="form-label" id="startDateLabel">Kezdési dátum: </label>
        <input
          class="form-control"
          type="date"
          id="start-date"
          v-model="startDate"
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
        />
      </div>
      <input type="submit" id="saveBtn" class="btn btn-primary" value="Mentés"/>
    </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const projectName = ref("");
  const projectDesc = ref("");
  const startDate = ref("");
  const projectBudget = ref("");
  
  const validateForm = () => {
    let valid = true;
  
    const isValidDate = (date) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/; 
      return regex.test(date);
    };
  
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
  
      const newProject = {
        projectName: projectName.value,
        projectDesc: projectDesc.value,
        startDate: startDate.value,
        projectBudget: projectBudget.value,
      };
  
      const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];
      existingProjects.push(newProject);
      localStorage.setItem("projects", JSON.stringify(existingProjects));
  
      projectName.value = "";
      projectDesc.value = "";
      startDate.value = "";
      projectBudget.value = "";
    } else {
      console.log("Űrlap érvénytelen");
    }
  };
  </script>
  