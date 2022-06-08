/*
 * @Description: user store
 * @Author: xjc
 * @Date: 2022-06-08 10:39:38
 * @LastEditTime: 2022-06-08 10:46:19
 * @LastEditors: xjc
 */
import {ref} from 'vue'
import {defineStore} from 'pinia'
import {USER_STORE} from '@/utils/constant'
import {isObject} from '@/utils/type'

const initUser = {
  username: 'xjc',
  password: 'password',
  sex: '未知',
  worker: '前端开发',
  age: 18
}

export default defineStore(USER_STORE, () => {
  const userInfo = ref(initUser)

  function updateUser(user) {
    if (!isObject(user)) throw new Error('user must be an object')
    userInfo.value = user
  }

  return {
    userInfo,
    updateUser
  }
})