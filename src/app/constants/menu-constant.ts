import { IMenus } from '../interfaces/common/menus';

export const MenuConstant: IMenus[] = [
  {
    path: '/users',
    title: 'Users',
    exact: false,
    icon: 'fas fa-user',
  },
  {
    path: '/albums',
    title: 'Albums',
    exact: false,
    icon: 'fas fa-image',
  },
  {
    path: '/posts',
    title: 'Posts',
    exact: false,
    icon: 'fas fa-edit',
  }
];
