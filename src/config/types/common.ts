export interface I_Page {
  curpage: number;
  pcount: number;
  perpage: number;
  rcount: number;
}

export interface I_SidebarItem {
  name: string;
  path: string;
  icon: string
}

export interface I_MapProductStatus {
  [key: string]: {
    name: string;
    color: string;
    status: number
  }
}
export interface I_Organization {
  name: string;
  id: string
}

export interface I_User {
  username: string;
  nickname: string
}