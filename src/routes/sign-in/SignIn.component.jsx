import React from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase.utils'

const SignIn = () => {
    const SignIn = async () => {
        const response = await signInWithGooglePopup()
        createUserDocumentFromAuth(response.user)
    }
    return (
        <>
            <h2>Sign In</h2>
            <button onClick={SignIn}>Sign In</button>
        </>
    )
}

export default SignIn