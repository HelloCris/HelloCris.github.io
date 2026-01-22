import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cris Wiki",
  description: "Cris Wiki -- 一个半路出家的前端开发的私人笔记",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "笔记", link: "/markdown-examples" },
      { text: "实战", link: "/markdown-examples" },
      { text: "面试", link: "/markdown-examples" },
      { text: "成长", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "简介",
        items: [
          {
            text: "Cris是谁?",
            link: "/profile/cris-who",
          },
          {
            text: "免责声明",
            link: "/profile/disclaimer",
          },
        ],
      },
      {
        text: "HTML+CSS",
        items: [
          {
            text: "HTML",
            link: "/markdown-examples",
            items: [
              { text: "HTML 基础", link: "/markdown-examples" },
              { text: "HTML 语义化", link: "/markdown-examples" },
            ],
          },
          { text: "CSS", link: "/api-examples" },
        ],
      },
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],
  },
});
