<script setup lang="ts">
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
} from 'vue'

import CartItem from '@/components/CartItem.vue'
import LifecycleDemo from '@/components/LifecycleDemo.vue'
import { provideCart } from '@/composables/useCart'

// 创建购物车数据并注入组件树，CartItem 中通过 useCart() 直接使用
const { phoneList, totalKinds, totalQuantity, totalPrice } = provideCart()

// 生命周期钩子的典型用法：挂载后请求数据，卸载前清理副作用
onBeforeMount(() => console.log('[App] onBeforeMount'))
onMounted(() => console.log('[App] onMounted：可以在这里请求购物车数据'))
onBeforeUpdate(() => console.log('[App] onBeforeUpdate'))
onUpdated(() => console.log('[App] onUpdated'))
onBeforeUnmount(() => console.log('[App] onBeforeUnmount'))
onUnmounted(() => console.log('[App] onUnmounted：清理定时器、事件监听'))
</script>

<template>
  <div class="app">
    <h1>实验十六 · 组合式 API 简易购物车</h1>
    <p class="subtitle">组合式 API · 生命周期钩子 · provide / inject</p>

    <h2>一、购物车</h2>

    <div v-if="phoneList.length" class="table">
      <div class="tr head">
        <span>图片</span>
        <span>名称</span>
        <span>单价</span>
        <span>数量</span>
        <span>小计</span>
        <span>操作</span>
      </div>

      <CartItem v-for="item in phoneList" :key="item.id" :item="item" />

      <div class="tr total">
        <span></span>
        <span>共 {{ totalKinds }} 种 / {{ totalQuantity }} 件</span>
        <span></span>
        <span></span>
        <span></span>
        <span>总价：¥ {{ totalPrice.toFixed(2) }}</span>
      </div>
    </div>

    <p v-else class="empty">🛒 空空如也</p>

    <h2>二、生命周期钩子（教材 P39 示例 2-6 · 组合式 API 改写）</h2>
    <LifecycleDemo />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f5f6f8;
  color: #1f2937;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
}

button {
  font: inherit;
}

.app {
  width: min(860px, 100%);
  margin: 0 auto;
  padding: 24px 16px 80px;
}

h1 {
  margin: 0;
  font-size: 26px;
}

.subtitle {
  margin: 4px 0 8px;
  color: #6b7280;
  font-size: 14px;
}

h2 {
  margin: 28px 0 12px;
  font-size: 18px;
}

/* ---------- 购物车 ---------- */
.table {
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #fff;
}

.tr {
  display: grid;
  grid-template-columns: 88px 1.5fr 1fr 1.3fr 1fr 1fr;
  align-items: center;
  border-top: 1px solid #eef0f3;
}

.tr:first-child {
  border-top: none;
}

.tr > span {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 8px;
  text-align: center;
}

.head,
.total {
  background: #fafafa;
  font-weight: 600;
}

.head {
  color: #374151;
}

.tr img {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: #f3f4f6;
}

.stepper {
  gap: 6px;
}

.stepper button {
  width: 28px;
  height: 28px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  background: #f5f7fa;
  cursor: pointer;
}

.stepper button:hover:not(:disabled) {
  background: #e5e7eb;
}

.stepper button:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.del {
  padding: 4px 12px;
  border: 0;
  border-radius: 6px;
  background: #4b5563;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}

.del:hover {
  background: #111827;
}

.total > span:last-child {
  font-size: 18px;
}

.empty {
  padding: 40px;
  border: 1px dashed #d1d5db;
  border-radius: 14px;
  background: #fff;
  color: #6b7280;
  font-size: 22px;
  text-align: center;
}

/* ---------- 生命周期演示 ---------- */
.lc {
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #fff;
}

.lc-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}

.lc-actions button {
  padding: 8px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  cursor: pointer;
}

.lc-actions button:hover {
  background: #f3f4f6;
}

.lc-child {
  margin-bottom: 14px;
  padding: 14px;
  border: 1px dashed #a5b4fc;
  border-radius: 10px;
  background: #eef2ff;
}

.lc-child p {
  margin: 0;
}

.lc-child strong {
  color: #4338ca;
}

.lc-empty {
  margin: 0 0 14px;
  color: #9ca3af;
}

.lc-log {
  height: 240px;
  margin: 0;
  padding: 12px 16px;
  overflow: auto;
  border-radius: 10px;
  background: #0f172a;
  color: #cbd5e1;
  font-family: Consolas, 'Courier New', monospace;
  font-size: 13px;
  list-style: none;
}

.lc-log li {
  padding: 2px 0;
}

@media screen and (max-width: 720px) {
  .tr {
    grid-template-columns: 64px 1.3fr 0.8fr 1.1fr 0.9fr 0.9fr;
    font-size: 13px;
  }

  .tr img {
    width: 48px;
    height: 48px;
  }
}
</style>
