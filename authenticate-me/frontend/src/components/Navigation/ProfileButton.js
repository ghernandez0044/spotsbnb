// Necessary imports
import React, { useState, useEffect, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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

    // Reference to the current user
    const currentUser = useSelector(state => state.session.user)
    console.log('currentUser: ', currentUser)

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

    return (
        <div>
                <div id='user-menu' className={currentUser ? 'user-menu' : 'user-menu no-user'} onClick={openMenu}>
                    {currentUser && ( <i className='fa-solid fa-user' /> )}
                    <i className='fa-solid fa-bars' />
                    <ul className={showMenu ? 'profile-dropdown' : 'hidden'} ref={ulRef}>
                        {user ? (
                        <>
                            <li className='list-item'><p>Hello, {user.firstName} {user.lastName}.</p></li>
                            <li className='list-item'><p>Username: {user.username}</p></li>
                            <li className='list-item'><p>Email: {user.email}</p></li>
                            <li className='list-item border-shadows'>
                                <Link onClick={closeMenu} exact to='/spots/current'>
                                <p><b>Manage Your Spots</b></p>
                                </Link>
                            </li>
                            <li className='list-item border-shadows'>
                                <Link onClick={closeMenu} exact to='/reviews/current'>
                                <p><b>Manage Your Reviews</b></p>
                                </Link>
                            </li>
                            <li className='list-item'>
                            <button className='logout-button' onClick={logout}>Log Out</button>
                            </li>
                        </>
                        ) : (
                        <div className='user-menu-items'>
                            <div className='user-menu-item links'>
                                <OpenModalMenuItem
                                    itemText="Log In"
                                    onItemClick={closeMenu}
                                    modalComponent={<LoginFormModal />}
                                />
                            </div>
                            <div className='user-menu-item links bold'>
                                <OpenModalMenuItem
                                    itemText="Sign Up"
                                    onItemClick={closeMenu}
                                    modalComponent={<SignupFormModal />}
                                />
                            </div>
                        </div>
                        )}
                    </ul>
                </div>
        </div>
    )
}

export default ProfileButton