import { computed, ref } from 'vue'

/**
 * 组合式函数：封装计数状态和操作，供组件的 setup() 复用。
 */
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value += 1
  }

  function reset() {
    count.value = initialValue
  }

  return { count, doubleCount, increment, reset }
}
