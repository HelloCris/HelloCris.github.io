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
          { text: "DOM", link: "/notes/js/dom.md" },
          { text: "BOM", link: "/notes/js/bom.md" },
          { text: "JavaScript高级", link: "/notes/js/advanced.md" },
          { text: "ES6 新增特性", link: "/notes/js/es6.md" },
          { text: "js模块化", link: "/notes/js/module.md" },
          { text: "正则表达式", link: "/notes/js/regex.md" },
          { text: "JSON", link: "/notes/js/json.md" },
        ],
      },
      {
        text: "TypeScript",
        collapsed: true,
        items: [
          { text: "TypeScript基础", link: "/notes/ts/base.md" },
          { text: "TypeScript高级类型", link: "/notes/ts/advancedTypes.md" },
        ],
      },
      {
        text: "Node.js",
        collapsed: true,
        items: [
          { text: "Node.js基础", link: "/notes/nodejs/base.md" },
          { text: "Express", link: "/notes/nodejs/express.md" },
          { text: "数据库", link: "/notes/nodejs/database.md" },
        ],
      },
      {
        text: "Vue",
        collapsed: true,
        items: [
          { text: "Vue2", link: "/notes/vue/base2.md" },
          { text: "Vue3", link: "/notes/vue/base3.md" },
        ],
      },
      {
        text: "Electron",
        collapsed: true,
        items: [{ text: "Electron基础", link: "/notes/electron/base.md" }],
      },
      {
        text: "Java",
        collapsed: true,
        items: [
          { text: "Java基础", link: "/notes/java/base.md" },
          { text: "面向对象", link: "/notes/java/oop.md" },
          { text: "常用 API", link: "/notes/java/api.md" },
          { text: "集合", link: "/notes/java/collections.md" },
          { text: "高级特性", link: "/notes/java/advanced.md" },
        ],
      },
      {
        text: "小程序",
        collapsed: true,
        items: [{ text: "微信小程序", link: "/notes/mini/weixin.md" }],
      },
      {
        text: "IT基础知识",
        collapsed: true,
        items: [
          { text: "Linux", link: "/notes/others/linux.md" },
          { text: "Git", link: "/notes/others/git.md" },
          { text: "网络", link: "/notes/others/network.md" },
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
];
