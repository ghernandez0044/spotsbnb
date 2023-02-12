// Necessary imports
import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './LoginForm.css'

function LoginFormPage(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Subscribe to session state slice
    const sessionUser = useSelector((state) => state.session.user)

    // Create state variables
    const [ credential, setCredential ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errors, setErrors ] = useState([])

    // If there is user already logged in, redirect to homepage
    if(sessionUser) history.replace('/')

    // Handle submission event
    const handleSubmit = (e) => {
        e.preventDefault()

        setErrors([])

        return dispatch(sessionActions.login({ credential, password })).catch(async (res) => {
            const data = await res.json()
            if(data && data.errors) setErrors(data.errors)
        })
    }


    return (
        <>
            <h1 className='form-header'>Log In</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <label className='element'>
                    Username or Email
                    <input type="text" value={credential} onChange={(e) => setCredential(e.target.value)} placeholder='Username or Email' required />
                </label>
                <label className='element'>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                </label>
                <button type='submit' className='login-button'>Log In</button>
            </form>
        </>
    )
}

export default LoginFormPage