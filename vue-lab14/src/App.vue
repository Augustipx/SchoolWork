<script setup lang="ts">
import { ref } from 'vue'
import SetupParamsDemo from './components/SetupParamsDemo.vue'

const cardRef = ref<InstanceType<typeof SetupParamsDemo> | null>(null)

const messages = ref<string[]>([])

function handleSayHello(message: string) {
  messages.value.push(message)
}

function reward() {
  cardRef.value?.addScore(10)
}
</script>

<template>
  <main class="page">
    <header class="page-header">
      <p class="eyebrow">Vue 3 · 实验十四</p>
      <h1><code>setup()</code> 的参数</h1>
      <p class="intro">
        普通写法是 <code>setup(props, context)</code>；用 <code>&lt;script setup&gt;</code>
        语法糖时，props 和 context 里的 attrs、slots、emit、expose 分别用 5 个 API 来使用。
        下面这张学生名片就是一个完整的小例子。
      </p>
    </header>

    <div class="demo-grid">
      <SetupParamsDemo
        ref="cardRef"
        name="小明"
        :age="12"
        title="今天是小明的生日"
        data-class="六年级（2）班"
        @say-hello="handleSayHello"
      >
        <span class="slot-content">🏅 三好学生 · 本周值日生</span>
      </SetupParamsDemo>

      <section class="panel">
        <p class="panel-tag">父组件</p>
        <h2>接收事件 &amp; 调用子组件</h2>
        <p class="panel-desc">
          子组件用 <code>emit('say-hello', 消息)</code> 把话传上来；父组件用
          <code>ref</code> 调用子组件用 <code>defineExpose</code> 暴露的
          <code>addScore()</code>。
        </p>

        <button type="button" class="reward-btn" @click="reward">家长奖励 +10 分</button>

        <div class="message-box">
          <p class="label">已收到的 say-hello 消息</p>
          <ul v-if="messages.length">
            <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
          </ul>
          <p v-else class="muted">还没有消息，先点左边卡片里的“向父组件打招呼”吧。</p>
        </div>
      </section>
    </div>

    <section class="mapping">
      <h2>对照表：<code>setup()</code> 参数与语法糖写法</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>setup() 参数</th>
              <th>&lt;script setup&gt; 写法</th>
              <th>作用</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>props</code></td>
              <td><code>defineProps()</code></td>
              <td>接收父组件传进来的数据</td>
            </tr>
            <tr>
              <td><code>context.attrs</code></td>
              <td><code>useAttrs()</code></td>
              <td>接收没被 props 声明的属性</td>
            </tr>
            <tr>
              <td><code>context.slots</code></td>
              <td><code>useSlots()</code></td>
              <td>读取父组件传入的插槽内容</td>
            </tr>
            <tr>
              <td><code>context.emit</code></td>
              <td><code>defineEmits()</code></td>
              <td>子组件向父组件发送事件</td>
            </tr>
            <tr>
              <td><code>context.expose</code></td>
              <td><code>defineExpose()</code></td>
              <td>把方法或数据交给父组件的 ref 调用</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
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
  max-width: 1040px;
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
  max-width: 780px;
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
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 24px;
  align-items: start;
}

.panel {
  padding: 24px;
  border: 1px solid #dbe3ef;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(31 41 55 / 6%);
}

.panel-tag {
  display: inline-block;
  margin: 0 0 6px;
  padding: 1px 8px;
  border-radius: 999px;
  background: #e8eefc;
  color: #1d4ed8;
  font-size: 12px;
  font-weight: 700;
}

.panel h2 {
  margin: 0 0 8px;
  color: #172033;
  font-size: 20px;
}

.panel-desc {
  margin: 0;
  color: #667085;
  font-size: 14px;
}

.reward-btn {
  margin-top: 16px;
  padding: 8px 16px;
  border: 1px solid #2563eb;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.reward-btn:hover {
  border-color: #1d4ed8;
  background: #1d4ed8;
}

.message-box {
  margin-top: 16px;
  padding: 14px 16px;
  border-radius: 8px;
  background: #f8fafc;
}

.label {
  margin: 0;
  color: #475569;
  font-size: 13px;
  font-weight: 600;
}

.message-box ul {
  margin: 8px 0 0;
  padding-left: 18px;
  color: #344054;
  font-size: 14px;
}

.muted {
  margin: 8px 0 0;
  color: #94a3b8;
  font-size: 13px;
}

.slot-content {
  color: #1e3a8a;
  font-weight: 600;
}

.mapping {
  margin-top: 32px;
  padding: 24px;
  border: 1px solid #dbe3ef;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(31 41 55 / 6%);
}

.mapping h2 {
  margin: 0 0 16px;
  color: #172033;
  font-size: 20px;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th,
td {
  padding: 10px 12px;
  border-bottom: 1px solid #e5eaf2;
  text-align: left;
  white-space: nowrap;
}

th {
  background: #f8fafc;
  color: #475569;
  font-weight: 600;
}

td {
  color: #344054;
}

td:last-child {
  white-space: normal;
}

@media (max-width: 820px) {
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
