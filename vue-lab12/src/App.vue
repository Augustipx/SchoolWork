<script setup lang="ts">
import { ref } from 'vue'
import PostCard from './components/PostCard.vue'

const posts = ref([
  { id: 1, title: 'Vue 插槽入门', author: '张三', content: '具名插槽可以把内容分发到组件的不同位置。' },
  { id: 2, title: '组件综合运用', author: '李四', content: '插槽让组件复用更加灵活。' },
])
</script>

<template>
  <main>
    <h1>实验十二 示例4-17 使用具名插槽实现帖子的分发</h1>

    <PostCard v-for="post in posts" :key="post.id">
      <!-- 分发到 header 插槽 -->
      <template #header>{{ post.title }}</template>

      <!-- 未命名的内容分发到默认插槽 -->
      <p>{{ post.content }}</p>

      <!-- 分发到 footer 插槽 -->
      <template #footer>作者：{{ post.author }}</template>
    </PostCard>
  </main>
</template>

<style scoped>
main {
  max-width: 640px;
  margin: 40px auto;
  padding: 0 20px;
  color: #222;
}

h1 {
  font-size: 20px;
}
</style>
