const changePower = (list, power) => {
  for (let i = 0; i < list.length; i++) {
    if (power.findIndex(item => item === list[i].power) > -1) {
      list[i].hide = false;
    }
    if (list[i].children) {
      changePower(list[i].children, power);
    }
  }
};

const getNewMenu = power => {
  let menu = [
    {
      key: "school",
      title: "学校管理",
      hide: true,
      icon: "radar-chart",
      power: "s-m-1",
      meta: {
        title: "学校管理"
        // affix: true,
      }
    },
    //-------------------------
    {
      key: "12",
      title: "个人中心",
      icon: "user",
      //   hide: true,
      //   power: "m-7",
      meta: {
        title: "个人中心"
      },
      children: [
        {
          key: "personal-center/info",
          title: "我的信息",
          //   hide: true,
          //   power: "m-7-1",
          //   alwaysShow: false,
          meta: {
            title: "我的信息"
            // affix: false
          }
        },
        {
          key: "studentStatus-index",
          title: "学籍管理",
          meta: {
            title: "学籍管理"
          }
        },
        {
          key: "gradeManagement1",
          title: "成绩录入",
          meta: {
            title: "成绩录入"
          }
        },
        {
          key: "gradeIn",
          title: "成绩密录",
          //   hide: true,
          //   power: "m-18-4",
          meta: {
            title: "成绩密录"
          }
        },
        {
          key: "repairEquipment",
          title: "设备报修",
          meta: {
            title: "设备报修"
          }
        },
        // {
        //   key: "personal-center/class",
        //   title: "我的班级",
        //   //   hide: true,
        //   //   power: "m-7-2",
        //   //   alwaysShow: false,
        //   meta: {
        //     title: "我的班级"
        //     // affix: false
        //   },
        //   children: [

        //   ]
        // },
        {
          key: "personal-center/schedule",
          title: "我的排课",
          //   hide: true,
          //   power: "m-7-3",
          //   alwaysShow: false,
          meta: {
            title: "我的排课"
            // affix: false
          }
        },
        {
          key: "personal-center/community",
          title: "我的社团课",
          //   hide: true,
          //   power: "m-7-4",
          //   alwaysShow: false,
          meta: {
            title: "我的社团课"
            // affix: false
          }
        }
      ]
    },
    {
      key: "club_course_selection",
      title: "社团选课",
      icon: "usergroup-add",
      hide: true,
      power: "m-8",
      meta: {
        title: "社团选课"
      }
    },
    {
      key: "10",
      title: "新生管理",
      icon: "smile",
      hide: true,
      power: "m-1",
      meta: {
        title: "新生管理"
        // affix: true,
      },
      children: [
        {
          key: "freshmenReport",
          title: "新生报到",
          hide: true,
          power: "m-1-1",
          // alwaysShow: true,
          meta: {
            title: "新生报到"
            // affix: true,
          }
        },
        {
          key: "Smartplacement",
          title: "智能分班",
          hide: true,
          power: "m-1-2",
          // alwaysShow: true,
          meta: {
            title: "智能分班"
            // affix: true,
          }
        }
      ]
    },
    //暂去
    {
      key: "15",
      title: "素质管理",
      icon: "file",
      //   hide: true,
      //   power: "m-18",
      meta: {
        title: "素质管理"
        // affix: true,
      },
      children: [
        {
          key: "gradeManagement",
          title: "成绩管理",
          hide: true,
          power: "m-18-1",
          meta: {
            title: "成绩管理"
          }
        },

        {
          key: "jcManagement",
          title: "奖惩管理",
          hide: true,
          power: "m-18-2",
          meta: {
            title: "奖惩管理"
          }
        },
        {
          key: "twManagement",
          title: "体卫管理",
          hide: true,
          power: "m-18-3",
          meta: {
            title: "体卫管理"
          }
        }
      ]
    },
    // {
    //   key: "studentStatus-index",
    //   title: "学籍管理(班)",
    //   icon: "user-add",
    //   hide: true,
    //   power: "m-4",
    //   meta: {
    //     title: "学籍管理"
    //     // affix: true,
    //   }
    // },
    {
      key: "changingCourse",
      title: "代调课管理",
      icon: "user-add",
      hide: true,
      power: "m-9",
      meta: {
        title: "代调课管理"
      }
    },
    // {
    //   key: "changingCourse",
    //   title: "代调课管理",
    //   icon: "user-add",
    //   hide: true,
    //   power: "m-9",
    //   meta: {
    //     title: "代调课管理"
    //   }
    // },
    {
      key: "repairManagement",
      title: "报修管理",
      icon: "user-add",
      hide: true,
      power: "m-10",
      meta: {
        title: "报修管理"
      }
    },
    {
      key: "studentStatus-copy",
      title: "学籍管理",
      icon: "user-add",
      hide: true,
      power: "m-4-4-4",
      meta: {
        title: "学籍管理"
        // affix: true,
      }
    },
    // {
    //   key: "supplementary",
    //   title: "补充信息设置",
    //   icon: "zoom-in",
    //   hide: true,
    //   power: "m-4-4",
    //   meta: {
    //     title: "补充信息"
    //     // affix: true,
    //   }
    // },

    //---------------------------------start教师管理----------------------------------------------
    {
      key: "11",
      title: "教师管理",
      icon: "contacts",
      hide: true,
      power: "m-5",
      meta: {
        title: "教师管理"
        // affix: true,
      },
      children: [
        {
          key: "baseInformation",
          title: "基本信息",
          hide: true,
          power: "m-5-5",
          meta: {
            title: "基本信息"
          }
        }
      ]
    },

    //---------------------------------end教师管理----------------------------------------------
    {
      key: "intelligenceClass",
      title: "智能排课",
      icon: "user-add",
      hide: true,
      power: "m-6",
      meta: {
        title: "智能排课"
      }
    },
    {
      key: "1",
      title: "系统管理",
      icon: "setting",
      hide: true,
      power: "m-2",
      meta: {
        title: "系统管理"
      },
      children: [
        {
          key: "system/department",
          title: "组织架构",
          hide: true,
          power: "m-2-2",
          alwaysShow: false,
          meta: {
            title: "组织架构",
            affix: false
          }
        },
        // {
        //     key: "23",
        //     title: "类别管理",
        //     hide: true,
        //     power: 'm-2-3',
        //     alwaysShow: false,
        //     meta: {
        //         title: "类别管理",
        //         affix: false,
        //     },
        // },
        {
          key: "NoteSend",
          title: "短信通道",
          hide: true,
          power: "m-2-4",
          alwaysShow: false,
          meta: {
            title: "短信通道",
            affix: false
          }
        },
        {
          key: "BasicSetting",
          title: "基本设置",
          hide: true,
          power: "m-2-5",
          meta: {
            title: "基本设置"
          }
        }
      ]
    },
    {
      key: "2",
      title: "日志管理",
      icon: "diff",
      hide: true,
      power: "m-3",
      meta: {
        title: "日志管理"
      },
      children: [
        {
          key: "logger/login",
          title: "登录日志",
          hide: true,
          power: "m-3-1",
          alwaysShow: false,
          meta: {
            title: "登录日志",
            affix: false
          }
        },
        {
          key: "logger/action",
          title: "操作日志",
          hide: true,
          power: "m-3-2",
          alwaysShow: false,
          meta: {
            title: "操作日志",
            affix: false
          }
        }
      ]
    }
  ];

  changePower(menu, power);

  return menu;
};

