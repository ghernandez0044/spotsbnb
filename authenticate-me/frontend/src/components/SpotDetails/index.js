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

    // Deconstruct needed properties from spot object
    const { address, avgRating, city, country, description, lat, lng, name, ownerId, previewImg, price, state } = spot

    return (
        <div>
            <h2>{name}</h2>
            <p>{city}, {state}, {country}</p>
            <img src={previewImg} alt='' />
            <h3>Hosted by ... Owner {ownerId}</h3>
            <h4>Description</h4>
            <p>{description}</p>
            <p>${price} /night</p>
            <p>Average Rating: {avgRating} stars</p>
        </div>
    )
}

export default SpotDetails