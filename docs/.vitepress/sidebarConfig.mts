// 目录菜单配置
export const sidebarConfig = [
  {
    text: "👩‍💻简介",
    collapsed: false,
    items: [
      {
        text: "Cris是谁?",
        link: "/profile/who-is-cris",
      },
      {
        text: "笔记说明",
        link: "/profile/disclaimer",
      },
    ],
  },
  {
    text: "📝 笔记",
    collapsed: false,
    items: [
      { text: "目录", link: "/notes/index.md" },
      {
        text: "HTML",
        items: [
          { text: "HTML基础", link: "/notes/html/base.md" },
          { text: "HTML5", link: "/notes/html/html5.md" },
        ],
      },
      {
        text: "CSS",
        items: [
          { text: "CSS基础", link: "/notes/css/base.md" },
          { text: "CSS属性", link: "/notes/css/property.md" },
          { text: "CSS3", link: "/notes/css/css3.md" },
        ],
      },
    ],
  },
  {
    text: "🛠️ 实战（待排期）",
    collapsed: false,
    items: [
      { text: "目录", link: "/projects/index.md" },
      {
        text: "课题一",
        items: [{ text: "第一节", link: "" }],
      },
    ],
  },
  {
    text: "🎯 面试（待排期）",
    collapsed: false,
    items: [
      { text: "目录", link: "/interview/index.md" },
      {
        text: "课题一",
        items: [{ text: "第一节", link: "" }],
      },
    ],
  },
  {
    text: "📈 成长（预留）",
    collapsed: false,
    items: [
      { text: "目录", link: "/growth/index.md" },
      {
        text: "课题一",
        items: [{ text: "第一节", link: "" }],
      },
    ],
  },
  {
    text: "Examples",
    items: [
      { text: "Markdown Examples", link: "/markdown-examples" },
      { text: "Runtime API Examples", link: "/api-examples" },
    ],
  },
];
