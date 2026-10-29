<script setup lang="ts">
import { ref } from 'vue'

const name = ref('张三')
</script>

<template>
  <section class="panel">
    <h4>首页内容</h4>
    <p>输入框内容被修改后切换标签再回来，输入内容依然保留（因为组件被 KeepAlive 缓存）。</p>
    <input v-model="name" placeholder="请输入文字" />
  </section>
</template>

<style scoped>
.panel {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.panel p {
  margin: 0 0 10px;
  color: #666;
}
</style>
