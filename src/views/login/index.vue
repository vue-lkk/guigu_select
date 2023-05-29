<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 登录表单 -->
        <el-form class="login_form" :model="loginForm">
          <h1>Hello</h1>
          <h2>欢迎使用，硅谷甄选系统</h2>
          <div class="login_form_item">
            <el-form-item>
              <el-input 
              v-model="loginForm.username" 
              :prefix-icon="UserFilled"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input 
              v-model="loginForm.password" 
              :prefix-icon="Lock" 
              :show-password="true"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button 
              type="primary" 
              class="login_submit"
              @click="login"
              :loading="isLoading">登录</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {reactive,ref} from 'vue'
import { UserFilled,Lock } from '@element-plus/icons'
import useUserStore from '@/store/userStore.ts'
import {useRouter} from 'vue-router'
import {ElNotification} from 'element-plus'

// 获取用户小仓库
const userStore = useUserStore()
//收集账号与密码的数据
const loginForm = reactive({username:'admin',password:'111111'})
//获取路由器
const $router = useRouter()
//定义变量控制按钮加载效果
const isLoading = ref(false)

// 登录按钮回调
const login =async () => {
  //加载效果:开始加载
  isLoading.value = true;

  //点击登录按钮以后干什么?
  //通知仓库发登录请求
  //请求成功->首页展示数据的地方
  //请求失败->弹出登录失败信息
  try {
    //保证登录成功
    await userStore.userLogin(loginForm)
    //编程式导航跳转到展示数据首页
    $router.push('/')
    //登录成功提示信息
    ElNotification({
      type:'success',
      message: '欢迎回来',
    })
    //登录成功加载效果也消失
    isLoading.value = false
  } catch (error) {
    //登录失败加载效果消息
    isLoading.value = false
    //登录失败的提示信息
    ElNotification({
      type:'error',
      message: error.message,
    })
  }
}


</script>

<style scoped lang="scss">
.login_container{
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/images/background.jpg');
  background-size: cover;
  .login_form{
    width: 80%;
    position: relative;
    top: 30vh;
    left: 20px;
    background-image: url('@/assets/images/login_form.png');
    background-size: cover;
    padding: 40px;
    h1{
      color: #fff;
      font-size: 40px;
    }
    h2{
      color: #fff;
      margin: 20px 0;
    }
    .login_form_item{
      margin-left: 15px;
    }
    .login_submit{
      width: 100%;
    }
  }
}
</style>