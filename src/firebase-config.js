// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCWHKJWNzcfeITukb7N2u8JMWb8dl6rom4',
  authDomain: 'tmyo-eed7e.firebaseapp.com',
  projectId: 'tmyo-eed7e',
  storageBucket: 'tmyo-eed7e.appspot.com',
  messagingSenderId: '999045573879',
  appId: '1:999045573879:web:8d1dd916a739bdbf29b7f2',
  measurementId: 'G-52LQNXQHKS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
