import { useState } from 'react'
import { createAuthWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils'
import FormInput from '../form-input/form-input.conponent'
import './sign-up-form.styles.scss'
import Button from '../button/button.component'
const defaultCredentials = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultCredentials)
    const { displayName, email, password, confirmPassword } = formFields

    const resetFormFields = () => {
        setFormFields(defaultCredentials)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormFields({ ...formFields, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword || password == '') {
            alert('Passwords do not match!')
            return
        }
        const response = await createAuthWithEmailAndPassword(email, password)
        if (!response.user) {
            console.log('Error')
            return
        }
        await createUserDocumentFromAuth(response.user, { displayName })
        resetFormFields()
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' required type="text" id='username' name='displayName' value={displayName} onChange={handleChange} />
                <FormInput label='Email' required type="email" id='email' name='email' value={email} onChange={handleChange} />
                <FormInput label='Password' required type="password" id='password' name='password' value={password} onChange={handleChange} />
                <FormInput label='Confirm Password' required type="password" id='c-password' name='confirmPassword' value={confirmPassword} onChange={handleChange} />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm