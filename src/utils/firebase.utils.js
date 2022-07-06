import { initializeApp } from "firebase/app"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
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

export const createUserDocumentFromAuth = async (userAuth, addtionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshop = await getDoc(userDocRef)
    if (!userSnapshop.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...addtionalInformation
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    return userDocRef
}

export const createAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }
    try {
        return await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        return error.message
    }
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return;
    }
    try {
        return await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        return error.message
    }
}

export const SignOutUser = async () => await signOut(auth)