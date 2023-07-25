import request from "@/utils/request";
import { RoleRecords, Records } from "./type";

enum api {
  RLOE_URL = "/admin/acl/role/",
  ADDROLE_URL = "/admin/acl/role/save",
  UPDATEROLE_URL = "/admin/acl/role/update",
  ASSGINPERMISSION_URL = "/admin/acl/permission/toAssign/",
  DOASSIFNPERMISSION_URL = "/admin/acl/permission/doAssign",
  REMOVEROLE_URL = "/admin/acl/permission/remove/",
}

// 获取职位管理数据/搜索
export const reqUser = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleRecords>(
    api.RLOE_URL + `${page}/${limit}/?roleName=${roleName}`
  );

// 添加/更新角色
export const reqAddOrUpdateRole = (data: Records) => {
  if (data.id) {
    return request.put<any, any>(api.UPDATEROLE_URL, data);
  } else {
    return request.post<any, any>(api.ADDROLE_URL, data);
  }
};

// 获取已分配权限
export const reqAssginPermission = (roleId: number) =>
  request.get<any, any>(api.ASSGINPERMISSION_URL + roleId);

// 给角色分配权限
export const reqDoAssignPernission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    api.DOASSIFNPERMISSION_URL +
      `?roleId=${roleId}&permissionId=${permissionId}`
  );

export const reqRemoveRole = (id: number) =>
  request.delete<any, any>(api.REMOVEROLE_URL + id);
