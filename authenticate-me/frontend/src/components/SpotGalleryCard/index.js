// Necessary imports
import { NavLink } from 'react-router-dom'
import './SpotGalleryCard.css'

function SpotGalleryCard({ spot }){
    const { id, address, avgRating, city, country, description, lat, lng, name, previewImage, price, state } = spot
    return (
        <li>
            <NavLink exact to={`/spots/${id}`}>
            <div className="card">
                <img src={previewImage} alt='' />
                <div className="content-container">
                    <h4>Country: {country}</h4>
                    <h4>Location: {city}, {state}</h4>
                    {avgRating ? <p>Average Rating: {avgRating} stars</p> : <p>New</p>}
                    <p>Price: ${price} /night</p>
                </div>
            </div>
            </NavLink>
        </li>
    )
}

export default SpotGalleryCard