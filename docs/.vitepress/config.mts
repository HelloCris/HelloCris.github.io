import { defineConfig } from "vitepress";
import { searchConfig } from "./searchConfig.mts";
import { sidebarConfig } from "./sidebarConfig.mts";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cris Wiki",
  description: "Cris Wiki -- 一个半路出家的前端开发的学习笔记",
  lastUpdated: true,
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/favicon.ico",
    nav: [
      { text: "首页", link: "/" },
      { text: "笔记", link: "/notes/index.md" },
      { text: "实战", link: "/projects/index.md" },
      { text: "面试", link: "/interview/index.md" },
      { text: "成长", link: "/growth/index.md" },
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
    sidebarMenuLabel: "目录",
    darkModeSwitchLabel: "切换主题",
    darkModeSwitchTitle: "切换到深色主题",
    lightModeSwitchTitle: "切换到浅色主题",
    socialLinks: [
      { icon: "github", link: "https://github.com/HelloCris/CrisWiki" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026-present HelloCris",
    },
    // 文章目录
    sidebar: sidebarConfig,
    // 本地搜索
    search: searchConfig,
  },
});
