# 前端框架问题

## Vue 路由：`query` vs `params`

1. **URL 表现形式**
   - query：参数以 `?key=value` 形式附加在 URL 后面，如 `/search?keyword=vue&page=1`
   - params：参数嵌入在 URL 路径中，如 `/user/123`

2. **路由配置**
   - query：无需在路由配置中预定义，随时可加任意键值对
   - params：必须在路由配置中声明动态段，如 `path: '/user/:id'`

3. **跳转方式**
   - query：支持 `path` 或 `name` 跳转
     ```js
     this.$router.push({ path: "/search", query: { keyword: "vue" } });
     ```
   - params：**必须使用 `name` 跳转**，用 `path` 会导致参数丢失
     ```js
     this.$router.push({ name: "User", params: { id: 123 } });
     ```

4. **取值方式**
   - query：`this.$route.query.keyword`
   - params：`this.$route.params.id`

5. **刷新行为**
   - query：参数保留在 URL 中，刷新后不丢失
   - params：如果路由 path 中定义了动态段（如 `/user/:id`），刷新后参数仍在 URL 路径中，不会丢失；但如果 params 是隐式传递（未在路径中定义），刷新后会丢失

## 浅谈Vue 2 中的 `computed` 实现

Vue 2 中 `computed` 的实现，本质上是**基于响应式系统（Dep/Watcher）+ 惰性求值（lazy）+ 脏标记（dirty）缓存**三者协作的结果。

::: info 整体流程图

```
初始化
  │
  ├─ 创建 computed Watcher（lazy: true, dirty: true）
  ├─ 不执行 getter，不收集依赖
  │
首次访问 computed
  │
  ├─ dirty === true → 执行 evaluate()
  │   ├─ 调用 getter → 触发依赖数据的 get → 收集依赖
  │   ├─ 缓存结果到 watcher.value
  │   └─ dirty = false
  │
再次访问（依赖未变）
  │
  ├─ dirty === false → 直接返回 watcher.value（命中缓存）
  │
依赖数据变化
  │
  ├─ 触发 computed Watcher 的 update()
  ├─ dirty = true（仅标记，不计算）
  │
下次访问
  │
  └─ dirty === true → 重新 evaluate() → 重新收集依赖 → 更新缓存
```

- 每个 computed 属性对应一个 **computed Watcher**，存储在 `vm._computedWatchers` 中
- 创建时传入 `{ lazy: true }`，表示**惰性求值**——初始化时不执行 getter，不会立即计算

:::
