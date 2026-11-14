<template>
  <article class="post">
    <header>
      <slot name="header">默认标题</slot>
    </header>

    <section>
      <slot></slot>
    </section>

    <footer>
      <slot name="footer">默认页脚</slot>
    </footer>
  </article>
</template>

<style scoped>
.post {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 16px;
}

header {
  font-weight: bold;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

footer {
  border-top: 1px solid #eee;
  padding-top: 8px;
  color: #888;
  font-size: 13px;
}
</style>
