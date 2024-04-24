export interface IMenus {
  path: string;
  title: string;
  exact: boolean;
  icon: string;
  child?: IMenus[];
}
