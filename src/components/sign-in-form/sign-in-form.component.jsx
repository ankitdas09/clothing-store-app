import { useState, useContext } from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthWithEmailAndPassword } from '../../utils/firebase.utils'
import FormInput from '../form-input/form-input.conponent'
import './sign-in-form.styles.scss'
import Button from '../button/button.component'
import { UserContext } from '../../contexts/user.context'
const defaultCredentials = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultCredentials)
    const { email, password } = formFields

    const { setCurrentUser } = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultCredentials)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormFields({ ...formFields, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { user } = await signInAuthWithEmailAndPassword(email, password)
            setCurrentUser(user)
            resetFormFields()
        } catch (error) {
            console.log(error.message)
        }
    }

    const signInWithGoogle = async () => {
        const response = await signInWithGooglePopup()
        await createUserDocumentFromAuth(response.user)
    }
    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' required type="email" id='email' name='email' value={email} onChange={handleChange} />
                <FormInput label='Password' required type="password" id='password' name='password' value={password} onChange={handleChange} />
                <div className="button-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm