// Necessary imports
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import './ProfileButton.css'

function ProfileButton({ user }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create state variables
    const [ showMenu, setShowMenu ] = useState('')

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

        const closeMenu = (e) => setShowMenu(false)

        document.addEventListener('click', closeMenu)

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    // Create class name for unordered list
    const ulClassName = 'profile-dropdown' + (showMenu ? '' : 'hidden')


    return (
        <div>
            <button onClick={openMenu}>
                User Icon
            </button>
            <ul className={showMenu ? '' : 'hidden'}>
                <li className='list-item'>{user.username}</li>
                <li className='list-item'>{user.firstName} {user.lastName}</li>
                <li className='list-item'>{user.email}</li>
                <li className='list-item'>
                    <button onClick={logout}>Log Out</button>
                </li>
            </ul>
        </div>
    )
}

export default ProfileButton