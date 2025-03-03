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
            @input="search"
          />
          <span class="input-group-text"><i class="bi bi-search"></i></span>
        </div>
      </div>
      <div class="table-container">
        <div v-if="filteredProjects && filteredProjects.length">
          <Table
            :headers="tableColumnLabels"
            :rows="filteredProjects"
            :edit-show="editShow"
            :format-date="formatDate"
            :format-budget="formatBudget"
            @edit-row="editRow"
            @save-row="saveRow"
            @delete-row="deleteProject"
          />
        </div>
        <div v-else>Nincs adat</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Table from "../components/Table.vue";

const projects = ref([]);
const editShow = ref([]);
const formattedDates = ref([]);
const filteredProjects = ref([]);
const tableColumnLabels = ref([
  "Projekt neve",
  "Leírás",
  "Kezdési dátum",
  "Költségvetés",
  "Műveletek",
]);

onMounted(() => {
  const storedProjects = localStorage.getItem("projects");
  if (storedProjects) {
    projects.value = JSON.parse(storedProjects);
    filteredProjects.value = [...projects.value];
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

const editRow = (index) => {
  editShow.value[index] = true;
};

const saveRow = (index, updatedRow) => {
  editShow.value[index] = false;
  projects.value[index] = updatedRow;
  localStorage.setItem("projects", JSON.stringify(projects.value));
  filteredProjects.value = [...projects.value];
};

const deleteProject = (index) => {
  projects.value.splice(index, 1);
  editShow.value.splice(index, 1);
  localStorage.setItem("projects", JSON.stringify(projects.value));
  filteredProjects.value = [...projects.value];
};

function search(event) {
  const searchTerm = event.target.value.toLowerCase();
  filteredProjects.value = projects.value.filter((project) =>
    project.projectName.toLowerCase().includes(searchTerm)
  );
}
</script>
