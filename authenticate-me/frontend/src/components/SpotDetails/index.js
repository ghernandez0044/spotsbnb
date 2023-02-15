// Necessary imports
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { normalizeData } from '../../store/spots'
import './SpotDetails.css'

function SpotDetails(){
    // Extract paramater variables from paramater object
    const { id } = useParams()

    // Subscribe to spot slice of state
    const spots = useSelector((state) => state.spots.Spots)
    console.log('spots: ', spots)
    const spot = spots[id]

    // Subscribe to user session slice of state
    const currentUser = useSelector((state) => state.session.user)

    // Deconstruct needed properties from spot object
    const { address, avgRating, city, country, description, lat, lng, name, ownerId, previewImg, price, state } = spot
    
    // Check to see if current user owns this spot or not
    const belongsToCurrentUser = currentUser?.id === ownerId

    return (
        <div>
            <h2 style={{ textAlign: 'left' }}>{name}</h2>
            <p><em>{city}, {state}, {country}</em></p>
            <div className='image-container'>
                <img src={previewImg} alt='' />
            </div>
            <div className='description-container'>
                <h3>Hosted by ... Owner {ownerId}</h3>
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