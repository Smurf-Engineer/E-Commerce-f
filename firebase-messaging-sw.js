'use strict'
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js')
// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: "AIzaSyD4Y7N1GrqL-442TpueEYLEEc3fdnIqvAs",
    authDomain: "jakroo-f148e.firebaseapp.com",
    databaseURL: "https://jakroo-f148e.firebaseio.com",
    projectId: "jakroo-f148e",
    storageBucket: "jakroo-f148e.appspot.com",
    messagingSenderId: "300041701090",
    appId: "1:300041701090:web:73f8b52f2beca6c69480bb"
})
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: 'window',
            includeUncontrolled: true,
        })
        .then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i]
                windowClient.postMessage(payload.data)
            }
        })
    var notificationTitle = 'Jakroo'
    var notificationOptions = {
        body: 'A connection has changed'
    }
    self.registration.showNotification(notificationTitle, notificationOptions)
    return promiseChain
})