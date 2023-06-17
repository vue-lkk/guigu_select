// 全局svgt图标组件
import SvgIcon from "./SvgIcon.vue";
// 全局三级分类菜单组件
import Category from "@/components/category.vue";

// 全局注册图标组件
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 收集自己定义的组件
const allGloablComponents = { SvgIcon, Category };

export default {
  install(app: any) {
    // 遍历注册自己封装组件
    Object.keys(allGloablComponents).forEach((key) => {
      app.component(key, allGloablComponents[key]);
    });
    // 遍历注册所有element-plus图标库组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
