import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyANuhpscJJncAQ9YZdJXgu_E_ZnzwA3d0U",
    authDomain: "cassinotrack.firebaseapp.com",
    projectId: "cassinotrack",
    storageBucket: "cassinotrack.firebasestorage.app",
    messagingSenderId: "298657720049",
    appId: "1:298657720049:web:c8c84279d97ff1fb1bab50"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)