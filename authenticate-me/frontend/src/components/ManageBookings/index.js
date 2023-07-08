// Necessary imports
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUserBookings } from '../../store/bookings'
import BookingGalleryCard from '../BookingGalleryCard'
import LoadingScreen from '../LoadingScreen'

function ManageBookings(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Create state variables
    const [ isLoaded, setIsLoaded ] = useState(false)

    // Upon component render, load all current user bookings into Redux store
    useEffect(() => {
        dispatch(getUserBookings()).then(res => setIsLoaded(true))
    }, [dispatch])

    // Subscribe to user bookings slice of state
    const userBookings = useSelector(state => Object.values(state.bookings?.userBookings))

    if(!isLoaded) return <LoadingScreen />

    return (
        <div>
            <div>
                <h1 className='bold text-3xl' style={{ textAlign: 'left', marginLeft: '5%' }}>Manage Your Bookings</h1>
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