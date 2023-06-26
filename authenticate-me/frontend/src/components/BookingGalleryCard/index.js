// Necessary imports
import { NavLink, useHistory, Redirect } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import Confirmation from '../Confirmation'
import { getBooking } from '../../store/bookings'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import './BookingGalleryCard.css'

function BookingGalleryCard({ booking, manage }){

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

    return (
        <li className='booking-gallery-card'>
                <NavLink exact to={`/spots/${booking?.Spot?.id}`}>
                    <img style={{ width: '100%' }} src={spot.previewImage} alt='' />
                    <div className="content-container">
                        <div className='city-container'>
                            <h4>{booking.Spot.city}, {booking.Spot.state}</h4>
                            {booking.Spot.avgRating ? <p><i className='fa-solid fa-star' /> {booking.Spot.avgRating}</p> : <p><i className='fa-solid fa-star' />New</p>}
                        </div>
                        <div className='price-info-container'>
                            <p><b>${Number(booking.Spot.price).toFixed(2)}</b> /night</p>
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
        </li>
    )
}

export default BookingGalleryCard