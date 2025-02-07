<template>
  <div class="hero-list">
    <div class="container">
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
              <td v-if="!editShow[index]">{{ project.projectName }}</td>
              <td v-else><input v-model="project.projectName" class="form-control" /></td>
              <td v-if="!editShow[index]">{{ project.projectDesc }}</td>
              <td v-else><input v-model="project.projectDesc" class="form-control" /></td>
              <td v-if="!editShow[index]">{{ project.startDate }}</td>
              <td v-else><input v-model="project.startDate" class="form-control" type="date" /></td>
              <td v-if="!editShow[index]">{{ project.projectBudget }}</td>
              <td v-else><input v-model="project.projectBudget" class="form-control" type="number" /></td>
              <td>
                <button
                  id="editBtn"
                  class="btn btn-sm"
                  v-if="!editShow[index]"
                  @click="toggleEditShow(index)"
                >
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button
                  id="saveBtn2"
                  class="btn btn-sm"
                  v-else
                  @click="saveProject(index)"
                >
                  <i class="bi bi-floppy"></i>
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
const editShow = ref([]); 

onMounted(() => {
  const storedProjects = localStorage.getItem("projects");
  if (storedProjects) {
    projects.value = JSON.parse(storedProjects);
    editShow.value = Array(projects.value.length).fill(false); 
  }
});

const toggleEditShow = (index) => {
  editShow.value[index] = !editShow.value[index];
};

const saveProject = (index) => {
  editShow.value[index] = false;
  localStorage.setItem("projects", JSON.stringify(projects.value));
  console.log("Mentve:", projects.value[index]);
};

const deleteProject = (index) => {
  projects.value.splice(index, 1);
  editShow.value.splice(index, 1); 
  localStorage.setItem("projects", JSON.stringify(projects.value));
};
</script>
