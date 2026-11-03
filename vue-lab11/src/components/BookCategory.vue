<script setup lang="ts">
defineProps<{
  categories: string[]
  selected: string
}>()

const emit = defineEmits<{
  select: [category: string]
}>()
</script>

<template>
  <aside class="category">
    <h2>书籍分类</h2>
    <button
      v-for="category in categories"
      :key="category"
      :class="{ active: category === selected }"
      @click="emit('select', category)"
    >
      {{ category }}
    </button>
  </aside>
</template>

<style scoped>
.category {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

h2 {
  margin: 0 0 4px;
  font-size: 17px;
}

button {
  padding: 7px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  color: #333;
  text-align: left;
  cursor: pointer;
}

button.active {
  border-color: #3b82f6;
  background: #3b82f6;
  color: #fff;
}
</style>
