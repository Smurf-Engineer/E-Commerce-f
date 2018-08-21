export const isNumber = (value: string) => {
  const numberRegex = /^[0-9]+$/
  const isMatch = numberRegex.test(value)
  return isMatch
}

export const isPoBox = (value: string) => {
  const poboxRegex = new RegExp('[PO.]*\\s?B(ox)?.*\\d+', 'i')
  const isMatch = !!value.match(poboxRegex)
  return isMatch
}