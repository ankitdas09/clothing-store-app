import { initializeApp } from "firebase/app"
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAFcrVCgK6JVjN13FwhweNgLZ80-Fxm3ZM",
    authDomain: "crwn-project-74b85.firebaseapp.com",
    projectId: "crwn-project-74b85",
    storageBucket: "crwn-project-74b85.appspot.com",
    messagingSenderId: "193836889793",
    appId: "1:193836889793:web:4762d5a3e728d128d90640"
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshop = await getDoc(userDocRef)
    console.log(userSnapshop.exists())
}