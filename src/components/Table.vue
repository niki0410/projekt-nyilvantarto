<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td v-for="(value, key) in row" :key="key">
          <div v-if="!localEditShow[index]">
            {{
              key === "startDate"
                ? formatDate(value)
                : key === "projectBudget"
                ? formatBudget(value)
                : value
            }}
          </div>
          <input
            v-else
            v-model="row[key]"
            class="form-control"
            :type="
              key === 'startDate'
                ? 'date'
                : key === 'projectBudget'
                ? 'number'
                : 'text'
            "
          />
        </td>
        <td>
          <button
            v-if="!localEditShow[index]"
            class="btn btn-sm"
            @click="$emit('edit-row', index)"
          >
            <i class="bi bi-pencil-square"></i>
          </button>
          <button
            v-else
            class="btn btn-sm"
            @click="$emit('save-row', index, row)"
          >
            <i class="bi bi-floppy"></i>
          </button>
          <button class="btn btn-sm" @click="$emit('delete-row', index)">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  headers: Array,
  rows: Array,
  editShow: Array,
  formatDate: Function,
  formatBudget: Function,
});

const localEditShow = computed(() => [...props.editShow]);
</script>
