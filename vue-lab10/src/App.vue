<script setup lang="ts">
import { ref } from 'vue'
import Greeting from './components/Greeting.vue'
import CachedNav from './components/CachedNav.vue'

// 组件的局部注册：Greeting、CachedNav 只在本组件内可用
const current = ref('greeting')
</script>

<template>
  <h1>实验十 组件的创建、局部注册与嵌套</h1>

  <nav>
    <button :class="{ active: current === 'greeting' }" @click="current = 'greeting'">
      1、问候语组件（$attrs）
    </button>
    <button :class="{ active: current === 'nav' }" @click="current = 'nav'">
      2、带缓存的导航组件（组件嵌套）
    </button>
  </nav>

  <Greeting
    v-if="current === 'greeting'"
    title="问候语组件"
    name="同学"
    class="my-extra"
    data-index="1"
  />
  <CachedNav v-else />
</template>

<style scoped>
h1 {
  font-size: 22px;
}

nav {
  margin-bottom: 20px;
}

nav button {
  margin-right: 8px;
  padding: 6px 14px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
}

nav button.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #fff;
}
</style>
