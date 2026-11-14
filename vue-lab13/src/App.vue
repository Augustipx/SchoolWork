<script setup lang="ts">
import RenderDemo from './components/RenderDemo.vue'
import SetupDemo from './components/SetupDemo.vue'
</script>

<template>
  <main class="page">
    <header class="page-header">
      <p class="eyebrow">Vue 3 · 实验十三</p>
      <h1><code>render()</code> 与 <code>setup()</code></h1>
      <p class="intro">
        左栏组件用 <code>render()</code> 和 <code>h()</code> 描述界面；右栏组件在
        <code>setup()</code> 中调用组合式函数。
      </p>
    </header>

    <div class="demo-grid">
      <RenderDemo />
      <SetupDemo />
    </div>
  </main>
</template>

<style>
:root {
  color: #1f2937;
  background: #f3f6fb;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

button {
  font: inherit;
}
</style>

<style scoped>
.page {
  max-width: 980px;
  margin: 0 auto;
  padding: 56px 24px 64px;
}

.page-header {
  margin-bottom: 32px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #3b82f6;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: 32px;
  line-height: 1.25;
}

.intro {
  max-width: 720px;
  margin: 12px 0 0;
  color: #5b6474;
}

code {
  padding: 2px 5px;
  border-radius: 4px;
  background: #e8eefc;
  color: #1d4ed8;
  font-family: Consolas, 'Courier New', monospace;
  font-size: 0.92em;
}

h1 code {
  padding: 0;
  background: transparent;
  color: #2563eb;
  font-size: 0.9em;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

@media (max-width: 760px) {
  .page {
    padding-top: 36px;
  }

  h1 {
    font-size: 26px;
  }

  .demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>
