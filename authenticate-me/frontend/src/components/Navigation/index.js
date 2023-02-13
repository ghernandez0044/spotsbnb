// Necessary imports
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProfileButton from './ProfileButton'
import OpenModalButton from '../OpenModalButton'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'
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
                    <OpenModalButton buttonText='Sign Up' modalComponent={<SignupFormModal />} />
                    
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