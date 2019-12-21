/**
 * Creact by 小公主 on 2019/12/07.
 */
/**
 * axios全局配置
 */
import axios from 'axios'

//创建axios实例

const service = axios.create({
   // baseURL: 'https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99', // api的base_url
    timeout: 200000, // 请求超时时间
    withCredentials: true // 选项表明了是否是跨域请求
})
service.interceptors.request.use(config => {
   // Toast.loading('加载中', 1)              // loading组件，显示文字加载中，自动关闭延时1s
    console.log('request go');
    return config;
}, err => {
    console.log('请求失败')
    return Promise.reject(err)
})
//拦截响应
service.interceptors.response.use(config => {
   // Toast.hide()                             // 销毁Toast组件
    console.log('response get')
    return config;
}, err => {
    console.log('响应失败')
    return Promise.reject(err)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        console.log('拦截器', response)
        if (response.data.code === 40008) {
            // 40008 说明 token 验证失败
            // 可以直接跳转到登录页面，重新登录获取 token
            window.location.reload();//刷新页面，如果该页面需要登录，则会自动跳转到登录页面
            return {
                code: 12000,
                message: "登录过时,退出请重新登录"
            };
        }
        return response.data;
    },
    error => {
        return Promise.reject(error)
    }
)
export default service