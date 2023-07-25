<template>
  <div>
    <el-table
      :data="menuData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="name" label="名称" sortable />
      <el-table-column prop="code" label="权限值" sortable />
      <el-table-column prop="updateTime" label="修改时间" sortable />
      <el-table-column label="操作" min-width="80">
        <template #="{ row }">
          <el-button
            :type="row.level === 3 ? 'success' : 'primary'"
            size="small"
            @click="addPermission(row)"
            :disabled="row.level === 4 ? true : false"
            v-has="`btn.Permission.add`"
            >{{ row.level === 3 ? "添加功能" : "添加菜单" }}</el-button
          >
          <el-button
            type="warning"
            size="small"
            @click="updatePermission(row)"
            :disabled="row.level === 1 ? true : false"
            v-has="`btn.Permission.update`"
            >编辑</el-button
          >

          <el-popconfirm title="是否确定删除?" @confirm="deleteMenu(row)">
            <template #reference>
              <el-button
                type="danger"
                size="small"
                :disabled="row.level === 1 ? true : false"
                v-has="`btn.Permission.remove`"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="
        menuForm.id
          ? '更新菜单'
          : menuForm.level - 1 == 3
          ? '添加功能'
          : '添加菜单'
      "
      width="30%"
    >
      <el-form>
        <el-form-item label="名称">
          <el-input placeholder="请输入名称" v-model="menuForm.name" />
        </el-form-item>
        <el-form-item label="权限">
          <el-input placeholder="请输入权限" v-model="menuForm.code" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MenuData, MenuList, AddOrUpdateBody } from "@/api/acl/menu/type";
import {
  reqMenuPermission,
  reqAddOrUpdatePermission,
  reqRemoveMenu,
} from "@/api/acl/menu/index";
import { ElMessage } from "element-plus";

const menuData = ref<MenuData[]>([]);
// 控制对话框
const dialogVisible = ref<boolean>(false);

// 携带参数
const menuForm = ref<AddOrUpdateBody>({
  code: "", // 权限数值
  level: 0, // 几级菜单
  name: "", // 菜单名称
  pid: 0, // 菜单ID
});

// 添加菜单/添加功能
const addPermission = (row: MenuData) => {
  // 清空
  Object.assign(menuForm.value, {
    id: 0,
    code: "", // 权限数值
    level: 0, // 几级菜单
    name: "", // 菜单名称
    pid: 0, // 菜单ID
  });
  dialogVisible.value = true;
  // 收集新增的菜单的level数值(第几级菜单)
  menuForm.value.level = row.level + 1;
  // 收集给谁新增子菜单
  menuForm.value.pid = row.id as number;
};
// 确定按钮
const save = async () => {
  // 发送请求：添加或更新菜单
  let result: any = await reqAddOrUpdatePermission(menuForm.value);
  if (result.code == 200) {
    dialogVisible.value = false;
    ElMessage({
      type: "success",
      message: menuForm.value.id ? "更新成功" : "添加成功",
    });
    // 重新获取数据
    getMenuPermission();
  }
};

// 删除菜单
const deleteMenu = async (row: MenuData) => {
  const result = await reqRemoveMenu(row.id as number);
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    getMenuPermission();
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};

// 更新
const updatePermission = (row: MenuData) => {
  dialogVisible.value = true;
  Object.assign(menuForm.value, row);
};

onMounted(() => {
  getMenuPermission();
});

// 获取菜单管理数据
const getMenuPermission = async () => {
  const result: MenuList = await reqMenuPermission();
  console.log(result);
  menuData.value = result.data;
};
</script>

<script lang="ts">
export default {
  name: "menu",
};
</script>

<style scoped lang="scss"></style>
