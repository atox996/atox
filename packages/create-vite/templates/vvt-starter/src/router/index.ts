export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layouts,
      redirect: "/home",
      meta: {
        single: true,
      },
      children: [
        {
          path: "/home",
          name: "Home",
          meta: {
            title: "首页",
            icon: DashboardIcon,
            keepAlive: true,
          },
          component: () => import("@/views/Home/index.vue"),
        },
      ],
    },
    {
      path: "/test-submenu",
      name: "TestSubmenu",
      component: Layouts,
      redirect: "/test-submenu/test1",
      meta: {
        title: "测试子菜单",
        icon: "earth",
      },
      children: [
        {
          path: "/test-submenu/test1",
          name: "TestSubmenu-test1",
          meta: {
            title: "测试1",
          },
          redirect: "/test-submenu/test1-1",
          children: [
            {
              path: "/test-submenu/test1-1",
              name: "TestSubmenu-test1-1",
              meta: {
                title: "测试1-1",
              },
              component: () => import("@/views/Test/test1-1.vue"),
            },
          ],
        },
        {
          path: "/test-submenu/test2",
          name: "TestSubmenu-test2",
          meta: {
            title: "测试2",
          },
          redirect: "/test-submenu/test2-1",
          children: [
            {
              path: "/test-submenu/test2-1",
              name: "TestSubmenu-test2-1",
              meta: {
                title: "测试2-1",
              },
              component: () => import("@/views/Test/test2-1.vue"),
            },
            {
              path: "/test-submenu/test2-2",
              name: "TestSubmenu-test2-2",
              meta: {
                title: "测试2-2",
              },
              redirect: "/test-submenu/test2-2-1",
              children: [
                {
                  path: "/test-submenu/test2-2-1",
                  name: "TestSubmenu-test2-2-1",
                  meta: {
                    title: "测试2-2-1",
                  },
                  component: () => import("@/views/Test/test2-2-1.vue"),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
