<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import HomeTab from './sections/HomeTab.vue'
import NewsTab from './sections/NewsTab.vue'

// 组件嵌套：CachedNav 内部再引用 HomeTab / NewsTab 两个子组件
const tabs = [
  { key: 'home', label: '首页', component: HomeTab },
  { key: 'news', label: '新闻', component: NewsTab },
]

const activeKey = ref('home')
const activeComponent = shallowRef(HomeTab)

function switchTab(key: string, component: unknown) {
  activeKey.value = key
  activeComponent.value = component as never
}
</script>

<template>
  <div>
    <nav class="tab-nav">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="{ active: activeKey === tab.key }"
        @click="switchTab(tab.key, tab.component)"
      >
        {{ tab.label }}
      </button>
    </nav>

    <!-- KeepAlive 缓存组件，切换回来时状态（输入内容 / 计数）会保留 -->
    <KeepAlive>
      <component :is="activeComponent" />
    </KeepAlive>
  </div>
</template>

<style scoped>
.tab-nav {
  margin-bottom: 12px;
}

.tab-nav button {
  margin-right: 8px;
  padding: 6px 16px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
}

.tab-nav button.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #fff;
}
</style>
