<script setup>
const emit = defineEmits(["update:inputVModel"]);

const props = defineProps({
  inputVModel: {
    type: String,
    default: "",
  },
  labelName: {
    type: String,
    required: true,
  },
  inputId: {
    type: String,
    required: true,
  },
});

const updateValue = (event) => {
  emit("update:inputVModel", event.target.value);
};
</script>

<template>
  <div class="mb-3">
    <label :for="inputId" class="form-label d-block text-start">{{ labelName }}</label>
    <input
      class="form-control"
      type="date"
      :id="inputId"
      :value="inputVModel"
      @input="updateValue"
    />
  </div>
</template>
