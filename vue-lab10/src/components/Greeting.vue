<script setup lang="ts">
import { useAttrs } from 'vue'

// 通过 props 接收常用的属性
defineProps<{ title: string; name: string }>()

// 没有被声明为 props 的属性 / 事件会进入 $attrs，可用 useAttrs() 获取
const attrs = useAttrs()
</script>

<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <p>你好，{{ name }}！欢迎使用 Vue 组件。</p>
    <p class="attrs">组件通过 $attrs 接收到的额外属性：{{ JSON.stringify(attrs) }}</p>
  </div>
</template>

<style scoped>
.card {
  max-width: 420px;
  padding: 16px;
  border: 1px solid #3b82f6;
  border-radius: 8px;
  background: #f7faff;
}

.card h3 {
  margin: 0 0 8px;
}

.attrs {
  margin: 0;
  color: #666;
  font-size: 13px;
  word-break: break-all;
}
</style>
