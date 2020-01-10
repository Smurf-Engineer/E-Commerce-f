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
