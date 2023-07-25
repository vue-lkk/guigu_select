<template>
  <div>
    <!-- 搜索 -->
    <el-card style="margin: 10px 0">
      <el-form :inline="true">
        <el-form-item label="用户名">
          <el-input placeholder="请您输入搜索用户名" v-model="keyword" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="searchRole"
            >搜索</el-button
          >
          <el-button type="info" icon="SwitchButton" @click="resetRole"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 用户管理 -->
    <el-card>
      <div style="margin-bottom: 10px">
        <el-button
          type="primary"
          icon=""
          @click="addUser"
          v-has="`btn.User.add`"
          >添加用户</el-button
        >
        <el-button
          type="danger"
          icon="Delete"
          @click="moveRemove"
          :disabled="selectionRemoveRole.length ? false : true"
          >批量删除</el-button
        >
      </div>
      <el-table
        border
        :data="userRecords"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="#" width="50" align="center" type="index" />
        <el-table-column prop="id" label="ID" width="120" align="center" />
        <el-table-column
          prop="username"
          label="用户名字"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="name"
          label="用户名称"
          min-width="120"
          align="center"
        />
        <el-table-column
          prop="roleName"
          label="用户角色"
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
              @click="assginRole(row)"
              v-has="`btn.User.assgin`"
              >分配角色</el-button
            >
            <el-button
              type="warning"
              icon="Edit"
              size="small"
              @click="updateUser(row)"
              v-has="`btn.User.update`"
              >编辑</el-button
            >

            <el-popconfirm title="是否确定删除?" @confirm="confirmRemove(row)">
              <template #reference>
                <el-button
                  type="danger"
                  icon="Delete"
                  size="small"
                  v-has="`btn.User.remove`"
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
      <!-- 抽屉：添加用户 -->
      <el-drawer v-model="drawer">
        <template #header>
          <h4>添加用户</h4>
        </template>
        <template #default>
          <el-form ref="userFormRef" :model="user" :rules="rules">
            <el-form-item label="用户姓名" prop="username">
              <el-input
                placeholder="请您输入用户姓名"
                v-model="user.username"
              />
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
              <el-input placeholder="请您输入用户昵称" v-model="user.name" />
            </el-form-item>
            <el-form-item label="用户密码" prop="password" v-show="!user.id">
              <el-input
                placeholder="请您输入用户密码"
                v-model="user.password"
              />
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelClick">取消</el-button>
            <el-button type="primary" @click="confirmClick">确定</el-button>
          </div>
        </template>
      </el-drawer>
      <!-- 抽屉：分配角色 -->
      <el-drawer v-model="drawer1">
        <template #header>
          <h4>分配角色(职位)</h4>
        </template>
        <template #default>
          <el-form ref="userFormRef" :model="user" :rules="rules">
            <el-form-item label="用户姓名" prop="username">
              <el-input
                placeholder="请您输入用户姓名"
                v-model="user.username"
                disabled="none"
              />
            </el-form-item>
            <el-form-item label="职位列表" prop="username">
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
                >全选</el-checkbox
              >
              <el-checkbox-group
                v-model="assignRoles"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="role in allRolesList"
                  :key="role.id"
                  :label="role"
                  >{{ role.roleName }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelClick">取消</el-button>
            <el-button type="primary" @click="confirmRole">确定</el-button>
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
  reqAddOrUpdate,
  reqToAssign,
  reqDoAssignRole,
  reqRemove,
  reqPatchRemove,
} from "@/api/acl/user/index";
import {
  UserRecords,
  AssignRoles,
  ToAssign,
  DoAssignRoleBody,
} from "@/api/acl/user/type";
import { ElMessage } from "element-plus";
import UserStore from "@/store/userStore";
import SettingStore from "@/store/setting";
const userStore = UserStore();
// 控制数据的仓库
const useSettingStore = SettingStore();

// 当前页
const currentPage = ref<number>(1);
// 多少条
const pageSize = ref<number>(5);
// 总条数
const total = ref<number>(12);
// 用户管理数据
const userRecords = ref<UserRecords[]>([]);
// 抽屉：添加用户显示/隐藏
let drawer = ref<boolean>(false);
// 抽屉：分配角色显示/隐藏
let drawer1 = ref<boolean>(false);
// 收集添加用户表单
let user = reactive<any>({
  username: "",
  name: "",
  password: "",
});
// 表单检验
const userFormRef = ref<any>(null);
// 分配角色（多选）
// 全选
const checkAll = ref<boolean>(false);
// 设置不确定状态，仅负责样式控制(全选)
const isIndeterminate = ref<boolean>(true);
// 全部角色列表
const allRolesList = ref<AssignRoles[]>([]);
// 已有角色
const assignRoles = ref<AssignRoles[]>([]);
// 搜索关键字
const keyword = ref<string>("");

// 全选复选框的change
const handleCheckAllChange = (val: boolean) => {
  // 拿到val 为true/false,判断为真将cities赋值给checkedCities，否则为[]
  assignRoles.value = val ? allRolesList.value : [];
  isIndeterminate.value = false;
};
// 复选框change事件
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  // 判断是否全选
  checkAll.value = checkedCount === allRolesList.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRolesList.value.length;
};

const validateUsername = (value: any, callback: any) => {
  if (user.username.trim() === "") {
    callback(new Error("用户姓名不能为空"));
  } else if (value.length < 5) {
    callback(new Error("用户姓名不能少于5个字节"));
  } else {
    callback();
  }
};

