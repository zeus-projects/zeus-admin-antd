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
