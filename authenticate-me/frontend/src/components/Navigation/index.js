// Necessary imports
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProfileButton from './ProfileButton'
import * as sessionActions from '../../store/session'
import './Navigation.css'

function Navigation({ isLoaded }){
    // Grab reference to current user in state
    const sessionUser = useSelector((state) => state.session.user)

    // Create dispatch method
    const dispatch = useDispatch()

    // Create logout function
    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout())
    }

    // Create the links for navigation
    let sessionLinks
    if(sessionUser){
        sessionLinks = (
            <li>
                <ProfileButton user={sessionUser} />
                <button onClick={logout}>Log Out</button>
            </li>
        )
    } else {
        sessionLinks = (
            <li>
                <NavLink to='/login'>Log In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
            </li>
        )
    }


    return (
        <nav>
            <ul>
                <li>
                    <NavLink exact to='/'>
                        Home
                    </NavLink>
                </li>
                {isLoaded && sessionLinks}
            </ul>
        </nav>
    )
}

export default Navigation