// Necessary imports
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { normalizeData } from '../../store/spots'
import { loadSpot } from '../../store/oneSpot'
import { getSpot } from '../../store/spots'
import ReviewGallery from '../ReviewGallery'
import './SpotDetails.css'

function SpotDetails(){
    // Extract paramater variables from paramater object
    const { id } = useParams()

    // Create dispatch method
    const dispatch = useDispatch()

    // Upon component render, dispatch the action to load the single spot into the Redux store for retrieval 
    useEffect(() => {
        console.log('SpotDetails useEffect')
        dispatch(getSpot(id))
    }, [])

    // Create state variables
    const [ render, setRender ] = useState(false)
    
    const spot = useSelector((state) => state.spots.singleSpot)
    console.log('spot: ', spot)
    // Subscribe to user session slice of state
    const currentUser = useSelector((state) => state.session.user)
    const allSpotsSpot = useSelector((state) => state.spots.Spots)[id]

    if(!spot) return null

    // Deconstruct needed properties from spot object
    const { address, city, country, description, lat, lng, name, ownerId, price, state, Owner, SpotImages } = spot
    const { avgRating, reviewCount } = allSpotsSpot

    console.log('allSpotsSpot: ', allSpotsSpot)
    console.log('spot: ', spot)
    console.log('images: ', SpotImages)
    
    const previewImage = SpotImages.find(image => image.review = true)
    
    const regularImages = SpotImages.filter(image => image.preview === false)
    
    console.log('preview image: ', previewImage)
    console.log('regularImages: ', regularImages)


    
    // Check to see if current user owns this spot or not
    const belongsToCurrentUser = currentUser?.id === ownerId

    // Function to reserve spot
    const reserve = () => {
        alert('reserve booking coming soon!')
    }

    return (
        <div>
            <h2 style={{ textAlign: 'left' }}>{name}</h2>
            <p><em>{city}, {state}, {country}</em></p>
            <div className='all-images-container'>
                <div className='preview-image-container'>
                    <img className='preview-image' src={previewImage.url} alt='' />
                </div>
                <div className='images-container'>
                    {regularImages.map(image => (
                        <img key={image.id} src={image.url} alt='' style={{ height: '205px', width: '205px' }} />
                    ))}
                </div>
            </div>
            <div className='content'>
                <div className='description-container'>
                    <h3>Hosted by {Owner.firstName}, {Owner.lastName}</h3>
                    <p>{description}</p>
                </div>
                <div className='booking-info-container'>
                    <div className='another-container'>
                        <div className='price-container'>
                            <p>${price} /night</p>
                        </div>
                        <div className='rating-container'>
                            <i className='fa-solid fa-star' />
                            {avgRating ? <p>{avgRating} stars {reviewCount} {reviewCount && ( <span>&#183;</span> )} {reviewCount === 1 ? 'review' : 'reviews'}</p> : <p><i className='fa-solid fa-start' />New</p>}
                        </div>
                    </div>
                    {belongsToCurrentUser ? <p style={{ textAlign: 'center' }}>You Own This Spot!</p> : <button onClick={reserve}>Reserve</button>}
                </div>
            </div>
            <div className='reviews-container'>
                <ReviewGallery id={id} spot={allSpotsSpot} reviewCount={reviewCount} avgRating={avgRating} renderObj={{ render, setRender }} />
            </div>
        </div>
    )
}

export default SpotDetails