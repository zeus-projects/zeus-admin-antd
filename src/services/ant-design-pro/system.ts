import { request } from '@umijs/max';

export async function fetchDeptList(options?: { [key: string]: any },) {
  return request<API.DeptListItem>('/api/system/dept/list', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function addDept(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/system/dept', {
    method: 'POST',
    data:{
      method: 'post',
      ...(options || {}),
    }
  });
}
