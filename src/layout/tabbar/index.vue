<template>
    <div class="tabbar_container">
        <Breadcrumb></Breadcrumb>
        <Setting></Setting>
    </div>
</template>

<script setup lang="ts">
import Breadcrumb from '@/layout/tabbar/breadcrumb/index.vue'
import Setting from '@/layout/tabbar/setting/index.vue'


</script>

<script lang="ts">
export default {
  name:'Tabbar'
}
</script>

<style scoped lang="scss"> 
.tabbar_container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tabbar_left{
        padding-left:10px;
        display: flex;
        align-items: cneter;
    }
    .tabbar_right{
        display: flex;
        align-items: center;
    }
}
</style>