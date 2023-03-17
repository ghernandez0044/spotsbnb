// Necessary imports
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCurrentUserReviews } from '../../store/reviews'
import ReviewGalleryCard from '../ReviewGalleryCard'

function ManageReviews(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Upon component render, load all current user reviews into Redux store
    useEffect(() => {
        dispatch(getCurrentUserReviews())
    }, [dispatch])

    // Reference current user reviews
    const data = useSelector(state => state.reviews.userReviews)

    // Reference reviews state slice
    const reviewsState = useSelector(state => state.reviews)
    
    let reviews
    if(data){
        reviews = Object.values(data)
    }

    if(!data || Object.keys(data).length === 0 || !reviews) return ( 
        <div>
            <h1 style={{ textAlign: 'left', marginLeft: '5%' }}>Manage Your Reviews</h1>
            <h2 style={{ textAlign: 'center' }}>No Reviews Posted Yet!</h2>
        </div>
     ) 

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Manage Your Reviews</h1>
            <ul className='review-card-container'>
                {reviews.map(review => (
                    <ReviewGalleryCard key={review.id} data={review} manage={true} />
                ))}
            </ul>
        </div>
    )
}

export default ManageReviews