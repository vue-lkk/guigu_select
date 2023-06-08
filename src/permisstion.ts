// 路由
import router from "@/router/index.ts";
// 进度条插件
import nprogress from "nprogress";
import "nprogress/nprogress.css";
// 注意在因为不是在vue组件中使用,同时是同步引入，所以必须引入pinia
import store from "@/store/index";
import useUserStore from "@/store/userStore.ts";
const userStore = useUserStore(store);

// 用户配置文件
import setting from "@/settings.ts";

// 全局前置导航
router.beforeEach(async (to, form, next) => {
  // 修改标题
  document.title = setting.title + to.meta.title;
  nprogress.start();
  // 拿到token
  let token = userStore.token;
  // 拿到用户信息
  let username = userStore.username;
  if (token) {
    // 登录成功之后就不可以访问login了
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      // 有用户信息
      if (username) {
        next();
      } else {
        // 如果没有用户信息，在守卫这里发送请求获取到用户信息再放行
        try {
          await userStore.getUserInfo();
          next();
        } catch (error: any) {
          // 1.token过期：获取不到用户信息
          // 2.用户手动修改本地token
          // 退出登录>用户相关的数据清空
          await userStore.userLogout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path == "/login") {
      next();
    } else {
      // 记录跳转不成功路径
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});

// 全局后置导航
router.afterEach((to, form) => {
  nprogress.done();
});
