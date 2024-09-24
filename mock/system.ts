import { Request, Response } from 'express';

async function fetchDeptList(req: Request, res: Response) {
  const data: API.DeptListItem[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      id: i,
      name: `这一第${i + 1}个部门`,
      status: i % 2 === 0 ? 0 : 1,
      parentId: 0,
    });
  }
  res.send({
    success: true,
    data,
  });
}

async function addDept(req: Request, res: Response) {
  setTimeout(() => {
    res.send({ data: {}, success: true });
  }, 1000);
}

async function fetchMenuList(req: Request, res: Response) {
  const data: API.DeptListItem[] = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      id: i,
      name: `这一第${i + 1}个菜单`,
      status: i % 2 === 0 ? 0 : 1,
      parentId: 0,
    });
  }
  res.send({
    success: true,
    data,
  });
}

async function addMenu(req: Request, res: Response) {
  setTimeout(() => {
    res.send({ data: {}, success: true });
  }, 1000);
}

async function fetchRolePage(req: Request, res: Response) {
  const data: API.RoleListItem[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: i,
      name: `这一第${i + 1}个角色`,
      status: i % 2 === 0 ? 0 : 1,
    });
  }
  const { current = 1, pageSize = 10 } = req.query;
  let dataSource = [...data].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {
    data: dataSource,
    total: 100,
    success: true,
    pageSize: parseInt(`${pageSize}`, 10) || 10,
    current: parseInt(`${current}`, 10) || 1,
  };

  return res.json(result);
}

async function addRole(req: Request, res: Response) {
  setTimeout(() => {
    res.send({ data: {}, success: true });
  }, 1000);
}

async function fetchUserPage(req: Request, res: Response) {
  const data: API.UserListItem[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: i,
      username: `这一第${i + 1}个用户`,
      fullname: `张三${i}`,
      nickname: `李四${i}`,
      gender: i % 2 === 0 ? 0 : 1,
      status: i % 2 === 0 ? 0 : 1,
      phone: '13800000000',
    });
  }
  const { current = 1, pageSize = 10 } = req.query;
  let dataSource = [...data].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {
    data: dataSource,
    total: 100,
    success: true,
    pageSize: parseInt(`${pageSize}`, 10) || 10,
    current: parseInt(`${current}`, 10) || 1,
  };

  return res.json(result);
}

async function addUser(req: Request, res: Response) {
  setTimeout(() => {
    res.send({ data: {}, success: true });
  }, 1000);
}

export default {
  'GET /api/system/dept/list': fetchDeptList,
  'POST /api/system/dept': addDept,
  'GET /api/system/menu/list': fetchMenuList,
  'POST /api/system/menu': addMenu,
  'GET /api/system/role/page': fetchRolePage,
  'POST /api/system/role': addRole,
  'GET /api/system/user/page': fetchUserPage,
  'POST /api/system/user': addUser,
};
