// 本地搜索配置
import { DefaultTheme } from "vitepress";

interface LocalSearchConfig {
  provider: "local";
  options?: DefaultTheme.LocalSearchOptions;
}
export const searchConfig: LocalSearchConfig = {
  provider: "local",
  options: {
    locales: {
      root: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            displayDetails: "显示详情",
            resetButtonTitle: "清除搜索条件",
            backButtonTitle: "返回搜索结果",
            noResultsText: "没有找到相关结果",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },
  },
};
