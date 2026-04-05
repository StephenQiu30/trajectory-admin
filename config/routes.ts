export default [
  { path: '/', redirect: '/admin/user' },
  {
    name: '用户管理',
    path: '/admin/user',
    component: './Admin/UserList',
    icon: 'UserOutlined',
    access: 'canAdmin',
  },
  {
    name: '图表管理',
    path: '/admin/chart',
    component: './Admin/ChartList',
    icon: 'BarChartOutlined',
    access: 'canAdmin',
  },
  {
    name: '通知管理',
    path: '/admin/notification',
    component: './Admin/NotificationList',
    icon: 'NotificationOutlined',
    access: 'canAdmin',
  },

  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    name: '个人中心',
    path: '/account/center',
    component: './Account/Center',
    icon: 'UserOutlined',
    hidden: true,
    access: 'canUser',
  },

  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    layout: false,
    routes: [
      {
        path: '/exception',
        redirect: '/exception/403',
      },
      {
        name: '403',
        icon: 'smile',
        path: '/exception/403',
        component: './Exception/403',
      },
      {
        name: '404',
        icon: 'smile',
        path: '/exception/404',
        component: './Exception/404',
      },
      {
        name: '500',
        icon: 'smile',
        path: '/exception/500',
        component: './Exception/500',
      },
    ],
  },
  { path: '*', layout: false, component: './Exception/404' },
];
