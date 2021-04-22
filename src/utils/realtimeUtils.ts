/**
 * Firebase Utils
 */
import 'firebase/messaging'
import firebase from 'firebase/app'
const config = {
  apiKey: 'AIzaSyA2G_KKwxdtBawSWDbQ3rePbzRrf9uou0w',
  authDomain: 'jv2-design-center.firebaseapp.com',
  databaseURL: 'https://jv2-design-center.firebaseio.com',
  projectId: 'jv2-design-center',
  storageBucket: 'jv2-design-center.appspot.com',
  messagingSenderId: '452333895224',
  appId: '1:452333895224:web:6db14d0cc4fd36128830cd'
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
    const token = await requirePermission()
    .then(async() => {
      return await firebase.messaging().getToken()
    })
    .catch((err) => {
        console.log('Unable to get permission to notify.', err)
    })
    return token
  } catch (e) {
    console.error(e)
    return 
  }
}
