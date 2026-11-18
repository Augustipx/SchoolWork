<script setup lang="ts">
import { computed, ref } from 'vue'

import banner from '@/静态代码素材/img/fruit.jpg'
import cherry from '@/静态代码素材/img/cherry.png'
import durian from '@/静态代码素材/img/durian.png'
import litchi from '@/静态代码素材/img/litchi.png'
import pear from '@/静态代码素材/img/pear.png'
import pitaya from '@/静态代码素材/img/pitaya.png'

interface Fruit {
  id: number
  name: string
  icon: string
  price: number
  num: number
}

const fruitList = ref<Fruit[]>([
  { id: 1, name: '火龙果', icon: pitaya, price: 6, num: 2 },
  { id: 2, name: '荔枝', icon: litchi, price: 20, num: 7 },
  { id: 3, name: '榴莲', icon: durian, price: 40, num: 3 },
  { id: 4, name: '鸭梨', icon: pear, price: 3, num: 10 },
  { id: 5, name: '樱桃', icon: cherry, price: 34, num: 20 },
])

const totalPrice = computed(() =>
  fruitList.value.reduce((sum, item) => sum + item.price * item.num, 0),
)

function decrease(item: Fruit) {
  if (item.num > 1) {
    item.num--
  }
}

function increase(item: Fruit) {
  item.num++
}

function removeItem(index: number) {
  fruitList.value.splice(index, 1)
}
</script>

<template>
  <div class="app-container">
    <div class="banner-box">
      <img :src="banner" alt="水果" />
    </div>

    <div class="breadcrumb">
      <span>🏠</span>
      /
      <span>购物车</span>
    </div>

    <div v-if="fruitList.length" class="main">
      <div class="table">
        <div class="thead">
          <div class="tr">
            <div class="th th-pic">图片</div>
            <div class="th">名称</div>
            <div class="th">单价</div>
            <div class="th num-th">数量</div>
            <div class="th">小计</div>
            <div class="th">操作</div>
          </div>
        </div>

        <div class="tbody">
          <div v-for="(item, index) in fruitList" :key="item.id" class="tr">
            <div class="td th-pic">
              <img :src="item.icon" :alt="item.name" />
            </div>
            <div class="td">{{ item.name }}</div>
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
        <span class="count">共 {{ fruitList.length }} 种水果</span>
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
  margin-bottom: 10px;
  overflow: hidden;
  border-radius: 20px;
}

.banner-box img {
  display: block;
  width: 100%;
  max-height: 260px;
  object-fit: cover;
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

.num-th {
  flex: 1.5;
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
  background: #d9363e;
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
  color: hotpink;
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
