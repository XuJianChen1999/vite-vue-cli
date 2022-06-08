/*
 * @Description: axios请求
 * @Author: xjc
 * @Date: 2022-06-08 10:57:18
 * @LastEditTime: 2022-06-08 11:17:19
 * @LastEditors: xjc
 */
import axios from 'axios'
import {ElNotification, ElMessageBox, ElMessage, ElLoading} from 'element-plus'
import router from '@/router'
import requestConfig from '@/config/request'
import {getToken, removeAll} from '@/utils/local'

let loadingInstance = null
const {
  TIMEOUT, LOADING_SVG, HIDE_LOADING_TIME,
  TOKEN_NAME, REQUEST_CACHE, HEADERS,
  ERROR_CODES, ERROR_CODE_MAP
} = requestConfig

axios.defaults.withCredentials = true
axios.defaults.timeout = TIMEOUT

// 请求拦截
axios.interceptors.request.use(config => {
  const {
    lock = true,
    loading = true,
    text = '加载中...',
    spinner = LOADING_SVG,
    background = 'rgba(0, 0, 0, 0.7)',
  } = config
  if (loading) {
    loadingInstance = ElLoading.service({
      lock,
      text,
      spinner,
      background
    })
  }

  // 如果使用token则使用下面代码
  let token = getToken()
  if (token) {
    console.log(TOKEN_NAME)
    config.headers[TOKEN_NAME] = token
  }
  if (!REQUEST_CACHE && config.method === 'get') {
    config.params = config.params || {}
    // config.params['_'] = new Date().getTime()
  }
  Object.assign(config.headers, HEADERS)
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
  const {status, data} = response
  if ([401, 403].includes(status)) {
    removeAll()
    // window.location.reload()
    router.replace({path: '/login'})
    return false
  }
  !data.flag && ElMessage.error(data.message)
  hideLoading(loadingInstance, HIDE_LOADING_TIME)

  return response.data
}, error => {
  hideLoading(loadingInstance, HIDE_LOADING_TIME)

  if (error.response) {
    const res = error.response
    const statusCode = res.status

    if (ERROR_CODES.includes(statusCode)) {
      if ([401, 403].includes(statusCode)) {
        ElMessageBox.confirm('当前用户已被登出或无权限访问当前资源，请尝试重新登录后再操作。', '无权限访问', {
          type: 'error',
          center: true,
          showClose: false,
          showCancelButton: false,
          closeOnClickModal: false,
          confirmButtonText: '重新登录'
        }).then(() => {
          removeAll()
          router.replace({path: '/login'})
        }).catch(() => {})

        return
      } else {
        ElNotification.error({
          title: '请求错误',
          message: ERROR_CODE_MAP[statusCode]
        })
      }
    } else {
      ElNotification.error({
        title: '请求错误',
        message: res.data.message || `Status: ${res.status}，未知错误！`
      })
    }
  } else {
    console.error(error)
    ElNotification.error({
      title: '请求错误',
      message: '请求服务器无响应！'
    })
  }

  return Promise.reject(error.response)
})

function hideLoading(instance, time) {
  const timer = setTimeout(() => {
    instance && instance.close()
    clearTimeout(timer)
  }, time)
}