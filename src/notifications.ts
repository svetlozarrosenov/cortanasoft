import { getToken } from "firebase/messaging";
import { messaging } from './firebase'; 

export const requestNotificationPermission = async () => {
  let currentToken = null;
  try {
    if ('Notification' in window) {
      await Notification.requestPermission();
    }
    currentToken = await getToken(messaging, {
      vapidKey: 'BMnQdKxU4fnlk-eTcnTC7RkCQlM4YegLmSlbQLdJKqHVX2UI_W6ZilmTfyrvW-lDtcAedGHyAO1aWv1pMK9wByg'
    });
    
    return currentToken;
  } catch (err) {
    console.log('Error:', err);
    return currentToken;
  }
};