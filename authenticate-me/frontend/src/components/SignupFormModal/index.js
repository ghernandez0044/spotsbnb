// Necessary imports
import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import './SignupForm.css'

function SignupFormModal(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create state variables
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ errors, setErrors ] = useState([])

    // Consume Modal context
    const { closeModal } = useModal()

    // Handle submission event
    const handleSubmit = (e) => {
        e.preventDefault()

        
        if(password === confirmPassword){
            setErrors([])

            return dispatch(sessionActions.signup({ firstName, lastName, username, email, password })).then(closeModal).catch(async (res) => {
                const data = await res.json()
                if(data && data.errors) setErrors(data.errors)
            })
            
        }

        return setErrors(['Confirm Password field must be the same as the Password field'])

    }


    return (
        <>
            <h1 className='form-header'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='form-container'>
                <ul>
                    {errors.map((err, i) => (
                        <li key={i}>
                            {err}
                        </li>
                    ))}
                </ul>
                <ul>
                    <li className='element'>
                            <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' required />
                    </li>
                    <li className='element'>
                            <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' required />
                    </li>
                    <li className='element'>
                            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
                    </li>
                    <li className='element'>
                            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                    </li>
                    <li className='element'>
                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                    </li>
                    <li className='element'>
                            <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' required />
                    </li>
                    <li className='element'>
                        <button type='submit' className='signup-button' disabled={firstName.length <= 0 || lastName.length <= 0 || username.length < 4 || email.length <= 0 || password.length < 6 || confirmPassword.length < 6 || password !== confirmPassword}>Sign Up</button>
                    </li>
                </ul>
            </form>
        </>
    )
}

export default SignupFormModal