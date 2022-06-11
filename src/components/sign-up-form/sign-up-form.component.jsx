import { useState } from 'react'
import { createAuthWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils'
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
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Display Name</label>
                <input required type="text" id='username' name='displayName' value={displayName} onChange={handleChange} />
                <label htmlFor="email">Email</label>
                <input required type="email" id='email' name='email' value={email} onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input required type="password" id='password' name='password' value={password} onChange={handleChange} />
                <label htmlFor="c-password">Confirm Password</label>
                <input required type="password" id='c-password' name='confirmPassword' value={confirmPassword} onChange={handleChange} />
                <input type="submit" value='Sign Up' />
            </form>
        </div>
    )
}

export default SignUpForm