import request from "@/utils/request";
import { MenuList, AddOrUpdateBody } from "./type";

enum api {
  MENUPERMISSION_URL = "/admin/acl/permission",
  ADDPERMISSION_URL = "/admin/acl/permission/save",
  UPDATEPERMISSION_UTL = "/admin/acl/permission/update",
  REMOVEMENU_URL = "/admin/acl/permission/remove/",
}

// 获取菜单管理数据
export const reqMenuPermission = () =>
  request.get<any, MenuList>(api.MENUPERMISSION_URL);

// 添加菜单/修改菜单
export const reqAddOrUpdatePermission = (data: AddOrUpdateBody) => {
  if (data.id) {
    return request.put<any, any>(api.UPDATEPERMISSION_UTL, data);
  } else {
    return request.post<any, any>(api.ADDPERMISSION_URL, data);
  }
};

// 删除菜单
export const reqRemoveMenu = (id: number) =>
  request.delete<any, any>(api.REMOVEMENU_URL + id);
