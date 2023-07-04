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
                <div id='user-menu' className={currentUser ? 'border-2 border-lightgray relative rounded-3xl w-fit h-fit flex justify-center items-center p-1.5 hover:shadow-xl' : 'border-2 border-lightgray relative rounded-3xl w-5 h-8 flex justify-center items-center p-4.5 hover:shadow-xl'} onClick={openMenu}>
                    {currentUser && ( <i style={{ margin: '5px' }} className='fa-solid fa-circle-user user-icon' /> )}
                    <i style={{ margin: '5px' }} className='fa-solid fa-bars hamburger-icon' />
                    <ul className={showMenu ? 'absolute right-3 top-16 w-fit h-fit bg-white rounded-xl shadow-xl flex flex-col justify-evenly items-center z-10' : 'hidden'} ref={ulRef}>
                        {user ? (
                        <>
                            <li className='w-56 h-fit flex justify-center items-center text-center my-2'><p>Hello, {user.firstName} {user.lastName}.</p></li>
                            <li className='w-56 h-fit flex justify-center items-center text-center my-2'><p>Username: {user.username}</p></li>
                            <li className='w-56 h-fit flex justify-center items-center text-center my-2 border-b border-b-hover-fill'><p>Email: {user.email}</p></li>
                            <li className='w-56 h-10 flex justify-center items-center text-center hover:bg-hover-fill'>
                                <Link onClick={closeMenu} exact to='/spots/current'>
                                <p><b>Manage Your Spots</b></p>
                                </Link>
                            </li>
                            <li className='w-56 h-10 flex justify-center items-center text-center hover:bg-hover-fill'>
                                <Link onClick={closeMenu} exact to='/reviews/current'>
                                <p><b>Manage Your Reviews</b></p>
                                </Link>
                            </li>
                            <li className='w-56 h-10 flex justify-center items-center text-center border-b border-b-hover-fill hover:bg-hover-fill'>
                                <Link onClick={closeMenu} exact to='/bookings/current'>
                                <p><b>Manage Your Bookings</b></p>
                                </Link>
                            </li>
                            <li className='w-56 h-fit flex justify-center items-center text-center my-2'>
                            <button className='logout-button' onClick={logout}>Log Out</button>
                            </li>
                        </>
                        ) : (
                        <div className='absolute h-24 w-40 flex flex-col justify-evenly items-center rounded-xl bg-white right-2 top-1 shadow-2xl'>
                            <div className='links'>
                                <OpenModalMenuItem
                                    itemText="Log In"
                                    onItemClick={closeMenu}
                                    modalComponent={<LoginFormModal />}
                                />
                            </div>
                            <div className='links bold'>
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