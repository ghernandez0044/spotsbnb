// Necessary imports
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { normalizeData } from '../../store/spots'
import { loadSpot } from '../../store/oneSpot'
import './SpotDetails.css'

function SpotDetails(){
    // Extract paramater variables from paramater object
    const { id } = useParams()

    // Create dispatch method
    const dispatch = useDispatch()

    // Upon component render, dispatch the action to load the single spot into the Redux store for retrieval 
    useEffect(() => {
        dispatch(loadSpot(id))
    }, [])
    
    const spot = useSelector((state) => state.singleSpot)
    // Subscribe to user session slice of state
    const currentUser = useSelector((state) => state.session.user)

    if(Object.keys(spot).length === 0) return ( <h2>No Spot</h2> )

    // Deconstruct needed properties from spot object
    const { address, avgRating, city, country, description, lat, lng, name, ownerId, previewImg, price, state, Owner, SpotImages } = spot.singleSpot

    console.log('preview image: ', previewImg)
    console.log('images: ', SpotImages)


    
    // Check to see if current user owns this spot or not
    const belongsToCurrentUser = currentUser?.id === ownerId

    return (
        <div>
            <h2 style={{ textAlign: 'left' }}>{name}</h2>
            <p><em>{city}, {state}, {country}</em></p>
            <div className='all-images-container'>
                <div className='preview-image-container'>
                    <img className='preview-image' src={previewImg} alt='' />
                </div>
                <div className='images-container'>
                    {SpotImages.map(image => (
                        <img key={image.id} src={image.url} alt='' style={{ height: '205px', width: '205px' }} />
                    ))}
                </div>
            </div>
            <div className='description-container'>
                <h3>Hosted by ... {Owner.firstName}, {Owner.lastName}</h3>
                <h4>Description</h4>
                <p>{description}</p>
            </div>
            <div className='booking-info-container'>
                <p>${price} /night</p>
                <p>Average Rating: {avgRating} stars</p>
                {belongsToCurrentUser ? <p>You Own This Spot!</p> : <button>Reserve</button>}
            </div>
        </div>
    )
}

export default SpotDetails