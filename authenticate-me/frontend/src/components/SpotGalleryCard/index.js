// Necessary imports
import { NavLink, useHistory } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import Confirmation from '../Confirmation'
import { deleteASpot } from '../../store/spots'
import { getCurrentUserSpots } from '../../store/spots'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import './SpotGalleryCard.css'

function SpotGalleryCard({ spot, manage }){

    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Consume Modal Context for desired function
    const { closeModal } = useModal()

    // Deconstruct desired properties from spot passed in through props
    const { id, address, avgRating, city, country, description, lat, lng, name, previewImage, price, state } = spot

    // Function to handle yes on confirmation modal
    const onYes = () => {
        dispatch(deleteASpot(spot.id))
        closeModal()
        history.push('/spots/current')
    }

    // Function to handle no on confirmation modal
    const onNo = () => {
        closeModal()
        history.replace('/spots/current')
    }


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
                            <OpenModalButton className='manage-button' modalComponent={<Confirmation label='Confirm Delete' message='Are you sure you want to remove this spot from the listings?' onYes={onYes} onNo={onNo} />} buttonText='Delete' />
                        </div>
                    )
                }
            </div>
            </NavLink>
        </li>
    )
}

export default SpotGalleryCard