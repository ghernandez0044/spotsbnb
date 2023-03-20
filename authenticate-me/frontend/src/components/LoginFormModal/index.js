// Necessary imports
import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import './LoginForm.css'

function LoginFormModal(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create state variables
    const [ credential, setCredential ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errors, setErrors ] = useState([])

    // Consume the context from Redux store
    const { closeModal } = useModal()

    // Handle submission event
    const handleSubmit = (e) => {
        e.preventDefault()

        setErrors([])

        return dispatch(sessionActions.login({ credential, password })).then(closeModal).catch(async (res) => {
            const data = await res.json()
            if(data && data.errors) setErrors(data.errors)
        })
    }

    // Handle demo user submission event
    const demoSubmit = (e) => {
        e.preventDefault()

        return dispatch(sessionActions.login({
            credential: 'demo1@user.io',
            password: 'password1'
        })).then(closeModal).catch(async (res) => {
            const data = await res.json()
            if(data && data.errors) setErrors(data.errors)
        })
    }


    return (
        <div className='login-container'>
            <h1 className='form-header'>Log In</h1>
            <form onSubmit={handleSubmit} className="login-form-container">
                <ul>
                    {errors.map((error, i) => <li key={error}>{error}</li>)}
                </ul>
                <ul className='ul-container'>
                    <li className='login-element'>
                            <input type="text" value={credential} onChange={(e) => setCredential(e.target.value)} placeholder='Username or Email' required style={{ width: '290px', height: '30px' }} />
                    </li>
                    <li className='login-element'>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required style={{ width: '290px', height: '30px' }} />
                    </li>
                    <li className='login-element large'>
                        <button type='submit' className='login-button'  disabled={credential.length < 4 || password.length < 6}>Log In</button>
                    </li>
                    <li className='login-element'>
                        <p className='links' onClick={demoSubmit}>Demo User</p>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default LoginFormModal