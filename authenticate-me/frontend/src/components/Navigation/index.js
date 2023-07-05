// Necessary imports
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProfileButton from './ProfileButton'
import logo from '../../assets/spotsbnblogo.png'
import SearchBar from '../SearchBar'
import './Navigation.css'

function Navigation({ isLoaded }){
    // Grab reference to current user in state
    const sessionUser = useSelector((state) => state.session.user)

    return (
        <nav className='h-20 px-5 py-5 flex flex-auto z-10 justify-center items-center my-2.5 border-b border-b-lightgray phone:w-full phone:mx-auto phone:justify-between'>
            <div className='flex flex-auto justify-center items-center w-28'>
                <div className='rounded-xl'>
                    <NavLink exact to='/'>
                        <img className='h-16 w-16' src={logo} alt='' />
                    </NavLink>
                </div>
            </div>
            <SearchBar mobile={false} />
            <ul className='nav-links'>
                <div className={sessionUser ? 'flex justify-center items-center min-w-[170px]' : 'flex items-center min-w-[170px] justify-end'}>
                    {isLoaded && (
                        <>
                            {sessionUser && <li id='create-spot'>
                                <NavLink exact to ='/spots/new'>
                                    <p className='hover:text-light-color mx-4 text-center phone:hidden'>Create A Spot</p>
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