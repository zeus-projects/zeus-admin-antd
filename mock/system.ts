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

export default {
  'GET /api/system/dept/list': fetchDeptList,
  'POST /api/system/dept': addDept,
  'GET /api/system/menu/list': fetchMenuList,
  'POST /api/system/menu': addMenu,
};
