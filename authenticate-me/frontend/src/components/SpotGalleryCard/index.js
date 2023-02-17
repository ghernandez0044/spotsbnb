// Necessary imports
import { NavLink } from 'react-router-dom'
import './SpotGalleryCard.css'

function SpotGalleryCard({ spot, manage }){
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
                {
                    manage && (
                        <div className='manage-buttons-container'>
                            <button className='manage-button'>Update</button>
                            <button className='manage-button'>Delete</button>
                        </div>
                    )
                }
            </div>
            </NavLink>
        </li>
    )
}

export default SpotGalleryCard