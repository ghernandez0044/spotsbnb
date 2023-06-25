// Necessary imports
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { getUserBookings } from '../../store/bookings'
import BookingGalleryCard from '../BookingGalleryCard'

function ManageBookings(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Upon component render, load all current user bookings into Redux store
    useEffect(() => {
        dispatch(getUserBookings())
    }, [dispatch])

    // Subscribe to user bookings slice of state
    const userBookings = useSelector(state => Object.values(state.bookings?.userBookings))

    // if(!userBookings || Object.values(userBookings).length === 0) return null

    console.log('userBookings: ', userBookings)


    return (
        <div className='manage-bookings-container'>
            <div className='header-container'>
                <h1 style={{ textAlign: 'left', marginLeft: '5%' }}>Manage Your Bookings</h1>
            </div>
            {!userBookings || Object.keys(userBookings).length === 0 ? <h2 style={{ textAlign: 'center' }}>You Have No Bookings Yet!</h2> : ''}
            <ul className='spot-card-container'>
                {userBookings?.map(booking => (
                    <BookingGalleryCard key={booking.id} booking={booking} manage={true} />
                ))}
            </ul>
        </div>
    )
}

export default ManageBookings