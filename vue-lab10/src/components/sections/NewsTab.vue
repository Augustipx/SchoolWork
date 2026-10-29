<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <section class="panel">
    <h4>新闻页面</h4>
    <p>点击按钮的次数会一直保留：{{ count }}</p>
    <button @click="count++">点我计数</button>
  </section>
</template>

<style scoped>
.panel {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.panel p {
  color: #666;
}
</style>
