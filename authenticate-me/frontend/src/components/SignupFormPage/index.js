// Necessary imports
import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

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
    const [ errors, setErrors ] = useState([])

    // If there is user already logged in, redirect to homepage
    if(sessionUser) history.replace('/')

    // Handle submission event
    const handleSubmit = (e) => {
        e.preventDefault()

        setErrors([])

        return dispatch(sessionActions.signup({ firstName, lastName, username, email, password })).catch(async (res) => {
            const data = await res.json()
            if(data && data.errors) setErrors(data.errors)
        })

    }


    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((err, i) => (
                        <li key={i}>
                            {error}
                        </li>
                    ))}
                </ul>
                <label>
                    First Name
                    <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
                </label>
                <label>
                    Last Name
                    <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
                </label>
                <label>
                    Username
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                </label>
                <label>
                    Email
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                </label>
                <label>
                    Password
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                </label>
            </form>
        </>
    )
}

export default SignupFormPage