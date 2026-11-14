<script lang="ts">
import { defineComponent } from 'vue'
import { useCounter } from '@/composables/useCounter'

export default defineComponent({
  name: 'SetupDemo',
  // setup() 是组合式 API 的入口，返回的对象会暴露给模板
  setup() {
    const { count, doubleCount, increment, reset } = useCounter()

    return { count, doubleCount, increment, reset }
  },
})
</script>

<template>
  <section class="demo-card">
    <h2>setup() 组合式 API</h2>
    <p class="desc">
      组件在 setup() 中调用组合式函数 useCounter()，再把 ref、computed 和方法暴露给模板。
    </p>

    <div class="value-row">
      <span>当前计数</span>
      <strong>{{ count }}</strong>
    </div>
    <div class="value-row">
      <span>两倍计数</span>
      <strong>{{ doubleCount }}</strong>
    </div>

    <div class="actions">
      <button type="button" @click="increment">点击 +1</button>
      <button type="button" class="secondary" @click="reset">重置</button>
    </div>
  </section>
</template>

<style scoped>
.demo-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border: 1px solid #dbe3ef;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(31 41 55 / 6%);
}

h2 {
  margin: 0;
  color: #172033;
  font-size: 20px;
}

.desc {
  margin: 0;
  color: #667085;
  font-size: 14px;
}

.value-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 8px;
  background: #f8fafc;
  color: #475569;
  font-size: 14px;
}

.value-row strong {
  color: #2563eb;
  font-size: 20px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

button {
  padding: 8px 14px;
  border: 1px solid #2563eb;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

button:hover {
  border-color: #1d4ed8;
  background: #1d4ed8;
}

button.secondary {
  border-color: #cbd5e1;
  background: #fff;
  color: #475569;
}

button.secondary:hover {
  border-color: #93c5fd;
  color: #2563eb;
}
</style>
