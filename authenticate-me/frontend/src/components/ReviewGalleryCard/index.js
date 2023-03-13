// Necessary imports
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { deleteAReview } from '../../store/reviews'
import { loadSpot } from '../../store/oneSpot'
import { getReviews } from '../../store/reviews'
import { getSpots } from '../../store/spots'
import OpenModalButton from '../OpenModalButton'
import Confirmation from '../Confirmation'
import './ReviewGalleryCard.css'

function ReviewGalleryCard({ data }){
    // Destructure desired properties from passed in review
    console.log('data: ', data)
    const { id, spotId, userId, review, stars, ReviewImages, User, createdAt } = data
    console.log('id: ', id)

    // Create dispatch instance
    const dispatch = useDispatch()

    // Create history insstance
    const history = useHistory()
    
    // Create reference to current user
    const currentUser = useSelector(state => state.session.user)
    console.log('currentUser: ', currentUser)

    // Consume Modal Context for desired function
    const { closeModal } = useModal()

    if(!data) return null

    // onYes function
    const yes = () => {
        dispatch(deleteAReview(data))
        dispatch(getSpots())
        dispatch(loadSpot(spotId))
        dispatch(getReviews(spotId))
        closeModal()
        history.push(`/spots/${spotId}`)
    }

    // onNo function
    const no = () => {
        closeModal()
    }

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'Octorber',
        'Novemeber',
        'December'
    ]

    const dateObj = new Date(createdAt)
    const year = dateObj.getFullYear()
    const monthIdx = dateObj.getMonth()
    const month = months[monthIdx]
    const day = dateObj.getDate()

return (
    <div className='review-container'>
        <h3 style={{ margin: '2px' }}>{User.firstName}</h3>
        <h4 style={{ margin: '2px' }}>{month}, {day}, {year}</h4>
        <p>{review}</p>
        {currentUser?.id === userId && ( <div><OpenModalButton modalComponent={<Confirmation label='Confirm Delete' message='Are you sure you want to delete this review?' onYes={yes} onNo={no} />} buttonText='Delete' /></div> )}
    </div>
)
}

export default ReviewGalleryCard