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
        <nav className='navbar'>
            <div className='home'>
                <p>SpotsBnb</p>
                    <NavLink exact to='/'>
                        Home
                    </NavLink>
            </div>
            <ul className='nav-links'>
                <div className='menu'>
                    {isLoaded && (
                        <>
                            <li id='create-spot'>
                                <NavLink exact to ='/spots/new'>
                                    Create A Spot
                                </NavLink>
                            </li>
                            <li>
                                <ProfileButton user={sessionUser} />
                            </li>
                        </>
                    )}
                </div>
            </ul>
        </nav>
    )
}

export default Navigation