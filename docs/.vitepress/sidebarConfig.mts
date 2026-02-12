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
        collapsed: true,
        items: [
          { text: "HTML基础", link: "/notes/html/base.md" },
          { text: "HTML5", link: "/notes/html/html5.md" },
          { text: "无障碍(a11y)", link: "/notes/html/a11y.md" },
        ],
      },
      {
        text: "CSS",
        collapsed: true,
        items: [
          { text: "CSS基础", link: "/notes/css/base.md" },
          { text: "CSS属性", link: "/notes/css/property.md" },
          { text: "CSS3", link: "/notes/css/css3.md" },
        ],
      },
      {
        text: "JavaScript",
        collapsed: true,
        items: [
          { text: "JavaScript基础", link: "/notes/js/base.md" },
          { text: "JavaScript高级", link: "/notes/js/advanced.md" },
          { text: "js模块化", link: "/notes/js/module.md" },
          { text: "正则表达式", link: "/notes/js/regex.md" },
        ],
      },
      {
        text: "其他",
        collapsed: true,
        items: [
          { text: "Linux", link: "/notes/others/linux.md" },
          { text: "Git", link: "/notes/others/git.md" },
          { text: "网络", link: "/notes/others/network.md" },
          { text: "浏览器工作原理", link: "/notes/others/browser.md" },
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
