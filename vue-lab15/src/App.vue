<script setup lang="ts">
import { computed, ref } from 'vue'

import huawei from '@/assets/phones/huawei.svg'
import iphone from '@/assets/phones/iphone.svg'
import oppo from '@/assets/phones/oppo.svg'
import vivo from '@/assets/phones/vivo.svg'
import xiaomi from '@/assets/phones/xiaomi.svg'

interface Phone {
  id: number
  name: string
  icon: string
  price: number
  num: number
}

const phoneList = ref<Phone[]>([
  { id: 1, name: 'iPhone 15 Pro', icon: iphone, price: 7999, num: 1 },
  { id: 2, name: '华为 Mate 60 Pro', icon: huawei, price: 6499, num: 1 },
  { id: 3, name: '小米 14', icon: xiaomi, price: 3999, num: 2 },
  { id: 4, name: 'OPPO Find X7', icon: oppo, price: 3999, num: 1 },
  { id: 5, name: 'vivo X100', icon: vivo, price: 3999, num: 1 },
])

const totalPrice = computed(() =>
  phoneList.value.reduce((sum, item) => sum + item.price * item.num, 0),
)

function decrease(item: Phone) {
  if (item.num > 1) {
    item.num--
  }
}

function increase(item: Phone) {
  item.num++
}

function removeItem(index: number) {
  phoneList.value.splice(index, 1)
}
</script>

<template>
  <div class="app-container">
    <div class="banner-box">
      <div>
        <p class="banner-title">📱 手机商城</p>
        <p class="banner-sub">精选旗舰手机 · 简易购物车</p>
      </div>
    </div>

    <div class="breadcrumb">
      <span>🏠</span>
      /
      <span>购物车</span>
    </div>

    <div v-if="phoneList.length" class="main">
      <div class="table">
        <div class="thead">
          <div class="tr">
            <div class="th th-pic">图片</div>
            <div class="th name-th">名称</div>
            <div class="th">单价</div>
            <div class="th num-th">数量</div>
            <div class="th">小计</div>
            <div class="th">操作</div>
          </div>
        </div>

        <div class="tbody">
          <div v-for="(item, index) in phoneList" :key="item.id" class="tr">
            <div class="td th-pic">
              <img :src="item.icon" :alt="item.name" />
            </div>
            <div class="td name-th">{{ item.name }}</div>
            <div class="td">¥ {{ item.price }}</div>
            <div class="td">
              <div class="my-input-number">
                <button
                  type="button"
                  class="decrease"
                  :disabled="item.num <= 1"
                  @click="decrease(item)"
                >
                  -
                </button>
                <span class="my-input__inner">{{ item.num }}</span>
                <button type="button" class="increase" @click="increase(item)">+</button>
              </div>
            </div>
            <div class="td">¥ {{ (item.price * item.num).toFixed(2) }}</div>
            <div class="td">
              <button type="button" @click="removeItem(index)">删除</button>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom">
        <span class="count">共 {{ phoneList.length }} 种手机</span>
        <div class="right-box">
          <span class="price-box">
            总价&nbsp;:&nbsp;¥&nbsp;<span class="price">{{ totalPrice.toFixed(2) }}</span>
          </span>
        </div>
      </div>
    </div>

    <div v-else class="empty">🛒空空如也</div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  color: rgba(0, 0, 0, 0.85);
  background: #fff;
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
}

button {
  font: inherit;
}

.app-container {
  width: 800px;
  margin: 0 auto;
  padding: 20px 0 120px;
}

.banner-box {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 32px 36px;
  overflow: hidden;
  border-radius: 20px;
  background: linear-gradient(120deg, #111827 0%, #374151 55%, #6b7280 100%);
  color: #fff;
}

.banner-title {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
}

.banner-sub {
  margin: 4px 0 0;
  color: #d1d5db;
  font-size: 15px;
}

.breadcrumb {
  color: gray;
  font-size: 16px;
}

.main,
.empty {
  margin-top: 10px;
  border: 1px solid #f0f0f0;
}

.table {
  width: 100%;
}

.tr {
  display: flex;
  border-bottom: 1px solid #ebeef5;
}

.th,
.td {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  overflow-wrap: break-word;
}

.th {
  background: #fafafa;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  border-bottom: 1px solid #f0f0f0;
}

.th-pic {
  flex: 1.2;
}

.name-th {
  flex: 1.4;
}

.num-th {
  flex: 1.4;
}

.table img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

button {
  display: inline-block;
  height: 32px;
  padding: 4px 15px;
  color: #fff;
  background: #4b5563;
  border: 1px solid transparent;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5715;
  text-align: center;
  white-space: nowrap;
  box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
}

.my-input-number {
  display: flex;
}

.my-input-number button {
  height: 40px;
  padding: 0;
  width: 40px;
  color: #333;
  background: #f5f7fa;
  border: 1px solid #dcdfe6;
}

.my-input-number button:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.my-input-number .my-input__inner {
  display: flex;
  width: 50px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
}

.bottom {
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border: 1px solid #f0f0f0;
  border-top: none;
}

.count {
  color: #606266;
}

.right-box {
  display: flex;
  align-items: center;
}

.price-box {
  display: flex;
  align-items: center;
}

.price {
  color: #111827;
  font-size: 30px;
  font-weight: 700;
}

.empty {
  padding: 20px;
  color: #909399;
  font-size: 30px;
  text-align: center;
}

@media screen and (max-width: 800px) {
  .app-container {
    width: 100%;
    padding: 12px 12px 80px;
  }

  .banner-box {
    padding: 24px;
  }

  .banner-title {
    font-size: 24px;
  }

  .th,
  .td {
    padding: 10px 4px;
    font-size: 13px;
  }

  .table img {
    width: 56px;
    height: 56px;
  }

  .my-input-number button {
    width: 28px;
    height: 34px;
  }

  .my-input-number .my-input__inner {
    width: 32px;
    height: 34px;
  }

  .price {
    font-size: 24px;
  }
}
</style>
