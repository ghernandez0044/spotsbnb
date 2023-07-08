// Necessary imports
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { deleteAReview } from '../../store/reviews'
import { loadSpot } from '../../store/oneSpot'
import { getReviews } from '../../store/reviews'
import { getSpots } from '../../store/spots'
import { getCurrentUserReviews } from '../../store/reviews'
import OpenModalButton from '../OpenModalButton'
import Confirmation from '../Confirmation'
import CreateReview from '../CreateReview'
import './ReviewGalleryCard.css'

function ReviewGalleryCard({ data, manage }){
    // Destructure desired properties from passed in review
    const { id, spotId, userId, review, stars, ReviewImages, User, createdAt, Spot } = data

    // Create dispatch instance
    const dispatch = useDispatch()

    // Create history insstance
    const history = useHistory()
    
    // Create reference to current user
    const currentUser = useSelector(state => state.session.user)

    // Create reference to reviews state slice
    const reviewState = useSelector(state => state.reviews.userReviews)

    // Consume Modal Context for desired function
    const { closeModal } = useModal()

    if(!data) return null

    // onYes function
    const yes = () => {
        dispatch(deleteAReview(data))
        dispatch(getSpots())
        dispatch(loadSpot(spotId))
        dispatch(getReviews(spotId))
        dispatch(getCurrentUserReviews())
        closeModal()
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
        'October',
        'November',
        'December'
    ]

    const dateObj = new Date(createdAt)
    const year = dateObj.getFullYear()
    const monthIdx = dateObj.getMonth()
    const month = months[monthIdx]
    const day = dateObj.getDate()

return (
    <div className='flex flex-col mx-2 my-1'>
        {manage && data && ( <h2>{Spot?.name}</h2> )}
        <h3 className='m-0.5 capitalize'>{User?.firstName}</h3>
        <p className='text-light-color m-0.5'>{month} {day}, {year}</p>
        <p>{review}</p>
        <div className='w-80 h-8 flex justify-around items-center'>
            {currentUser?.id === userId && ( <div><OpenModalButton modalComponent={<Confirmation label='Confirm Delete' message='Are you sure you want to delete this review?' onYes={yes} yesLabel='Delete Review' onNo={no} noLabel='Keep Review' />} buttonText='Delete' /></div> )}
            {currentUser?.id === userId && ( <div><OpenModalButton modalComponent={<CreateReview data={data} id={spotId} edit={true} />} buttonText='Update' /></div> )}
        </div>
    </div>
)
}

export default ReviewGalleryCard