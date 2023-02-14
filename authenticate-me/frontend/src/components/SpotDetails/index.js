// Necessary imports
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { normalizeData } from '../../store/spots'

function SpotDetails(){
    // Extract paramater variables from paramater object
    const { id } = useParams()

    // Subscribe to spot slice of state
    const spots = useSelector((state) => state.spots.Spots)
    const spot = normalizeData(spots)[id]

    // Subscribe to user session slice of state
    const currentUser = useSelector((state) => state.session.user)

    console.log('user: ', currentUser)

    // Deconstruct needed properties from spot object
    const { address, avgRating, city, country, description, lat, lng, name, ownerId, previewImg, price, state } = spot
    
    // Check to see if current user owns this spot or not
    const belongsToCurrentUser = currentUser.id === ownerId

    console.log('current owner? ', belongsToCurrentUser)

    return (
        <div>
            <h2>{name}</h2>
            <p>{city}, {state}, {country}</p>
            <img src={previewImg} alt='' />
            <h3>Hosted by ... Owner {ownerId}</h3>
            <h4>Description</h4>
            <p>{description}</p>
            <div className='info-container'>
                <p>${price} /night</p>
                <p>Average Rating: {avgRating} stars</p>
                {belongsToCurrentUser ? <p>You Own This Spot!</p> : <button>Reserve</button>}
            </div>
        </div>
    )
}

export default SpotDetails