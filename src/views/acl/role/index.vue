<template>
  <div>
    <!-- 搜索 -->
    <el-card style="margin: 10px 0">
      <el-form :inline="true">
        <el-form-item label="用户名">
          <el-input placeholder="请您输入搜索职位关键字" v-model="keyword" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="searchRole"
            >搜索</el-button
          >
          <el-button type="info" icon="SwitchButton">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 用户管理 -->
    <el-card>
      <div style="margin-bottom: 10px">
        <el-button
          type="primary"
          icon=""
          @click="addRole"
          v-has="`btn.Role.add`"
          >添加职位</el-button
        >
      </div>
      <el-table border :data="roleRecords">
        <el-table-column label="#" width="50" align="center" type="index" />
        <el-table-column prop="id" label="ID" width="120" align="center" />
        <el-table-column
          prop="roleName"
          label="职位名称"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="updateTime"
          label="更新时间"
          min-width="120"
          align="center"
        />
        <el-table-column label="操作" min-width="260">
          <template #="{ row }">
            <el-button
              type="primary"
              icon="User"
              size="small"
              @click="assginPermission(row)"
              v-has="`btn.Role.assgin`"
              >分配权限</el-button
            >
            <el-button
              type="warning"
              icon="Edit"
              size="small"
              @click="updateRole(row)"
              v-has="`btn.Role.update`"
              >编辑</el-button
            >

            <el-popconfirm title="是否确定删除?" @confirm="deleteRole(row)">
              <template #reference>
                <el-button
                  type="danger"
                  icon="Delete"
                  size="small"
                  v-has="`btn.Role.update`"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="demo-pagination-block" style="margin-top: 10px">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20, 50]"
          :small="true"
          :background="true"
          layout="prev, pager, next,jumper,->, sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <!-- 对话框 -->
      <el-dialog
        v-model="dialogFormVisible"
        :title="roleParams.id ? '更新职位' : '添加职位'"
      >
        <el-form :model="roleParams" :rules="rules" ref="ruleFormRef">
          <el-form-item label="职位名称" prop="roleName">
            <el-input
              autocomplete="off"
              v-model="roleParams.roleName"
              placeholder="请输入职位名称"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmAdd"> 确定 </el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 抽屉：分配权限 -->
      <el-drawer v-model="drawer1">
        <template #header>
          <h4>分配权限</h4>
        </template>
        <template #default>
          <!-- 树形结构 -->
          <el-tree
            ref="tree"
            :data="menuData"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="checkedAtrr"
            :props="defaultProps"
            default-expand-all
          />
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="drawer1 = false">取消</el-button>
            <el-button type="primary" @click="confirmPermission"
              >确定</el-button
            >
          </div>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import {
  reqUser,
  reqAddOrUpdateRole,
  reqAssginPermission,
  reqDoAssignPernission,
  reqRemoveRole,
} from "@/api/acl/role/index";
import { Records, MenuData, MenuList } from "@/api/acl/role/type";
import { ElMessage } from "element-plus";

// 当前页
const currentPage = ref<number>(1);
// 多少条
const pageSize = ref<number>(5);
// 总条数
const total = ref<number>(12);
// 角色管理数据
const roleRecords = ref<Records[]>([]);

// 搜索关键字
let keyword = ref<string>("");
// 控制对话框
const dialogFormVisible = ref(false);
// 收集表单
let roleParams = reactive<Records>({
  roleName: "",
});
// 表单组件
const ruleFormRef = ref<any>(null);
let drawer1 = ref<boolean>(false);

// 树形结构数据
const defaultProps = {
  children: "children",
  label: "name",
};
// 分配权限菜单数据
let menuData = ref<MenuData[]>([]);
// 勾选的权限数组
let checkedAtrr = ref<number[]>([]);
// 获取tree组件实例
let tree = ref<any>(null);

// 获取已分配权限
const assginPermission = async (row: Records) => {
  drawer1.value = true;
  // 收集分配权限的数据
  Object.assign(roleParams, row);
  checkedAtrr.value = [];
  // 根据id,发送请求获取当前角色已勾选的权限
  let result: MenuList = await reqAssginPermission(row.id as number);
  if (result.code == 200) {
    // 菜单数据
    menuData.value = result.data;
    menuRecursion(menuData.value);
  }
};

// 确定分配权限
const confirmPermission = async () => {
  let roleId = roleParams.id as number;
  // 拿到勾选的id数组
  let attr = tree.value.getCheckedKeys();
  // 拿到半勾选的id数组
  let attr1 = tree.value.getHalfCheckedKeys();
  // 合并
  let permissionId = [...attr, ...attr1];
  // 发送请求
  let result = await reqDoAssignPernission(roleId, permissionId);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "分配权限成功",
    });
    // 手动刷新，避免自己修改自己的权限
    window.location.reload();
  } else {
    ElMessage({
      type: "success",
      message: "分配权限失败",
    });
  }
  drawer1.value = false;
};

// 删除角色
const deleteRole = async (row: Records) => {
  let result = await reqRemoveRole(row.id as number);
  console.log(result);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "角色删除成功",
    });
    // 重新发送请求获取数据
    getRole();
  } else {
    ElMessage({
      type: "success",
      message: "角色删除失败",
    });
  }
};

// 递归权限菜单
const menuRecursion = (menuData: MenuData[]) => {
  menuData.forEach((item) => {
    // 先判断是否选中，并且是第4级的权限id
    if (item.select && item.level === 4) {
      checkedAtrr.value.push(item.id as number);
    }
    // 递归
    if ((item.children as MenuData[]).length > 0) {
      menuRecursion(item.children as MenuData[]);
    }
  });
};

// 自定义校验规则的回调
const validateRoleName = (rule: any, value: any, callback: any) => {
  console.log(rule);
  if (value.trim().length >= 2) {
    callback();
  } else {
    callback(new Error("用职位名称不能少于2位"));
  }
};
// 验证规则
const rules = {
  roleName: [{ validator: validateRoleName, trigger: "blur", required: true }],
};

// 添加角色
const addRole = () => {
  dialogFormVisible.value = true;
  // 清除表单数据
  Object.assign(roleParams, {
    id: "",
    roleName: "",
  });
  // 清除表单验证提示
  nextTick(() => {
    ruleFormRef.value.clearValidate("roleName");
  });
};
// 修改角色
const updateRole = (row: Records) => {
  dialogFormVisible.value = true;
  // 合并
  Object.assign(roleParams, row);
};

// 确定 添加|更新职位
const confirmAdd = async () => {
  // 表单校验结果，结果通过在发送请求，结果没有通过不应该发送请求
  await ruleFormRef.value.validate();
  const result = await reqAddOrUpdateRole(roleParams);
  if (result.code == 200) {
    // 对话框关闭
    dialogFormVisible.value = false;
    ElMessage({
      type: "success",
      message: roleParams.id ? "职位修改成功" : "职位添加成功",
    });
    if (roleParams.id) {
      getRole();
    } else {
      currentPage.value = 1;
      getRole();
    }
  }
};

onMounted(() => {
  getRole();
});

const getRole = async () => {
  let result = await reqUser(currentPage.value, pageSize.value, keyword.value);
  if (result.code == 200) {
    roleRecords.value = result.data.records;
    total.value = result.data.total;
  }
};

const handleSizeChange = () => {
  getRole();
};

const handleCurrentChange = () => {
  getRole();
};

// 搜索角色
const searchRole = () => {
  getRole();
};
</script>

<script lang="ts">
export default {
  name: "Role",
};
</script>

<style scoped lang="scss"></style>
