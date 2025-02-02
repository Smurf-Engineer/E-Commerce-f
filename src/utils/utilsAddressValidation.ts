export const isNumberValue = (value: string) => {
  const numberRegex = /^[0-9]+$/
  return numberRegex.test(value)
}

export const isPoBox = (value: string) => {
  const poboxRegex = RegExp('[PO.]*\\s?B(ox)?( +)*\\d+', 'i')
  return poboxRegex.test(value)
}

export const isApoCity = (value: string) => {
  const apoRegex = RegExp('(^| )(APO|FPO|DPO)( |$)', 'i')
  return apoRegex.test(value)
}

export const isValidCity = (value: string) => {
  const cityRegex = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/g
  return cityRegex.test(value)
}

export const isValidZip = (value: string) => {
  const zipRegex = /^(?=.*\d.*)[A-Za-z0-9- ]{3,10}$/g
  return zipRegex.test(value)
}