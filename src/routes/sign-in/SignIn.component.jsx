import React from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
const SignIn = () => {
    const SignIn = async () => {
        const response = await signInWithGooglePopup()
        createUserDocumentFromAuth(response.user)
    }
    return (
        <div>
            <div >
                <h2>Sign In</h2>
                <button onClick={SignIn}>Sign In</button>
            </div>
            <SignUpForm />
        </div>
    )
}

export default SignIn