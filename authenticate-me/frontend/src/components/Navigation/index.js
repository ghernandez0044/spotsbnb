// Necessary imports
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProfileButton from './ProfileButton'
import logo from '../../assets/spotsbnblogo.png'
import './Navigation.css'

function Navigation({ isLoaded }){
    // Grab reference to current user in state
    const sessionUser = useSelector((state) => state.session.user)
    // console.log('sessionUser: ', sessionUser)

    return (
        <nav className='navbar'>
            <div className='home'>
                <div className='logo-div'>
                    <NavLink exact to='/'>
                        <img src={logo} alt='' style={{ height: '75px', width: '75px' }} />
                    </NavLink>
                </div>
            </div>
            <ul className='nav-links'>
                <div className={sessionUser ? 'menu' : 'menu right'}>
                    {isLoaded && (
                        <>
                            {sessionUser && <li id='create-spot'>
                                <NavLink exact to ='/spots/new'>
                                    <p className='links'>Create A Spot</p>
                                </NavLink>
                            </li>}
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