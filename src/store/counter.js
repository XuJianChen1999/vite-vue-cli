/*
 * @Description: counter store
 * @Author: xjc
 * @Date: 2022-06-08 09:31:28
 * @LastEditTime: 2022-06-08 10:38:15
 * @LastEditors: xjc
 */
import {ref} from 'vue'
import {defineStore} from 'pinia'
import {COUNTER_STORE} from '@/utils/constant'

export default defineStore(COUNTER_STORE, () => {
  const counter = ref(0)

  function updateCount() {
    counter.value = counter.value + 1
  }
  function resetCount() {
    counter.value = 0
  }

  return {
    counter,
    updateCount, resetCount
  }
})
