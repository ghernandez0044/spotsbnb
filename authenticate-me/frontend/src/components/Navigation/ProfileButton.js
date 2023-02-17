// Necessary imports
import React, { useState, useEffect, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import './ProfileButton.css'
import OpenModalMenuItem from './OpenModalMenuItem'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'

function ProfileButton({ user }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Create state variables
    const [ showMenu, setShowMenu ] = useState('')

    // Create useRef hook
    const ulRef = useRef()

    // Function to open dropdown menu
    const openMenu = () => {
        if(showMenu) return
        setShowMenu(true)
    }

    // Create function to close dropdown menu
    const closeMenu = () => setShowMenu(false)

    // Function to logout user
    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout())
        closeMenu()
        history.replace('/')
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
                    <li className='list-item'>Hello, {user.firstName} {user.lastName}</li>
                    <li className='list-item'>Username: {user.username}</li>
                    <li className='list-item'>Email: {user.email}</li>
                    <li className='list-item'>
                        <Link exact to='/spots/current'>
                         <b>Manage Your Spots</b>
                        </Link>
                    </li>
                    <li className='list-item'>
                    <button onClick={logout}>Log Out</button>
                    </li>
                </>
                ) : (
                <>
                    <OpenModalMenuItem
                        itemText="Log In"
                        onItemClick={closeMenu}
                        modalComponent={<LoginFormModal />}
                    />
                    <OpenModalMenuItem
                        itemText="Sign Up"
                        onItemClick={closeMenu}
                        modalComponent={<SignupFormModal />}
                    />
                </>
                )}
            </ul>
        </div>
    )
}

export default ProfileButton