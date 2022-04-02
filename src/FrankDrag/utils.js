const isObject = (obj) => {
  return typeof obj === 'object' && obj !== null
}

const deepCopy = (source) => {
  if (!isObject(source)) return source; //如果不是对象的话直接返回
  let target = Array.isArray(source) ? [] : {} //数组兼容
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      if (typeof source[k] === 'object') {
        target[k] = deepCopy(source[k])
      } else {
        target[k] = source[k]
      }
    }
  }
  return target
}

const arrayMove = (items, oldIndex, newIndex) => {
  const temp = items[oldIndex]
  const tempList = [...items]
  tempList.splice(oldIndex, 1)
  tempList.splice(newIndex, 0, temp)
  return tempList
}

const isPathHave = (paths, id) => {
  for (let i = 0; i < paths?.length; i++) {
    const tempPath = paths[i]
    if (tempPath.id === id) return true
  }
  return false
}

export { deepCopy, arrayMove, isPathHave }