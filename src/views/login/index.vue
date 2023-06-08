<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 登录表单 -->
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎使用，硅谷甄选系统</h2>
          <div class="login_form_item">
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                :prefix-icon="UserFilled"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                :prefix-icon="Lock"
                :show-password="true"
              ></el-input>
            </el-form-item>
            <!-- 登录按钮 -->
            <el-form-item>
              <el-button
                type="primary"
                class="login_submit"
                @click="login"
                :loading="isLoading"
                >登录</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { UserFilled, Lock } from "@element-plus/icons";
import useUserStore from "@/store/userStore.ts";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
// 判断登录时间段
import { getTime } from "@/utils/getTime.ts";

// 获取用户小仓库
const userStore = useUserStore();
//收集账号与密码的数据
const loginForm = reactive({ username: "admin", password: "atguigu123" });
//获取路由器
const $router = useRouter();
const $route = useRoute();
//定义变量控制按钮加载效果
const isLoading = ref(false);
// 表单验证规则
// const rules = reactive({
//   username:[
//     {required:true,message:'请输入用户名'},
//     {min:3,max:5,message:'账号长度必须在3~5之间'}
//   ],
//   password:[
//     {required:true,message:'请输入密码'},
//     {min:6,max:12,message:'密码长度必须在6~12之间'}
//   ]
// })
// 自定义检验规则
const checkUserName = (rule, value, callback) => {
  if (value.length >= 5) {
    callback();
  } else {
    return callback(new Error("用户名不能为空"));
  }
};
const checkPassWord = (rule, value, callback) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error("密码长度至少在6位"));
  }
};
const rules = {
  username: [{ validator: checkUserName }],
  password: [{ validator: checkPassWord, trigger: "blur" }],
};

const loginForms = ref();

// 登录按钮回调
const login = async () => {
  // 表单校验全部通过，才能发送请求
  await loginForms.value.validate();

  //加载效果:开始加载
  isLoading.value = true;

  //点击登录按钮以后干什么?
  //通知仓库发登录请求
  //请求成功->首页展示数据的地方
  //请求失败->弹出登录失败信息
  try {
    //保证登录成功
    await userStore.userLogin(loginForm);
    //编程式导航跳转到展示数据首页
    // 判断登录的时候，路由路径是否有query参数，如果有
    // 就跳转到对应的页面，否则跳转到首页
    let redirect = $route.query.redirect;
    $router.push({ path: redirect || "/" });
    //登录成功提示信息
    ElNotification({
      type: "success",
      message: "欢迎回来",
      title: `${getTime()}好!`,
    });
    //登录成功加载效果也消失
    isLoading.value = false;
  } catch (error) {
    //登录失败加载效果消息
    isLoading.value = false;
    //登录失败的提示信息
    ElNotification({
      type: "error",
      message: error.message,
    });
  }
};
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
  .login_form {
    width: 80%;
    position: relative;
    top: 30vh;
    left: 20px;
    background-image: url("@/assets/images/login_form.png");
    background-size: cover;
    padding: 40px;
    h1 {
      color: #fff;
      font-size: 40px;
    }
    h2 {
      color: #fff;
      margin: 20px 0;
    }
    .login_form_item {
      margin-left: 15px;
    }
    .login_submit {
      width: 100%;
    }
  }
}
</style>
