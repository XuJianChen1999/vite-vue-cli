/*
 * @Description: 本地存储，兼容local和session
 * @Author: xjc
 * @Date: 2022-06-08 11:17:47
 * @LastEditTime: 2022-06-08 11:22:27
 * @LastEditors: xjc
 */
import {isString, isObject} from './type'
import {TOKEN, USER} from './constant'

// 统一性存取删
export const setItem = (key, value, type = 'localStorage') => {
  if (!key) return
  if (!value) throw new Error('value is required')
  if (isObject(value)) {
    value = JSON.stringify(value)
  }

  return window[type].setItem(key, value)
}
export const getItem = (key, type = 'localStorage') => {
  if (!key) return 
  let data = window[type].getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data || null
  }
}
export const removeItem = (key, type = 'localStorage') => {
  if (!key) return
  window[type].removeItem(key)
}
export const removeAll = (type = 'localStorage') => {
  if (isString(type)) throw new Error('type must be a string')
  window[type].clear()
}

// token
export const setToken = value => setItem(TOKEN, value)
export const getToken = () => getItem(TOKEN)
export const removeToken = () => removeItem(TOKEN)

// userInfo
export const setUser = value => setItem(USER, value)
export const getUser = () => getItem(USER)
export const removeUser = () => removeItem(USER)