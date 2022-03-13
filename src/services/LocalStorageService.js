
try {
  var ls = localStorage
} catch (e) {
  console.error(e)
}

const get = (key) => {
  return JSON.parse(ls.getItem(key))
}

const set = (key, value) => {
  return ls.setItem(key, JSON.stringify(value))
}

const remove = (key) => {
  return ls.removeItem(key)
}

export default {
  get,
  set,
  remove
}
