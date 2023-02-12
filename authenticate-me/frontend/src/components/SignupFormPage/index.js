// Necessary imports
import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './SignupForm.css'

function SignupFormPage(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Subscribe to session state slice
    const sessionUser = useSelector((state) => state.session.user)

    // Create state variables
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ errors, setErrors ] = useState([])

    // If there is user already logged in, redirect to homepage
    if(sessionUser) history.replace('/')

    // Handle submission event
    const handleSubmit = (e) => {
        e.preventDefault()

        
        if(password === confirmPassword){
            setErrors([])

            return dispatch(sessionActions.signup({ firstName, lastName, username, email, password })).catch(async (res) => {
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
                <label className='element'>
                    First Name
                    <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' required />
                </label>
                <label className='element'>
                    Last Name
                    <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' required />
                </label>
                <label className='element'>
                    Username
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
                </label>
                <label className='element'>
                    Email
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                </label>
                <label className='element'>
                    Password
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                </label>
                <label className='element'>
                    Confirm Password
                    <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' required />
                </label>
                <button type='submit' disabled={errors.length > 0} className='login-button'>Sign Up</button>
            </form>
        </>
    )
}

export default SignupFormPage