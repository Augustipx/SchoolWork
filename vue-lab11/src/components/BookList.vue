<script setup lang="ts">
import { computed } from 'vue'

interface Book {
  id: number
  title: string
  author: string
  category: string
}

const props = defineProps<{
  books: Book[]
  category: string
}>()

const filteredBooks = computed(() =>
  props.category === '全部'
    ? props.books
    : props.books.filter((book) => book.category === props.category),
)
</script>

<template>
  <section>
    <h2>书籍列表 <small>{{ filteredBooks.length }} 本</small></h2>

    <ul v-if="filteredBooks.length">
      <li v-for="book in filteredBooks" :key="book.id">
        <strong>{{ book.title }}</strong>
        <span>{{ book.author }}</span>
        <em>{{ book.category }}</em>
      </li>
    </ul>
    <p v-else class="empty">该分类下暂无书籍</p>
  </section>
</template>

<style scoped>
h2 {
  margin: 0 0 12px;
  font-size: 17px;
}

small {
  margin-left: 4px;
  color: #888;
  font-size: 13px;
  font-weight: normal;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid #ddd;
}

li {
  display: grid;
  grid-template-columns: 1fr 150px 64px;
  gap: 12px;
  align-items: center;
  padding: 12px 4px;
  border-bottom: 1px solid #ddd;
}

li span {
  color: #666;
  font-size: 14px;
}

em {
  color: #3b82f6;
  font-size: 13px;
  font-style: normal;
  text-align: right;
}

.empty {
  color: #888;
}

@media (max-width: 600px) {
  li {
    grid-template-columns: 1fr auto;
  }

  li span {
    grid-row: 2;
  }
}
</style>
