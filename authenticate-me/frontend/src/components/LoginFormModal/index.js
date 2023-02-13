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


    return (
        <>
            <h1 className='form-header'>Log In</h1>
            <form onSubmit={handleSubmit} className="login-form-container">
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <ul className='ul-container'>
                    <li className='login-element'>
                            <input type="text" value={credential} onChange={(e) => setCredential(e.target.value)} placeholder='Username or Email' required />
                    </li>
                    <li className='login-element'>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                    </li>
                    <li className='login-element'>
                        <button type='submit' className='login-button'>Log In</button>
                    </li>
                </ul>
            </form>
        </>
    )
}

export default LoginFormModal