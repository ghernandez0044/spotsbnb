// Necessary imports
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loadSpot } from '../../store/oneSpot'
import { getSpot } from '../../store/spots'
import { createABooking, getUserBookings } from '../../store/bookings'
import ReviewGallery from '../ReviewGallery'
import NewCalendarComponent from '../NewCalendarComponent'
import './SpotDetails.css'
import LoadingScreen from '../LoadingScreen'

function SpotDetails(){
    // Extract paramater variables from paramater object
    const { id } = useParams()

    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Create state variable to see if spot is loaded
    const [ isLoaded, setIsLoaded ] = useState(false)

    // Upon component render, dispatch the action to load the single spot into the Redux store for retrieval 
    useEffect(() => {
        dispatch(getSpot(id)).then(res => loadSpot(id)).then(res => getUserBookings()).then(res => setIsLoaded(true))
    }, [])

    // Create state variables
    const [ bookingDateRange, setBookingDateRange ] = useState([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }])
    const [ backendErrors, setBackendErrors ] = useState({})
    const [ isSubmitted, setIsSubmitted ] = useState(false)
    
    const spot = useSelector((state) => state.spots.singleSpot)

    // Subscribe to user session slice of state
    const currentUser = useSelector((state) => state.session.user)
    const allSpotsSpot = useSelector((state) => state.spots.Spots)[id]

    // Check to see if current user has a booking for this spot
    const userHasBooking = useSelector(state => Object.values(state.bookings.userBookings))

    const currentBooking = userHasBooking.find(booking => booking.spotId === Number(id))

    const bookingBoolean = userHasBooking.find(booking => booking.spotId === Number(id)) ? true : false

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

    // Check to see if booking has already passed
    const bookingHasAlreadyPassed = new Date(currentBooking?.endDate) < new Date()

    // Function to reserve spot
    const reserve = async () => {
        setIsSubmitted(true)

        const objectCreatedBooking = {
            startDate: bookingDateRange[0].startDate,
            endDate: bookingDateRange[0].endDate
        }

        dispatch(createABooking(objectCreatedBooking, spot.id)).then(res => {
            setIsSubmitted(false)
            history.push(`/bookings/current`)
        }).catch(async error => {
            const errObj = {}
            const formattedError = await error.json()
            errObj.backendError = formattedError.message
            setBackendErrors(errObj)
        })

    }

    if(!isLoaded) return <LoadingScreen />

    return (
        <div>
            <div>
                <h2 className='text-left' style={{ marginLeft: '15px' }}>{name}</h2>
                <p style={{ marginLeft: '15px' }}><em>{city}, {state}, {country}</em></p>
            </div>


            {/* <div className='flex flex-wrap flex-1 justify-center items-center max-w-7xl pl-20 mx-auto my-5 border-2 border-light-color phone:w-full'> */}
                <div className='flex flex-wrap justify-center items-center flex-1 w-10/12 mx-auto border-2 border-main-color tablet:w-full'>
                    <div className='flex justify-center items-center h-full w-4/12 tablet:w-7/12'>
                        <img style={{ height: '455px', width: '545px', left: '-0.1%', top: '-.1%' }} className='relative m-0' src={previewImage?.url} alt='' />
                    </div>
                    <div style={{ height: '455px', width: '455px' }} className='grid grid-cols-2 grid-rows-2 border-2 border-accent-color tablet:w-56'>
                        {regularImages?.map(image => (
                            <img className='h-56 w-56' key={image.id} src={image.url} alt='' />
                        ))}
                    {/* </div> */}
                </div>
            </div>


            <div className='border-b border-b-lightgray flex justify-between h-fit'>
                <div className='w-fit py-4 px-5 mx-auto my-2.5'>
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
                                <NewCalendarComponent setBookingDateRange={setBookingDateRange} bookingDateRange={bookingDateRange} />
                            </div>
                            <button onClick={reserve} className='reserve-button' style={{ margin: '10px auto', cursor: 'pointer' }}><p style={{ fontSize: '16px' }}>Reserve</p></button>
                        </div>
                    ) : <p></p>}
                    {bookingBoolean && !bookingHasAlreadyPassed && (
                        <div>
                            <div><p style={{ textAlign: 'center' }}>You Already Have A Booking!</p></div>
                            <div><p style={{ textAlign: 'center', fontWeight: 'bold' }}>{new Date(currentBooking?.startDate).toLocaleDateString()} - {new Date(currentBooking?.endDate).toLocaleDateString()}</p></div>
                        </div>    
                    )}
                </div>
            </div>
            <div className='reviews-container'>
                <ReviewGallery id={id} spot={allSpotsSpot} reviewCount={reviewCount} avgRating={avgRating} />
            </div>
        </div>
    )
}

export default SpotDetails