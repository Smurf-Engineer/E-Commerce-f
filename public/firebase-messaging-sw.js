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
        title: payload.title,
        data: payload.url,
        icon: 'https://storage.googleapis.com/jakroo/homepage/Red-J.jpg'
    }
    self.registration.showNotification(payload.title, notificationOptions)
    return promiseChain
})

self.addEventListener('notificationclick', function (event) {
    const { notification: payload } = event
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                const path = client.url ? client.url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)\//g, '') : ''
                if (path === payload.data && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(`/${payload.data}`);
            }
        })
    )
})