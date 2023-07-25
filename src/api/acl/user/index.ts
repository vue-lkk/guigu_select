import request from "@/utils/request";
import { User, UserRecords, ToAssign, DoAssignRoleBody } from "./type";

enum api {
  USER_URL = "/admin/acl/user/",
  ADDUSER_URL = "/admin/acl/user/save",
  UPDATEUSER_URL = "/admin/acl/user/update",
  TOASSIGN_URL = "/admin/acl/user/toAssign/",
  DOASSIGNROLE_UTL = "/admin/acl/user/doAssignRole",
  REMOVE_URL = "/admin/acl/user/remove/",
  BATCHREMOVE_url = "/admin/acl/user/batchRemove",
}

// 获取用户管理数据/搜索
export const reqUser = (page: number, limit: number, username: string) =>
  request.get<any, User>(
    api.USER_URL + `${page}/${limit}/?username=${username}`
  );

// 添加用户/更新用户
export const reqAddOrUpdate = (user: UserRecords) => {
  if (user.id) {
    // 更新
    return request.put<any, any>(api.UPDATEUSER_URL, user);
  } else {
    // 添加
    return request.post<any, any>(api.ADDUSER_URL, user);
  }
};

// 获取用户全部的职位，包含当前用户已有的职位
export const reqToAssign = (adminId: number) =>
  request.get<any, ToAssign>(api.TOASSIGN_URL + adminId);

// 根据用户分配角色
export const reqDoAssignRole = (data: DoAssignRoleBody) =>
  request.post<any, any>(api.DOASSIGNROLE_UTL, data);

// 删除管理用户
export const reqRemove = (id: number) =>
  request.delete<any, any>(api.REMOVE_URL + id);

export const reqPatchRemove = (idList: number[]) =>
  request.delete<any, any>(api.BATCHREMOVE_url, { data: idList });
