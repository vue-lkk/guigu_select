<template>
  <div>
    <Category></Category>
    <el-card style="margin-top:10px">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column  label="序号" width="60" />
        <el-table-column  label="Name" width="120" />
        <el-table-column  label="Address" />
        <el-table-column  label="Address" width="120" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
