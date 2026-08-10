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
