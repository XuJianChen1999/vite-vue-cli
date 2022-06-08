/*
 * @Description: 请求配置
 * @Author: xjc
 * @Date: 2022-06-08 11:02:46
 * @LastEditTime: 2022-06-08 11:15:01
 * @LastEditors: xjc
 */
export default {
  // 请求超时
	TIMEOUT: 10000,
  // TokenName
	TOKEN_NAME: 'Authorization',
  // Token前缀，注意最后有个空格，如不需要需设置空字符串
	TOKEN_PREFIX: 'Bearer ',
	// Cookie
	COOKIE: 'Cookie',
  // 追加其他头
	HEADERS: {},
  // 请求是否开启缓存
	REQUEST_CACHE: false,
  // 隐藏loading时间
	HIDE_LOADING_TIME: 500,
  // http错误码
  ERROR_CODES: [500, 502, 503, 504, 403, 404, 400, 401],
  // 错误码提示
  ERROR_CODE_MAP: {
    400: '请求错误',
    401: '登录状态失效，请重新登录',
    403: '拒绝访问',
    404: '请求地址不存在',
    500: '服务器繁忙',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时'
  },
  LOADING_SVG: `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
  `
}