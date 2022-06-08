/*
 * @Description: 变量类型检查
 * @Author: xjc
 * @Date: 2022-06-08 10:44:03
 * @LastEditTime: 2022-06-08 10:45:32
 * @LastEditors: xjc
 */
const toString = Object.prototype.toString
const checkTypeFn = type => {
  return function isType(value) {
    return toString.call(value) === `[object ${type}]`
  }
}

export const isFunc = checkTypeFn('Function')
export const isUndefined = checkTypeFn('Undefined')
export const isArray = checkTypeFn('Array')
export const isString = checkTypeFn('String')
export const isObject = checkTypeFn('Object')
export const isNumber = checkTypeFn('Number')
export const isDate = checkTypeFn('Date')
export const isHtmlElement = node => node && node.nodeType === Node.ELEMENT_NODE
export const isDefined = val => val !== undefined && val !== null