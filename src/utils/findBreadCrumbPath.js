export const findBreadcrumbPath = (menu, currentLink) => {
  let path = []

  const findPath = (menu) => {
    for (const item of menu) {
      if (item.link === currentLink) {
        path.push(item.title)
        return true
      }
      if (item.children) {
        path.push(item.title)
        if (findPath(item.children)) return true
        path.pop()
      }
    }
    return false
  }

  findPath(menu)
  return path
}
