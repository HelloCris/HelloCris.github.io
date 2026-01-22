import { defineConfig } from "vitepress";
import { searchConfig } from "./searchConfig.mts";
import { sidebarConfig } from "./sidebarConfig.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cris Wiki",
  description: "Cris Wiki -- 一个半路出家的前端开发的私人笔记",
  lastUpdated: true,
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "笔记", link: "/markdown-examples" },
      { text: "实战", link: "/markdown-examples" },
      { text: "面试", link: "/markdown-examples" },
      { text: "成长", link: "/markdown-examples" },
    ],
    outline: {
      level: [2, 3],
      label: "页面导航",
    },
    docFooter: {
      prev: "⬅️ 上一篇",
      next: "下一篇 ➡️",
    },
    lastUpdatedText: "最后更新于",
    returnToTopLabel: "返回顶部",
    socialLinks: [
      { icon: "github", link: "https://github.com/HelloCris/CrisWiki" },
    ],
    // 文章目录
    sidebar: sidebarConfig,
    // 本地搜索
    search: searchConfig,
  },
});
