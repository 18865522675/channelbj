const router_module = {
  path: "/moduleMain",
  meta: {
    title: "系统设置与角色管理",
    show: true, // 是否显示
  },
  component: resolve => require(["../../views/moduleMain.vue"], resolve),
  children: [
	{
		path:"/system/systemManager",
		name:"system/systemManager",
        meta:{
		  title:"系统设置与角色管理",
            show:true
        },
		component: resolve =>
        require(["@/views/systemRole/systemManager.vue"], resolve)
	},
  {
      path:"/system/loginRecord",
      name:"system/loginRecord",
      meta:{
          title:"登陆日志",
          show:true
      },
      component: resolve =>
          require(["@/views/systemRole/loginRecord.vue"], resolve)
  }
  ]
};

export default router_module;
