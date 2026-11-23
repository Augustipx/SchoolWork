<script setup lang="ts">
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  provide,
  ref,
} from 'vue'

import LifecycleChild from './LifecycleChild.vue'

const showChild = ref(true)
const count = ref(0)
const logs = ref<string[]>([])

function log(scope: string, hook: string) {
  logs.value.push(`[${scope}] ${hook}`)
  console.log(`[${scope}] ${hook}`)
}

// 子组件通过 inject('log') 写入同一份日志
provide('log', log)

// 组合式 API 没有 beforeCreate / created，setup() 即对应这两个阶段
log('父组件', 'setup（对应 beforeCreate / created）')

// 防止在钩子里写日志又触发更新，造成日志重复或死循环
const state = () => `${showChild.value}/${count.value}`
let loggedState = state()
let needsUpdated = false

onBeforeMount(() => log('父组件', 'onBeforeMount'))
onMounted(() => log('父组件', 'onMounted'))

onBeforeUpdate(() => {
  if (state() !== loggedState) {
    loggedState = state()
    needsUpdated = true
    log('父组件', 'onBeforeUpdate')
  }
})

onUpdated(() => {
  if (needsUpdated) {
    needsUpdated = false
    log('父组件', 'onUpdated')
  }
})

onBeforeUnmount(() => log('父组件', 'onBeforeUnmount'))
onUnmounted(() => log('父组件', 'onUnmounted'))
</script>

<template>
  <section class="lc">
    <div class="lc-actions">
      <button @click="showChild = !showChild">
        {{ showChild ? '销毁子组件（v-if = false）' : '重建子组件（v-if = true）' }}
      </button>
      <button @click="count++">修改 count：{{ count }}</button>
      <button @click="logs = []">清空日志</button>
    </div>

    <LifecycleChild v-if="showChild" :count="count" />
    <p v-else class="lc-empty">子组件已被移除，此时触发 onBeforeUnmount / onUnmounted</p>

    <ol class="lc-log">
      <li v-for="(line, index) in logs" :key="index">{{ line }}</li>
      <li v-if="!logs.length">暂无日志</li>
    </ol>
  </section>
</template>
