<script setup lang="ts">
import {
  inject,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
} from 'vue'

defineProps<{ count: number }>()

// 日志函数由父组件 provide，这里 inject 后使用（依赖注入）
const log = inject<(scope: string, hook: string) => void>('log', () => {})

log('子组件', 'setup（对应 beforeCreate / created）')

onBeforeMount(() => log('子组件', 'onBeforeMount'))
onMounted(() => log('子组件', 'onMounted'))
onBeforeUpdate(() => log('子组件', 'onBeforeUpdate'))
onUpdated(() => log('子组件', 'onUpdated'))
onBeforeUnmount(() => log('子组件', 'onBeforeUnmount'))
onUnmounted(() => log('子组件', 'onUnmounted'))
</script>

<template>
  <div class="lc-child">
    <p>
      👶 我是子组件，接收到的 count = <strong>{{ count }}</strong>
    </p>
  </div>
</template>
