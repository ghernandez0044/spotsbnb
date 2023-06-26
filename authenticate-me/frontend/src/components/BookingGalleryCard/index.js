// Necessary imports
import { NavLink, useHistory, Redirect } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import Confirmation from '../Confirmation'
import { getBooking, deleteABooking } from '../../store/bookings'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import UpdateBooking from '../UpdateBooking'
import './BookingGalleryCard.css'
import { useState } from 'react'

function BookingGalleryCard({ booking, manage }){

    // Create state variables
    const [ backendErrors, setBackendErrors ] = useState({})
    const [ isSubmitted, setIsSubmitted ] = useState(false)

    const spot = useSelector(state => state.spots.Spots[booking.spotId])

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }

    const localStartingTime = new Date(booking.startDate).toLocaleString(navigator.language, options)
    const localEndingTime = new Date(booking.endDate).toLocaleString(navigator.language, options)
    const localCreatedAtTime = new Date(booking.createdAt).toLocaleString(navigator.language, options)

    // Create dispatch method
    const dispatch = useDispatch()

    // Consume Modal Context for desired function
    const { closeModal } = useModal()

    // Function to handle yes on confirmation modal
    const onYes = () => {
        console.log('yes')
        setIsSubmitted(true)
        dispatch(deleteABooking(booking.id)).then(res => {
            closeModal()
            setIsSubmitted(false)
        }).catch(async error => {
            const errObj = {}
            const formattedError = await error.json()
            errObj.backendError = formattedError.message
            setBackendErrors(errObj)
            console.log('error: ', formattedError.message)
        })
    }

    // Function to handle no on confirmation modal
    const onNo = () => {
        closeModal()
    }

    return (
        <li className='booking-gallery-card'>
                <NavLink exact to={`/spots/${booking?.Spot?.id}`}>
                    <img style={{ width: '100%' }} src={spot?.previewImage} alt='' />
                    <div className="content-container">
                        <div className='city-container'>
                            <h4>{booking?.Spot?.city}, {booking?.Spot?.state}</h4>
                            {booking?.Spot?.avgRating ? <p><i className='fa-solid fa-star' /> {booking?.Spot?.avgRating}</p> : <p><i className='fa-solid fa-star' />New</p>}
                        </div>
                        <div className='price-info-container'>
                            <p><b>${Number(booking?.Spot?.price).toFixed(2)}</b> /night</p>
                        </div>
                    </div>
                </NavLink>
                <div className='time-content-container'>
                        <h3>Start Date:</h3>
                        <div className='card-content'>{localStartingTime}</div>
                        <h3>End Date:</h3>
                        <div className='card-content'>{localEndingTime}</div>
                        <h3>Created At:</h3>
                        <div className='card-content'>{localCreatedAtTime}</div>
                </div>
                <div className='manage-buttons-container'>    
                        <OpenModalButton className='manage-button' modalComponent={<Confirmation label='Confirm Cancellation' message='Are you sure you want to cancel your booking?' onYes={onYes} yesLabel='Cancel Booking' onNo={onNo} noLabel='Keep Booking' />} buttonText='Cancel Booking' />
                        <OpenModalButton className='manage-button' modalComponent={<UpdateBooking startDate={booking.startDate} endDate={booking.endDate} booking={booking} />} buttonText='Update' />
                </div>
        </li>
    )
}

export default BookingGalleryCard