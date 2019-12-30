import message from 'antd/lib/message'

export const getSessionCode = (storeId: string) => {
  let storedCode = ''
  try {
    const savedStores =
      typeof window !== 'undefined' && sessionStorage.getItem('savedStores')
    if (savedStores) {
      const storeCodes = JSON.parse(savedStores)
      storedCode = storeCodes[storeId]
    }
  } catch (error) {
    message.error(error.message)
  }
  return storedCode
}
