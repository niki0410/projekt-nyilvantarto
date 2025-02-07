<template>
    <div class="hero-list">
  <div class="container mt-4">
    <div v-if="projects.length !== 0">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Projekt neve</th>
            <th scope="col">Leírás</th>
            <th scope="col">Kezdési dátum</th>
            <th scope="col">Költségvetés</th>
            <th scope="col">Műveletek</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in projects" :key="index">
            <td>{{ project.projectName }}</td>
            <td>{{ project.projectDesc }}</td>
            <td>{{ project.startDate }}</td>
            <td>{{ project.projectBudget }}</td>
            <td>
              <button
                id="editBtn"
                class="btn btn-sm"
                @click="editProject(index)"
              >
                <i class="bi bi-pencil-square"></i>
              </button>
              <button
                id="deleteBtn"
                class="btn btn-sm"
                @click="deleteProject(index)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Nincs adat</div>
  </div>
</div>

</template>

<script setup>
import { ref, onMounted } from "vue";

const projects = ref([]);

onMounted(() => {
  const storedProjects = localStorage.getItem("projects");
  if (storedProjects) {
    projects.value = JSON.parse(storedProjects);
  }
});
// Módosítás funkció
const editProject = (index) => {
  const project = projects.value[index];
  console.log("Módosításra kiválasztott projekt:", project);
  // Itt jöhet a módosítás logika
};

// Törlés funkció
const deleteProject = (index) => {
  projects.value.splice(index, 1);
  localStorage.setItem("projects", JSON.stringify(projects.value));
};
</script>
