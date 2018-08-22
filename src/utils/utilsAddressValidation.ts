export const isNumberValue = (value: string) => {
  const numberRegex = /^[0-9]+$/
  return numberRegex.test(value)
}

export const isPoBox = (value: string) => {
  const poboxRegex = RegExp('[PO.]*\\s?B(ox)?.*\\d+', 'i')
  return poboxRegex.test(value)
}

export const isApoCity = (value: string) => {
  const apoRegex = RegExp('(^| )(APO|FPO|DPO)( |$)', 'i')
  return apoRegex.test(value)
}