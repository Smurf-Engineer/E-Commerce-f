// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js')
// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: "AIzaSyA2G_KKwxdtBawSWDbQ3rePbzRrf9uou0w",
    authDomain: "jv2-design-center.firebaseapp.com",
    databaseURL: "https://jv2-design-center.firebaseio.com",
    projectId: "jv2-design-center",
    storageBucket: "jv2-design-center.appspot.com",
    messagingSenderId: "452333895224",
    appId: "1:452333895224:web:6db14d0cc4fd36128830cd"
})
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function (notification) {
    const { data: payload } = notification
    const promiseChain = clients
        .matchAll({
            type: 'window',
            includeUncontrolled: true,
        })
        .then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i]
                windowClient.postMessage(payload)
            }
        })
    var notificationOptions = {
        body: payload.message,
        title: payload.title
    }
    self.registration.showNotification(payload.title, notificationOptions)
    return promiseChain
})