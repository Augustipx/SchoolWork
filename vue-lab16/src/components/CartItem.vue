<script setup lang="ts">
import { useCart, type Phone } from '@/composables/useCart'

// 商品数据由父组件通过 props 传入
defineProps<{ item: Phone }>()

// 增删改方法无需 props 逐层传递，直接从注入的购物车上下文中获取
const { increase, decrease, removeItem } = useCart()
</script>

<template>
  <div class="tr">
    <span><img :src="item.icon" :alt="item.name" /></span>
    <span>{{ item.name }}</span>
    <span>¥ {{ item.price }}</span>
    <span class="stepper">
      <button :disabled="item.num <= 1" @click="decrease(item)">-</button>
      <b>{{ item.num }}</b>
      <button @click="increase(item)">+</button>
    </span>
    <span>¥ {{ (item.price * item.num).toFixed(2) }}</span>
    <span><button class="del" @click="removeItem(item.id)">删除</button></span>
  </div>
</template>
