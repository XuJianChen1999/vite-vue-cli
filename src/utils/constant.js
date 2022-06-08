/*
 * @Author: xjc
 * @Date: 2022-06-08 10:25:26
 * @LastEditors: xjc
 * @LastEditTime: 2022-06-08 11:01:29
 * @Description: 常量文件
 */
import config from '@/config'

// store常量
const storeSuffix = 'STORE'
export const USER_STORE = `USER_${storeSuffix}`
export const COUNTER_STORE = `COUNTER_${storeSuffix}`

// 缓存常量
const baseName = config.APP_NAME
export const TOKEN = `${baseName}_TOKEN`
export const USER = `${baseName}_USER`