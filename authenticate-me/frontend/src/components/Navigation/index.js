// Necessary imports
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProfileButton from './ProfileButton'
import './Navigation.css'

function Navigation({ isLoaded }){
    // Grab reference to current user in state
    const sessionUser = useSelector((state) => state.session.user)

    return (
            <ul className='container'>
                <li className='list-item home'>
                    <NavLink exact to='/'>
                        Home
                    </NavLink>
                </li>
                {isLoaded && (
                    <li className='list-item'>
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
            </ul>
    )
}

export default Navigation