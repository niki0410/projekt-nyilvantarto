<template>
  <div class="hero-list">
    <div class="content-container">
      <div class="searchBar">
        <div class="input-group">
          <input
            type="text"
            class="form-control search-input"
            placeholder="Név szerinti keresés..."
            id="searchInput"
            @keyup="search"
          />
          <span class="input-group-text"><i class="bi bi-search"></i></span>
        </div>
      </div>
      <div class="table-container">
        <div v-if="projects.length !== 0">
          <table class="table table-striped" id="listTable">
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
                <td v-else>
                  <input v-model="project.projectName" class="form-control" />
                </td>
                <td v-if="!editShow[index]">{{ project.projectDesc }}</td>
                <td v-else>
                  <input v-model="project.projectDesc" class="form-control" />
                </td>
                <td v-if="!editShow[index]">{{ formattedDates[index] }}</td>
                <td v-else>
                  <input
                    v-model="project.startDate"
                    class="form-control"
                    type="date"
                  />
                </td>
                <td v-if="!editShow[index]">
                  {{ formatBudget(project.projectBudget) }}
                </td>
                <td v-else>
                  <input
                    v-model="project.projectBudget"
                    class="form-control"
                    type="number"
                  />
                </td>
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
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const projects = ref([]);
const editShow = ref([]);
const formattedDates = ref([]);

onMounted(() => {
  const storedProjects = localStorage.getItem("projects");
  if (storedProjects) {
    projects.value = JSON.parse(storedProjects);
    editShow.value = Array(projects.value.length).fill(false);
    updateFormattedDates();
  }
});

const formatDate = (date) => {
  const d = new Date(date);
  return isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
};

const updateFormattedDates = () => {
  formattedDates.value = projects.value.map((project) =>
    formatDate(project.startDate)
  );
};

watch(projects, updateFormattedDates, { deep: true });

const formatBudget = (budget) => {
  if (!budget || isNaN(budget)) return "";
  return new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(budget);
};

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

function search() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("listTable");
  tr = table.getElementsByTagName("tr");

  for (i = 1; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
</script>
