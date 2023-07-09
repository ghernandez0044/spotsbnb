// Necessary imports
import { NavLink } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import Confirmation from '../Confirmation'
import { deleteABooking } from '../../store/bookings'
import { loadSpot } from '../../store/oneSpot'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import UpdateBooking from '../UpdateBooking'
import './BookingGalleryCard.css'
import { useEffect, useState } from 'react'

function BookingGalleryCard({ booking, manage }){

    // Create state variables
    const [ backendErrors, setBackendErrors ] = useState({})
    const [ isSubmitted, setIsSubmitted ] = useState(false)
    const [ errors, setErrors ] = useState({})

    // Create dispatch method
    const dispatch = useDispatch()

    const spot = useSelector(state => state.spots.Spots[booking.spotId])

    useEffect(() => {
        dispatch(loadSpot(booking.spotId))
    }, [])

    let isBookingUnderway = new Date(booking.startDate) < new Date()
    
    const singleSpot = useSelector(state => state.singleSpot.singleSpot)

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


    // Consume Modal Context for desired function
    const { closeModal } = useModal()

    // Function to handle yes on confirmation modal
    const onYes = () => {
        setIsSubmitted(true)
        dispatch(deleteABooking(booking.id)).then(res => {
            closeModal()
            setIsSubmitted(false)
        }).catch(async error => {
            const errObj = {}
            const formattedError = await error.json()
            errObj.backendError = formattedError.message
            setBackendErrors(errObj)
        })
    }

    // Function to handle no on confirmation modal
    const onNo = () => {
        closeModal()
    }

    if(!singleSpot || Object.values(singleSpot).length === 0) return null

    return (
        <li className='rounded-2xl w-96 flex flex-col justify-center items-center p-2.5'>
                <NavLink exact to={`/spots/${booking?.Spot?.id}`}>
                    <img className='w-full' src={spot?.previewImage} alt='' />
                    <div>
                        <div className='h-10 flex justify-between items-center'>
                            <h4>{booking?.Spot?.city}, {booking?.Spot?.state}</h4>
                            {booking?.Spot?.avgRating ? <p><i className='fa-solid fa-star' /> {booking?.Spot?.avgRating}</p> : <p><i className='fa-solid fa-star' />New</p>}
                        </div>
                        <div className='h-9 flex justify-start items-center my-1.5'>
                            <p><b>${Number(booking?.Spot?.price).toFixed(2)}</b> /night</p>
                        </div>
                    </div>
                </NavLink>
                <div className='h-fit w-full'>
                        <h3 className='bold'>Start Date:</h3>
                        <div className='card-content mb-1'>{localStartingTime}</div>
                        <h3 className='bold'>End Date:</h3>
                        <div className='card-content mb-1'>{localEndingTime}</div>
                        <h3 className='bold'>Created At:</h3>
                        <div className='card-content mb-1'>{localCreatedAtTime}</div>
                </div>
                {!isBookingUnderway && (
                    <div className='flex justify-evenly p-1.5 mb-1.5'>    
                    <OpenModalButton className='manage-button' modalComponent={<Confirmation label='Confirm Cancellation' message='Are you sure you want to cancel your booking?' onYes={onYes} yesLabel='Cancel Booking' onNo={onNo} noLabel='Keep Booking' />} buttonText='Cancel Booking' />
                    <OpenModalButton className='manage-button' modalComponent={<UpdateBooking startDate={booking.startDate} endDate={booking.endDate} booking={booking} />} buttonText='Update' />
            </div>
                )}
        </li>
    )
}

export default BookingGalleryCard