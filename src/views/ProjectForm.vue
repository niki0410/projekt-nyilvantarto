<template>
  <div class="hero">
    <h2>Új projekt hozzáadása</h2>
    <form @submit.prevent="validateForm">
      <TextInput
        title="Projekt neve"
        inputId="project-name"
        v-model:inputVModel="projectName"
      />
      <AreaInput
        title="Leírás"
        inputId="project-desc"
        v-model:inputVModel="projectDesc"
      />
      <DateInput
        v-model:inputVModel="startDate"
        labelName="Kezdési dátum:"
        inputId="start-date"
      />
      <NumberInput
        title="Költségvetés"
        inputId="project-budget"
        v-model:inputVModel="projectBudget"
      />
      <input
        type="submit"
        id="saveBtn"
        class="btn btn-primary"
        value="Mentés"
      />
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DateInput from "../components/InputFields/DateInput.vue";
import AreaInput from "../components/InputFields/AreaInput.vue";
import TextInput from "../components/InputFields/TextInput.vue";
import NumberInput from "../components/InputFields/NumberInput.vue";

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
