// 引入大仓库
import store from "@/store";
// 引入用户小仓库
import useUserStore from "@/store/userStore";
// 获取用户相关的仓库
const userStore = useUserStore(store);

// 自定义指令
export const isHasButton = (app: any) => {
  // 全局自定义指令：实现按钮的权限
  app.directive("has", {
    mounted(el: any, binding: any) {
      if (!userStore.buttons.includes(binding.value)) {
        // 知道当前按钮的父节点，将当前按钮移除
        el.parentNode.removeChild(el);
      }
    },
  });
};