const validateName = (value: any, callback: any) => {
  if (user.name.trim() === "") {
    callback(new Error("用户昵称不能为空"));
  } else if (value.length < 5) {
    callback(new Error("用户昵称不能少于5个字节"));
  } else {
    callback();
  }
};

const validatePassword = (value: any, callback: any) => {
  if (user.password.trim() === "") {
    callback(new Error("用户密码不能为空"));
  } else if (value.length < 6) {
    callback(new Error("用户密码不能少于6位"));
  } else {
    callback();
  }
};

// 检验规则
const rules = {
  username: [{ validator: validateUsername, trigger: "blur", required: true }],
  name: [{ validator: validateName, trigger: "blur", required: true }],
  password: [{ validator: validatePassword, trigger: "blur", required: true }],
};

onMounted(() => {
  getUser();
});

const getUser = async () => {
  let result = await reqUser(currentPage.value, pageSize.value, keyword.value);
  if (result.code == 200) {
    userRecords.value = result.data.records;
    total.value = result.data.total;
  }
};

const handleSizeChange = () => {
  getUser();
};

const handleCurrentChange = () => {
  getUser();
};

// 修改用户信息
// 拷贝一份用户名
let copyUsername: string = "";
const updateUser = (row: UserRecords) => {
  copyUsername = row.username as string;
  drawer.value = true;
  Object.assign(user, row);
  // console.log(userFormRef.value) // 打印为null,因为form表单还没渲染出来，一开始就是隐藏的
  nextTick(() => {
    // console.log(userFormRef.value) // 可以拿到
    userFormRef.value.clearValidate("username");
    userFormRef.value.clearValidate("name");
  });
};

// 添加用户
const addUser = () => {
  // 清除 (切记必须把id清除)
  Object.assign(user, {
    id: "",
    username: "",
    name: "",
    password: "",
  });
  drawer.value = true;
  // console.log(userFormRef.value) // 打印为null,因为form表单还没渲染出来，一开始就是隐藏的
  nextTick(() => {
    // console.log(userFormRef.value) // 可以拿到
    userFormRef.value.clearValidate("username");
    userFormRef.value.clearValidate("name");
    userFormRef.value.clearValidate("password");
  });
};

// 取消添加用户
const cancelClick = () => {
  drawer.value = false;
};

// 确定添加用户
const confirmClick = async () => {
  // 全部表单验证通过,才能发送请求
  await userFormRef.value.validate();
  drawer.value = false;
  // 发送请求
  let result = await reqAddOrUpdate(user);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: user.id ? "更新用户成功" : "添加用户成功",
    });
    if (user.id) {
      getUser();
      console.log(userStore.username, user.username);
      // 判断是否是修改当前用户的用户名
      if (userStore.username == copyUsername) {
        setTimeout(() => {
          ElMessage({
            type: "warning",
            message: "用户名或密码发生改变，需要重新登录!",
          });
          // 浏览器自动刷新一次 （解决修改的就是当前登录的用户的用户名和密码，必须手动刷新，重新登录才行）
          window.location.reload();
        }, 1000);
      }
    } else {
      currentPage.value = 1;
      getUser();
    }
  } else {
    ElMessage({
      type: "error",
      message: user.id ? "更新用户失败" : "添加用户失败",
    });
  }
};

// 分配角色
const assginRole = async (row: UserRecords) => {
  drawer1.value = true;
  // 合并信息，展示
  Object.assign(user, row);
  // 发送请求
  let result: ToAssign = await reqToAssign(row.id as number);
  console.log(result);
  if (result.code == 200) {
    // 存储全部的职位
    allRolesList.value = result.data.allRolesList;
    // 存储已有的职位
    assignRoles.value = result.data.assignRoles;
  }
};

// 确定分配角色
const confirmRole = async () => {
  // 收集数据
  let data: DoAssignRoleBody = {
    roleIdList: assignRoles.value.map((role) => role.id as string), // 已分配角色的id
    userId: user.id, //用户id
  };
  let result = await reqDoAssignRole(data);
  console.log(result);
  if ((result.code = 200)) {
    ElMessage({
      type: "success",
      message: "分配角色成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: "分配角色失败",
    });
  }
  // 关闭抽屉
  drawer1.value = false;
};

// 单个删除
const confirmRemove = async (row: UserRecords) => {
  console.log(row);
  let result: any = await reqRemove(row.id as number);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "用户删除成功",
    });
    getUser();
  } else {
    ElMessage({
      type: "error",
      message: "用户删除失败",
    });
  }
};

// 准备一个数组存储批量删除的用户的ID
let selectionRemoveRole = ref<UserRecords[]>([]);
// 批量删除
const moveRemove = async () => {
  // 收集要批量删除的id数组
  let idList = selectionRemoveRole.value.map((user) => user.id);
  let result: any = await reqPatchRemove(idList as number[]);
  console.log(result);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "批量删除成功",
    });
    getUser();
  } else {
    ElMessage({
      type: "error",
      message: "批量删除失败",
    });
  }
};
// 收集批量删除的数据
const handleSelectionChange = (selection: UserRecords[]) => {
  selectionRemoveRole.value = selection;
};

// 搜索用户
const searchRole = () => {
  getUser();
};

// 重置
const resetRole = () => {
  // 修改仓库用户点击刷新
  useSettingStore.refresh = !useSettingStore.refresh;
};
</script>

<script lang="ts">
export default {
  name: "aclUser",
};
</script>

<style scoped lang="scss"></style>
