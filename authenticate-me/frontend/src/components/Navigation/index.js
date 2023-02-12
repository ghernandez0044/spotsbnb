// Necessary imports
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProfileButton from './ProfileButton'
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal'
import './Navigation.css'

function Navigation({ isLoaded }){
    // Grab reference to current user in state
    const sessionUser = useSelector((state) => state.session.user)

    // Create the links for navigation
    let sessionLinks
    if(sessionUser){
        sessionLinks = (
            <li className='list-item'>
                <ProfileButton user={sessionUser} />
            </li>
        )
    } else {
        sessionLinks = (
            <>
                <li className='list-item'>
                    <OpenModalButton buttonText='Log In' modalComponent={<LoginFormModal />} />
                    <NavLink to='/signup'>Sign Up</NavLink>
                </li>
            </>
        )
    }

    return (
            <ul className='container'>
                <li className='list-item home'>
                    <NavLink exact to='/'>
                        Home
                    </NavLink>
                </li>
                {isLoaded && sessionLinks}
            </ul>
    )
}

export default Navigation