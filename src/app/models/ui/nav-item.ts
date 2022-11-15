export type NavItem = {
  name: string,
  icon: string,
  path: string,
  active?: boolean
  children?: NavItem[]
};

export const markNavItemActive = (itemIndex: number, items: NavItem[]) => {
  items.forEach((item, index) => item.active = index == itemIndex);
}
export const markNavItemActiveByPath = (items: NavItem[], path?: string,) => {
  items.forEach((item) => item.active = item.path == location.pathname);
}

export const SIDEBAR_DASHBOARD_MENU_ITEMS: NavItem[] = [
  {name: "Home", path: '/dashboard', icon: 'pi pi-fw pi-home', active: true},
  {
    name: "Subjects", path: '/dashboard/subject', icon: 'pi pi-fw pi-book', active: false,
    children: [
      {name: 'Add Subject', path: '/dashboard/subject/add', icon: 'pi pi-fw pi-plus', active: false}
    ]
  },
  {name: "Class", path: '/dashboard/class', icon: 'pi pi-fw pi-list', active: false},
  {
    name: "Students", path: '/dashboard/student', icon: 'pi pi-fw pi-users', active: false,
    children: [
      {name: "Add Student", path: '/dashboard/student/add', icon: 'pi pi-fw pi-plus', active: false},
    ]
  },
  {name: "Applications", path: '/dashboard/application', icon: 'pi pi-fw pi-home', active: false},
  {name: "Settings", path: '/dashboard/settings', icon: 'pi pi-fw pi-cog', active: false},
  {name: 'Admin Dashboard', icon: 'pi pi-fw pi-arrow-left', path: '/admin', active: false},
];

export const SIDEBAR_ADMIN_MENU_ITEMS: NavItem[] = [
  {name: 'Home', icon: 'pi pi-fw pi-home', path: '/admin', active: true},
  {name: 'Users', icon: 'pi pi-fw pi-user', path: '/admin/users', active: false,},
  {name: 'Admins', icon: 'pi pi-fw pi-user', path: '/admin/admins', active: false,},
  {name: 'Teachers', icon: 'pi pi-fw pi-user', path: '/admin/teachers', active: false,},
  {name: 'Settings', icon: 'pi pi-fw pi-cog', path: '/admin/settings', active: false,},
  {name: 'School Dashboard', icon: 'pi pi-fw pi-arrow-right', path: '/dashboard', active: false,},
];

export const SIDEBAR_STUDENT_MENU_ITEMS: NavItem[] = [
  {name: 'Home', icon: 'pi pi-fw pi-home', path: '/student/home', active: true,},
  {name: 'Applications', icon: 'pi pi-fw pi-book', path: '/student/application', active: false,},
  {name: 'Subjects', icon: 'pi pi-fw pi-list', path: '/student/subjects', active: false,},
  {name: 'Results', icon: 'pi pi-fw pi-list', path: '/student/results', active: false,},
];
