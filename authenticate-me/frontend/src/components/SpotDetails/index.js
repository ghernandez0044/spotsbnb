// Necessary imports
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { normalizeData } from '../../store/spots'
import { loadSpot } from '../../store/oneSpot'
import { getSpot } from '../../store/spots'
import { createABooking, getUserBookings } from '../../store/bookings'
import ReviewGallery from '../ReviewGallery'
import CalendarComponent from '../CalendarComponent'
import './SpotDetails.css'

function SpotDetails(){
    // Extract paramater variables from paramater object
    const { id } = useParams()

    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Upon component render, dispatch the action to load the single spot into the Redux store for retrieval 
    useEffect(() => {
        dispatch(getSpot(id)).then(res => getUserBookings())
    }, [])

    // Create state variables
    const [ render, setRender ] = useState(false)
    const [ bookingDateRange, setBookingDateRange ] = useState([])
    const [ backendErrors, setBackendErrors ] = useState({})
    const [ isSubmitted, setIsSubmitted ] = useState(false)
    
    const store = useSelector(state => state)
    const spot = useSelector((state) => state.spots.singleSpot)

    console.log('spot: ', spot)
  
    // Subscribe to user session slice of state
    const currentUser = useSelector((state) => state.session.user)
    const allSpotsSpot = useSelector((state) => state.spots.Spots)[id]

    // Check to see if current user has a booking for this spot
    const userHasBooking = useSelector(state => Object.values(state.bookings.userBookings))

    const bookingBoolean = userHasBooking.find(booking => booking.spotId === Number(id)) ? true : false

    console.log('userHasBooking: ', userHasBooking.find(booking => booking.spotId === Number(id)))
    console.log('spot id: ', id)
    console.log('bookingBoolean: ', bookingBoolean)

    if(!spot) return null

    // Deconstruct needed properties from spot object
    const { address, city, country, description, lat, lng, name, ownerId, price, state, Owner, SpotImages } = spot
    const { avgRating, reviewCount } = allSpotsSpot

    let previewImage
    let regularImages
    if(SpotImages && SpotImages.length > 0){
        previewImage = SpotImages.find(image => image.review = true)
        regularImages = SpotImages.filter(image => image.preview === false)
    }
    
    // Check to see if current user owns this spot or not
    const belongsToCurrentUser = currentUser?.id === ownerId

    // Function to reserve spot
    const reserve = async () => {
        setIsSubmitted(true)

        const bookingStartDate = bookingDateRange[0]?.toISOString().split('T')[0]
        const bookingEndDate = bookingDateRange[1]?.toISOString().split('T')[0]

        const createdBooking = {
            startDate: bookingStartDate,
            endDate: bookingEndDate
        }

        dispatch(createABooking(createdBooking, spot.id)).then(res => {
            setIsSubmitted(false)
            history.push(`/bookings/current`)
        }).catch(async error => {
            const errObj = {}
            const formattedError = await error.json()
            errObj.backendError = formattedError.message
            setBackendErrors(errObj)
        })

    }

    return (
        <div>
            <div className='title-header-container'>
                <h2 style={{ textAlign: 'left', marginLeft: '15px' }}>{name}</h2>
                <p style={{ marginLeft: '15px' }}><em>{city}, {state}, {country}</em></p>
            </div>
            <div className='all-images-container'>
                <div className='photo-cluster'>
                    <div className='preview-image-container'>
                        <img className='preview-image' src={previewImage?.url} alt='' />
                    </div>
                    <div className='images-container'>
                        {regularImages?.map(image => (
                            <img key={image.id} src={image.url} alt='' style={{ height: '220px', width: '220px' }} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='content'>
                <div className='description-container'>
                    <h3>Hosted by {Owner?.firstName}, {Owner?.lastName}</h3>
                    <p>{description}</p>
                </div>
                <div className='booking-info-container'>
                    <div className='another-container'>
                        <div className='booking-price-container'>
                            <p>${Number(price).toFixed(2)} /night</p>
                        </div>
                        <div className='rating-container'>
                            <i className='fa-solid fa-star' />
                            {avgRating ? <p>{avgRating} stars  {reviewCount && ( <span>&#183;</span> )} {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</p> : <p><i className='fa-solid fa-start' />New</p>}
                        </div>
                    </div>
                    {currentUser && belongsToCurrentUser ? <p style={{ textAlign: 'center' }}>You Own This Spot!</p> : currentUser && !bookingBoolean ? (
                        <div className='reservation-container'>
                            <div className='calendar-testing-container'>
                                {isSubmitted && backendErrors.backendError && (
                                    <div className='error-decoration'>{backendErrors.backendError}</div>
                                )}
                                <CalendarComponent setBookingDateRange={setBookingDateRange} bookingDateRange={bookingDateRange} />
                            </div>
                            <button onClick={reserve} className='reserve-button' style={{ margin: '10px auto' }}><p style={{ fontSize: '16px' }}>Reserve</p></button>
                        </div>
                    ) : <p></p>}
                </div>
            </div>
            <div className='reviews-container'>
                <ReviewGallery id={id} spot={allSpotsSpot} reviewCount={reviewCount} avgRating={avgRating} renderObj={{ render, setRender }} />
            </div>
        </div>
    )
}

export default SpotDetails