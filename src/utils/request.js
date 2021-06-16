import axios from 'axios'
import store from '@/store'
import {message, spin} from 'ant-design-vue'


// 创建 axios 实例
const service = axios.create({
    // baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
    timeout: 18000 // 请求超时时间
})


service.interceptors.request.use(config => {
        const token = localStorage.get('Access-Token')
        if (token) {
            config.headers['X-Requested-With'] = 'XMLHttpRequest'
            config.headers['Access-Control-Allow-Origin'] = '*'
            config.headers['Authorization'] = token.accessToken
        }
        return config
    },
    error => {
        console.log(error) // for debug
        
        if (error.response) {
            const data = error.response.data
            message.error(data.message)
            if (error.response.status === 401) {
                store.dispatch('Logout').then(() => {
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 1500)
                })
            }
        }
        return Promise.reject(error)
    }
)

service.interceptors.response.use((response) => {
    return response.data
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)'; break
            case 401: err.message = '没有权限，请重新登录'; break
            case 403: err.message = '拒绝访问(403)'; break
            case 404: err.message = '请求出错(404)'; break
            case 408: err.message = '登录超时，请重新登录'; break
            case 500: err.message = '服务器错误(500)'; break
            case 501: err.message = '服务未实现(501)'; break
            case 502: err.message = '网络错误(502)'; break
            case 503: err.message = '服务不可用(503)'; break
            case 504: err.message = '网络超时，请稍后再试'; break
            case 505: err.message = 'HTTP版本不受支持(505)'; break
            default: err.message = `连接出错(${err.response.status})!`
        }
        // const data = err.response.data
        if ((err.response.status === 401 || err.response.status === 408)) {
            message.error(err.message)
            store.dispatch('Logout').then(() => {
                setTimeout(() => {
                    window.location.href = '/'
                }, 1500)
            })
        }
    } else {
        err.message = '连接服务器失败!'
        message.error(err.message)
    }
    return Promise.reject(err)
})
