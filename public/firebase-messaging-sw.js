importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDHDPGzjbLC70piBmJINeBDgfyQzzzUwp8",
  authDomain: "sentinelbg-172df.firebaseapp.com",
  projectId: "sentinelbg-172df",
  storageBucket: "sentinelbg-172df.firebasestorage.app",
  messagingSenderId: "19879077079",
  appId: "1:19879077079:web:4d533b2466e57f75d6fc92",
  measurementId: "G-S89G6YNDHL"
});

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  const payload = event.data.json();
  const notificationTitle = payload.data?.title || 'Sentinel';
  const notificationOptions = {
    body: payload.data?.body || '',
    icon: './logo.svg'
  };
  
  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );

    self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: 'revalidateAlarms',
          payload: payload
        });
      });
    });
});

self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);

  event.notification.close();
  const url = `${self.location.origin}/alarms`;

  event.waitUntil(
    self.clients.openWindow(url)
      .then(() => console.log('Window opened successfully:', url))
      .catch(error => console.error('Failed to open window:', error))
  );
});