/**
 * Firebase Utils
 */
import 'firebase/messaging'
import firebase from 'firebase/app'
const config = {
    apiKey: 'AIzaSyD4Y7N1GrqL-442TpueEYLEEc3fdnIqvAs',
    authDomain: 'jakroo-f148e.firebaseapp.com',
    databaseURL: 'https://jakroo-f148e.firebaseio.com',
    projectId: 'jakroo-f148e',
    storageBucket: 'jakroo-f148e.appspot.com',
    messagingSenderId: '300041701090',
    appId: '1:300041701090:web:73f8b52f2beca6c69480bb'
}
export const firebaseInit = async () => {
  try {
    if (!firebase.apps.length) {
        firebase.initializeApp(config)
    }
  } catch (e) {
    console.error('SW error: ', e)
  }
}
export const requirePermission = async () => {
  return await firebase.messaging().requestPermission()
}
export const getToken = async () => {
  try {
    const token = await firebase.messaging().getToken()
    return token
  } catch (e) {
    console.error(e)
    return 
  }
}
export const onMessage = (cb: any) => {
  try {
    firebase.messaging().onMessage(payload => {
    console.log('Message')
      // const type = payload.type
      // const info = JSON.parse(payload.data)
      // cb(type, payload)
    cb(payload)
    })
  } catch (e) {
    console.error(e)
  }
}
