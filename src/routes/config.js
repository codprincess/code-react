const menuList = [
    {
        title: '首页',
        icon: 'home',
        key: '/home'
    },
    {
        title: '基本组件',
        icon: 'laptop',
        key: '/general',
        subs: [
            { key: '/general/buttons', title: '按钮', icon: '', },
            { key: '/general/Icons', title: '图标', icon: '', },
            { key: '/general/loadings', title: '加载中', icon:''},
            { key: '/general/modals', title: '对话框', icon: '' },
            { key: '/general/notifications', title: '通知提醒', icon: '' },
            { key: '/general/tabs', title: '标签页', icon: '' },
            { key:'/general/carousels',title:'轮播图',icon:''},
            { key: '/general/editor', title: '富文本', icon: '' },
            { key: '/general/messages', title: 'message全局提示', icon: '' },
            { key: '/general/draggable', title: '拖拽', icon: '' },
           

        ]
    },
    {
        title: '表格',
        icon: 'bars',
        key: '/basictable',
        subs:[
            { key: '/basictable/BasicTable', title: '基础表格', icon: '' },
            { key: '/basictable/highTable', title: '高级表格', icon: '' }
        ]
    },
    {
        title: '表单',
        icon: 'bars',
        key: '/form',
        subs: [
            { key: '/form/register', title: '注册表单', icon: '' },
            { key: '/form/login', title: '登录表单', icon: '' },
            { key:'/form/stepForm',title:'分步表单',icon:''},
            { key: '/form/testForm', title: '测试表单', icon: '' }
        ]
    },
   
    {
        title: '用户管理',
        icon: 'desktop',
        key: '/user',
        subs: [
            { key: '/user/user', title: '普通页面', icon: '' },
            { key: '/user/user2', title: '用户管理', icon: '' },
            // { key: '/home/display/list', title: '列表', icon: '' },
            // { key: '/home/display/table', title: '表格', icon: '' },
            // { key: '/home/display/tabs', title: '标签页', icon: '', },
        ]
    },
  
    {
        title: '城市管理',
        icon: 'bulb',
        key: '/city',
        subs: [
            { key: '/city/city', title: '城市管理', icon: '' }
        ]
    },
    {
        title: '订单管理',
        icon: 'bulb',
        key: '/order',
        subs: [
            { key: '/order/index', title: '订单管理', icon: '' }
        ]
    },
    {
        title: '权限管理',
        icon: 'bulb',
        key: '/permission',
        subs: [
            { key: '/permission/index', title: '权限管理', icon: '' }
        ]
    },
    {
        title: '关于',
        icon: 'info-circle-o',
        key: '/home/about'
    }
]
export default menuList;