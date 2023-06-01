import {
  createRouter,
  createWebHashHistory,
} from "vue-router";

export const routes = [
  // layout(骨架)（一级路由）+ 首页（二级路由）
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "Layout",  //命名路由
    meta:{
      title:'layout', //菜单标题
      hidden: false, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
      icon:'Connection' //图标组件
    },
    redirect:'/home',  // 重定向
    children:[
      {
        path:'/home',
        component:() => import('@/views/home/index.vue'),
        name:'Home',
        meta:{
          title:'首页',
          hidden:false,
          icon:'House'
        }
      }
    ]
  },
  // 数据大屏（一级路由）
  {
    path:'/screen',
    component: () => import('@/views/screen/index.vue'),
    name:'Screen',
    meta:{
      title:"数据大屏",
      hidden:false,
      icon:'Platform'
    }
  },
  // layout(骨架)（一级路由） + 权限管理（二级路由）
  {
    path:'/acl',
    component: () => import("@/layout/index.vue"),
    name:"Acl",
    meta:{
      title:'权限管理',
      hidden:false,
      icon:'Lock'
    },
    children:[
      {
        path:'/acl/user',
        component:() => import("@/views/acl/user/index.vue"),
        name:'Acl',
        meta:{
          title:'用户管理',
          hidden:false,
          icon:'User'
        },
      },
      {
        path:'/acl/role',
        component:() => import("@/views/acl/role/index.vue"),
        name:'Role',
        meta:{
          title:'角色管理',
          hidden:false,
          icon:'UserFilled'
        },
      },
      {
        path:'/acl/permission',
        component:() => import("@/views/acl/permission/index.vue"),
        name:'Permission',
        meta:{
          title:'菜单管理',
          hidden:false,
          icon:'Grid'
        },
      }
    ]
  },
  // layout(骨架)（一级路由） + 商品管理（二级路由）
  {
    path:'/product',
    component: () => import("@/layout/index.vue"),
    name:"Product",
    meta:{
      title:'商品管理',
      hidden:false,
      icon:'Goods'
    },
    children:[
      {
        path:'/product/trademark',
        component:() => import("@/views/product/trademark/index.vue"),
        name:'Trademark',
        meta:{
          title:'品牌管理',
          hidden:false,
          icon:'InfoFilled'
        },
      },
      {
        path:'/product/attr',
        component:() => import("@/views/product/attr/index.vue"),
        name:'Attr',
        meta:{
          title:'角色管理',
          hidden:false,
          icon:'FolderChecked'
        },
      },
      {
        path:'/product/sku',
        component:() => import("@/views/product/sku/index.vue"),
        name:'Sku',
        meta:{
          title:'SKU管理',
          hidden:false,
          icon:'TrendCharts'
        },
      },
      {
        path:'/product/spu',
        component:() => import("@/views/product/spu/index.vue"),
        name:'Spu',
        meta:{
          title:'SPU管理',
          hidden:false,
          icon:'Orange'
        },
      }
    ]
  },
  // 登录（一级路由）
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "Login",
    meta:{
      title:'登录',
      hidden:true
    }
  },
  // 404（一级路由）
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta:{
      title:'404',
      hidden:true
    }
  },
  // 其他（一级路由）
  {
    // 如果域名后面什么都不写或者没有和已经定义好的路由匹配的话
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta:{
      title:'其他',
      hidden:true
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
