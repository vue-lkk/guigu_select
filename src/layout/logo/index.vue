<template>
  <div class="logo">
    <img :src="setting.logo" alt="" v-if="setting.logoHidden">
    <p>{{setting.title}}</p>
  </div>
</template>
 
<script setup lang="ts">
import setting from "@/settings.js";

</script>

<style lang="scss">
.logo{
  width: 100%;
  height: $base-menu-logo-height;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 20px;
  img{
    width: 40px;
    height: 40px;
  }
  p{
    font-size: $base-menu-logo-fontSize;
    margin-left: 10px;
  }
}
</style>