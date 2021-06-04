export const ipLocation = async () => {
  // Call a 3rd party api to get region info using ip address
  try {
    const ipCheckResponse = await fetch('https://ipapi.co/json/')
    const regionData = await ipCheckResponse.json()
    return regionData
  } catch (e) {
    throw e
  }
}