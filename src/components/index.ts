import SvgIcon from "./SvgIcon.vue";

// 全局注册图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
console.log(ElementPlusIconsVue)


const allGloablComponents = { SvgIcon};

export default {
  install(app) {
    // 遍历注册自己封装的svg图组件
    Object.keys(allGloablComponents).forEach((key) => {
      app.component(key, allGloablComponents[key]);
    });
    // 注册所有element-plus图标库组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
};
