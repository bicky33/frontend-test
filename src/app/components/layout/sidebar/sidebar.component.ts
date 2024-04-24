import { Component } from '@angular/core';
import { MenuConstant } from 'src/app/constants/menu-constant';
import { IMenus } from 'src/app/interfaces/common/menus';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  menus: IMenus[] = [];

  constructor() {
    this.menus = MenuConstant;
  }
}
