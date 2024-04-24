import { IMenus } from '../interfaces/common/menus';

export const MenuConstant: IMenus[] = [
  {
    path: '/',
    title: 'Dashboard',
    exact: true,
    icon: 'fas fa-tachometer-alt',
  },
  {
    path: '/users',
    title: 'Users',
    exact: false,
    icon: 'fas fa-user',
  },
  {
    path: '/partner',
    title: 'Partner',
    exact: false,
    icon: 'fa fa-building',
    child: [
      {  
        path: '/partner/partner',
        title: 'Partner',
        exact: false,
        icon: 'fa fa-car',
      },
      {
        path: '/partner/workorder',
        title: 'Partner Work Order',
        exact: false,
        icon: 'fa fa-briefcase',
      }
    ]
  },
];
