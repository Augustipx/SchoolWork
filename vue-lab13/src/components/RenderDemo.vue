<script lang="ts">
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'RenderDemo',
  data() {
    return {
      fruits: ['苹果', '香蕉', '橙子'],
      selected: '苹果',
    }
  },
  methods: {
    selectFruit(fruit: string) {
      this.selected = fruit
    },
  },
  // render() 用 h() 创建虚拟节点：h(标签, 属性, 子节点)
  render() {
    return h('section', { class: 'demo-card' }, [
      h('h2', 'render() 渲染函数'),
      h('p', { class: 'desc' }, '这个组件没有 template，界面由 render() 中的 h() 生成。'),
      h('p', ['当前选择：', h('strong', { class: 'selected' }, this.selected)]),
      h(
        'div',
        { class: 'actions' },
        this.fruits.map((fruit) =>
          h(
            'button',
            {
              key: fruit,
              type: 'button',
              class: { active: fruit === this.selected },
              'aria-pressed': fruit === this.selected,
              onClick: () => this.selectFruit(fruit),
            },
            fruit,
          ),
        ),
      ),
    ])
  },
})
</script>

<style scoped>
.demo-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border: 1px solid #dbe3ef;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(31 41 55 / 6%);
}

h2 {
  margin: 0;
  color: #172033;
  font-size: 20px;
}

p {
  margin: 0;
}

.desc {
  color: #667085;
  font-size: 14px;
}

.selected {
  color: #2563eb;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

button {
  padding: 8px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  background: #fff;
  color: #334155;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

button:hover {
  border-color: #93c5fd;
  color: #2563eb;
}

button.active {
  border-color: #2563eb;
  background: #2563eb;
  color: #fff;
}
</style>
