// Necessary imports
import React from 'react'
import { useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import './ProfileButton.css'

function ProfileButton({ user }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Function to logout user
    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout())
    }

    // Create class name for unordered list
    const ulClassName = 'profile-dropdown'


    return (
        <div className=''>
            <button>
                <i className="fa-regular fa-user" />
            </button>
            <ul className={ulClassName}>
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