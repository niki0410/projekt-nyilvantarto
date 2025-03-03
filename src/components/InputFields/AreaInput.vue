<script setup>
const emit = defineEmits(["update:inputVModel"]);

const props = defineProps({
  inputVModel: {
    type: String,
    default: "",
  },
  inputId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="mb-3">
    <textarea
      class="form-control"
      :id="inputId"
      :value="inputVModel"
      :placeholder="title"
      @input="(event) => emit('update:inputVModel', event.target.value)"
    />
  </div>
</template>
