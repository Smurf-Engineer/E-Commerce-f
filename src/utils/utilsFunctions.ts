export const changePosition = (
  itemOrder: number,
  collection: any,
  index: number
) => {
  if (!itemOrder && index === 0) {
    return (collection[index].itemOrder = 1)
  } else if (
    collection[index - 1] &&
    collection[index - 1].itemOrder !== itemOrder - 1
  ) {
    return (collection[index].itemOrder = collection[index - 1].itemOrder + 1)
  }
}

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const validateEmail = (email: string) => {
  // tslint:disable-next-line:max-line-length
  const emailPattern = /[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  return emailPattern.test(email)
}

export const formatAmount = (value: Number = 0) => {
  return value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}