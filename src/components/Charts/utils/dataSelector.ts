function keySplitter (key: string): [string, string] {
  // Split the string by dot
  const parts = key.split('.')

  // Get the first part
  const firstPart = parts[0]

  // Get the remaining parts
  const remainingParts = parts.slice(1).join('.')

  return [firstPart, remainingParts]
}

export function dataSelector (data: any, key?: string): any {
  if (data === undefined) {
    return undefined
  }

  if (key == null) {
    return data
  }

  const [lhs, rhs] = keySplitter(key) // "a.b.c" => ["a", "b.c"]

  if (lhs === '') {
    return data
  }

  const isArray = Array.isArray(data)
  if (isArray) {
    const index = parseInt(lhs)

    if (isNaN(index)) {
      return data.map((item) => dataSelector(item, key))
    }

    return dataSelector(data[index], rhs)
  }

  if (rhs === '') {
    return data[lhs]
  }

  return dataSelector(data[lhs], rhs)
}
