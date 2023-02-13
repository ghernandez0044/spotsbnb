// Necessary imports
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import './ProfileButton.css'
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'

function ProfileButton({ user }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create state variables
    const [ showMenu, setShowMenu ] = useState('')

    // Create useRef hook
    const ulRef = useRef()

    // Function to open dropdown menu
    const openMenu = () => {
        if(showMenu) return
        setShowMenu(true)
    }

    // Function to logout user
    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout())
    }

    // Create event listener for closing menu
    useEffect(() => {
        if(!showMenu) return 

        const closeMenu = (e) => {
            if(!ulRef.current.contains(e.target)) setShowMenu(false)
        }

        document.addEventListener('click', closeMenu)

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    // Create class name for unordered list
    // const ulClassName = 'profile-dropdown' + (showMenu ? '' : 'hidden')


    return (
        <div>
            <button onClick={openMenu}>
                User Icon
            </button>
            <ul className={showMenu ? '' : 'hidden'} ref={ulRef}>
                {user ? (
                <>
                    <li className='list-item'>{user.username}</li>
                    <li className='list-item'>{user.firstName} {user.lastName}</li>
                    <li className='list-item'>{user.email}</li>
                    <li className='list-item'>
                    <button onClick={logout}>Log Out</button>
                    </li>
                </>
                ) : (
                <>
                    <li>
                    <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                    </li>
                    <li>
                    <OpenModalButton
                        buttonText="Sign Up"
                        modalComponent={<SignupFormModal />}
                    />
                    </li>
                </>
                )}
            </ul>
        </div>
    )
}

export default ProfileButton