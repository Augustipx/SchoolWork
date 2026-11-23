# 实验十六 · 组合式 API 简易购物车

在 vue-lab15 的基础上，用组合式 API 完成以下内容：

1. **组合式 API 完善简易购物车**：`src/composables/useCart.ts` 管理商品数据与总价计算，组件统一使用 `<script setup>`。
2. **生命周期钩子函数的用法**：`App.vue` 在 `onMounted` 中演示请求数据的时机、在 `onUnmounted` 中演示清理副作用；页面第二部分实时展示各钩子的执行顺序。
3. **依赖注入实现组件间数据共享**：`App.vue` 调用 `provideCart()` 注入购物车数据，`CartItem.vue` 通过 `useCart()` 直接取用，无需逐层传递 props。
4. **改写 P39 示例 2-6**：`LifecycleDemo.vue`（父组件）+ `LifecycleChild.vue`（子组件），用组合式 API 演示挂载、更新、卸载时钩子的触发顺序，日志同时显示在页面上并输出到控制台。

## 目录结构

```
src/
├── App.vue                    # 购物车页面 + 根组件生命周期钩子
├── components/
│   ├── CartItem.vue           # 购物车行（inject 取操作方法）
│   ├── LifecycleDemo.vue      # 生命周期示例：父组件
│   └── LifecycleChild.vue     # 生命周期示例：子组件
└── composables/useCart.ts     # 购物车数据与 provide / inject
```

## 运行

```sh
npm install
npm run dev
```

打开页面后，点击「销毁 / 重建子组件」「修改 count」可以观察钩子的触发顺序；浏览器控制台也会同步输出日志。
