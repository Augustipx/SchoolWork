<script setup lang="ts">
import { ref, useAttrs, useSlots } from 'vue'

// 普通写法：setup(props, { attrs, slots, emit, expose })

const props = defineProps<{
  name: string
  age: number
}>()

const attrs = useAttrs()

const slots = useSlots()

const emit = defineEmits<{
  (event: 'say-hello', message: string): void
}>()

function sayHello() {
  emit('say-hello', `大家好，我是${props.name}，今年 ${props.age} 岁！`)
}

const score = ref(90)

function addScore(points: number) {
  score.value += points
}

defineExpose({ addScore })
</script>

<template>
  <section class="student-card">
    <header class="card-header">
      <div>
        <p class="tag">① props</p>
        <h2>{{ name }}</h2>
      </div>
      <span class="age">{{ age }} 岁</span>
    </header>

    <div class="row">
      <p class="tag">② attrs</p>
      <p v-if="Object.keys(attrs).length" class="chips">
        <code v-for="(value, key) in attrs" :key="key">{{ key }}="{{ value }}"</code>
      </p>
      <p v-else class="muted">父组件没有传额外属性</p>
    </div>

    <div class="row">
      <p class="tag">③ slots</p>
      <div class="slot-box">
        <slot>
          <span class="muted">父组件没有写内容时，显示这段默认内容。</span>
        </slot>
      </div>
      <p class="hint">
        {{ slots.default ? ' 检测到父组件提供了默认插槽内容' : 'ℹ️ 父组件没有提供插槽内容' }}
      </p>
    </div>

    <div class="row">
      <p class="tag">④ emit</p>
      <button type="button" @click="sayHello">向父组件打招呼</button>
    </div>

    <div class="row">
      <p class="tag">⑤ expose</p>
      <p class="score">当前分数：<strong>{{ score }}</strong> 分</p>
      <p class="hint">父组件通过 ref 调用 addScore(10) 给它加分。</p>
    </div>
  </section>
</template>

<style scoped>
.student-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 24px;
  border: 1px solid #dbe3ef;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(31 41 55 / 6%);
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.tag {
  display: inline-block;
  margin: 0 0 4px;
  padding: 1px 8px;
  border-radius: 999px;
  background: #e8eefc;
  color: #1d4ed8;
  font-size: 12px;
  font-weight: 700;
}

.card-header h2 {
  margin: 0;
  color: #172033;
  font-size: 22px;
  line-height: 1.3;
}

.age {
  flex-shrink: 0;
  padding: 4px 12px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 14px;
  font-weight: 600;
}

.row {
  padding-top: 14px;
  border-top: 1px dashed #e2e8f0;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 6px 0 0;
}

code {
  padding: 2px 8px;
  border-radius: 6px;
  background: #f1f5f9;
  color: #0f766e;
  font-family: Consolas, 'Courier New', monospace;
  font-size: 13px;
}

.slot-box {
  margin-top: 6px;
  padding: 12px 14px;
  border: 1px dashed #bfdbfe;
  border-radius: 8px;
  background: #f8fbff;
  font-size: 14px;
}

.hint {
  margin: 6px 0 0;
  color: #64748b;
  font-size: 13px;
}

.score {
  margin: 6px 0 0;
  color: #475569;
  font-size: 14px;
}

.score strong {
  color: #2563eb;
  font-size: 20px;
}

button {
  margin-top: 8px;
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

button:hover {
  border-color: #1d4ed8;
  background: #1d4ed8;
}

.muted {
  margin: 0;
  color: #94a3b8;
  font-size: 13px;
}
</style>
