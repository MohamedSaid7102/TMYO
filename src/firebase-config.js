// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCcGzXmBJYIOpkMzo5qdWxsPZTZrPa16_g',
  authDomain: 'tmyo-4a912.firebaseapp.com',
  projectId: 'tmyo-4a912',
  storageBucket: 'tmyo-4a912.appspot.com',
  messagingSenderId: '133664464828',
  appId: '1:133664464828:web:5dba9322d67a129fc595b9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