const state = () => ({
  //一些样式状态
  heardLeft: "150px", //顶部距离左边的距离
  contentLeft: "150px", //内容距离左边的距离
  transition: "all 0.2s", //菜单展开收缩时的过度效果
  //一些状态设置
  collapsed: false, //菜单收起状态(false:收起,true展开)
  logoShow: false, //是否显示logo
  authInfo: true, //是否显示头部右上角内容
  /**
   * 菜单数组(配置)
   * 参数说明
   * key:页面地址
   * title:菜单的名称
   * icon:图标
   * hide:该菜单是否隐藏 (默认false)
   * alwaysShow: 是否一直显示  刷新页面 tab也会一直留着   (true/false)
   * meta:{
   *    title:tab标签的名称
   *    affix:是否固定显示
   * }
   */
  menuList: [
    //##插入位置
  ]
});

const mutations = {
  open(state) {
    //布局变大时打开菜单
    state.heardLeft = "150px";
    state.contentLeft = "150px";
    state.collapsed = false;
    state.logoShow = false;
  },
  close(state) {
    //布局缩小时关闭菜单
    state.heardLeft = "63.5px";
    state.contentLeft = "66px";
    state.collapsed = true;
    state.logoShow = true;
  },
  changeCollapsed(state, type) {
    //展开与关闭菜单
    state.collapsed = type;
    state.logoShow = type;
    if (type) {
      state.heardLeft = "63.5px";
      state.contentLeft = "66px";
    } else {
      state.heardLeft = "150px";
      state.contentLeft = "150px";
    }
  },
  changeAuthInfo(state, type) {
    state.authInfo = type;
  },
  changeStudentIndexTitle(state, title) {
    let idx = state.menuList.findIndex(item => item.key === "studentIndex");
    let list = state.menuList.find(item => item.key === "studentIndex");
    list.title = title;
    list.meta.title = title;
    state.menuList[idx] = list;
  },
  getUserMenu(state, menu) {
    let list = [
      // {
      //     key: "dashboard",
      //     title: "控制台",
      //     alwaysShow: true,
      //     meta: {
      //         title: "控制台",
      //         // affix: true,
      //     }
      // },
      // {
      //     key: "0",
      //     title: "开发设置",
      //     icon: 'edit',
      //     hide: false,
      //     meta: {
      //         title: "开发设置"
      //     },
      //     children: [{
      //         key: "devSystem",
      //         title: "页面生成",
      //         alwaysShow: false,
      //         meta: {
      //             title: "页面生成",
      //             affix: false,
      //         },
      //     }]
      // },
      {
        key: "studentIndex",
        title: "学生首页",
        icon: "edit",
        hide: true,
        // alwaysShow:true,
        meta: {
          title: "学生首页"
          // affix: true,
        }
      }
    ];
    state.menuList = [...list, ...menu];
  }
};

const actions = {
  open(context) {
    context.commit("open");
  },
  close(context) {
    context.commit("close");
  },
  changeCollapsed(context, type) {
    context.commit("changeCollapsed", type);
  },
  changeAuthInfo(context, type) {
    context.commit("changeAuthInfo", type);
  },
  changeStudentIndexTitle(context, title) {
    return new Promise((resolve, reject) => {
      try {
        context.commit("changeStudentIndexTitle", title);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  },
  getUserMenu(context, power) {
    return new Promise((resolve, reject) => {
      try {
        let menu = getNewMenu(power);
        context.commit("getUserMenu", menu);
        resolve(menu);
      } catch (e) {
        reject(e);
      }
    });
  }
};

export default {
  state,
  mutations,
  actions
};
