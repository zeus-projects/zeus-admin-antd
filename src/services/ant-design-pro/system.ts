import { request } from '@umijs/max';

export async function fetchDeptList(options?: { [key: string]: any }) {
  return request<API.DeptListItem>('/api/system/dept/list', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function addDept(options?: { [key: string]: any }) {
  return request<API.DeptListItem>('/api/system/dept', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

export async function fetchMenuList(options?: { [key: string]: any }) {
  return request<API.MenuListItem>('/api/system/menu/list', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function addMenu(options?: { [key: string]: any }) {
  return request<API.MenuListItem>('/api/system/menu', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

export async function fetchRolePage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RoleListItem>('/api/system/role/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addRole(options?: { [key: string]: any }) {
  return request<API.RoleListItem>('/api/system/role', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

export async function fetchUserPage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.UserListItem>('/api/system/user/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addUser(options?: { [key: string]: any }) {
  return request<API.UserListItem>('/api/system/user', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}
