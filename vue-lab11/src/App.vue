<script setup lang="ts">
import { ref } from 'vue'
import BookCategory from './components/BookCategory.vue'
import BookList from './components/BookList.vue'

interface Book {
  id: number
  title: string
  author: string
  category: string
}

const categories = ['全部', '计算机', '文学', '历史']
const selectedCategory = ref('全部')

const books: Book[] = [
  { id: 1, title: 'Vue.js 3 实战', author: '陈陆扬', category: '计算机' },
  { id: 2, title: 'JavaScript 高级程序设计', author: 'Matt Frisbie', category: '计算机' },
  { id: 3, title: '活着', author: '余华', category: '文学' },
  { id: 4, title: '朝花夕拾', author: '鲁迅', category: '文学' },
  { id: 5, title: '中国通史', author: '吕思勉', category: '历史' },
  { id: 6, title: '万历十五年', author: '黄仁宇', category: '历史' },
]
</script>

<template>
  <main>
    <h1>实验十一 组件的应用</h1>
    <p class="intro">选择左侧分类，下方书籍列表会同步更新。</p>

    <div class="content">
      <!-- 父组件接收分类组件的选择结果，再通过 props 传给列表组件 -->
      <BookCategory
        :categories="categories"
        :selected="selectedCategory"
        @select="selectedCategory = $event"
      />
      <BookList :books="books" :category="selectedCategory" />
    </div>
  </main>
</template>

<style scoped>
main {
  max-width: 760px;
  margin: 40px auto;
  padding: 0 20px;
  color: #222;
}

h1 {
  margin-bottom: 8px;
  font-size: 24px;
}

.intro {
  margin-top: 0;
  color: #666;
}

.content {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 24px;
  margin-top: 28px;
}

@media (max-width: 600px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
