<template>
    <div class="tabbar_right">
        <el-button icon="RefreshLeft" size="small" circle></el-button>
        <el-button icon="FullScreen" size="small" circle></el-button>
        <el-button icon="Setting" size="small" circle></el-button>
        <img src="../../../../public/logo.png" alt="" style="width:25px;margin:0 15px ">
        <!-- 下拉菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                admin
                <el-icon class="el-icon-right">
                    <arrow-down/>
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">

</script>

<script lang="ts">
export default {
  name:'Setting'
}
</script>

<style scoped lang="scss"></style>