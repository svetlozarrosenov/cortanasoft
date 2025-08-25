import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDHDPGzjbLC70piBmJINeBDgfyQzzzUwp8",
  authDomain: "sentinelbg-172df.firebaseapp.com",
  projectId: "sentinelbg-172df",
  storageBucket: "sentinelbg-172df.firebasestorage.app",
  messagingSenderId: "19879077079",
  appId: "1:19879077079:web:4d533b2466e57f75d6fc92",
  measurementId: "G-S89G6YNDHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export { app, analytics, messaging };