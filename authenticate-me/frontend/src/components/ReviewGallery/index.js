// Necessary imports
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getReviews } from '../../store/reviews'
import ReviewGalleryCard from '../ReviewGalleryCard'
import './ReviewGallery.css'

function ReviewGallery({ id, reviewCount, avgRating }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Load reviews into state on component render
    useEffect(() => {
        console.log('dispatch')
        dispatch(getReviews(id))
    }, [dispatch])

    // Create a reference to the reviews state slice
    const data = useSelector(state => state.reviews?.Reviews?.Reviews)
    const reviews = data.filter(review => review.spotId === +id)

    if(reviews.length === 0) return null

    return (
        <div>
            <div className='reviews-header-container'>
                <div className='stars-container'>
                    <div className='rating'>
                        <i className='fa-solid fa-star' />
                        {reviews && reviewCount > 0 ? ( <p>{avgRating}</p> ) : ( <p>New</p> )}
                    </div>
                    {reviews && reviewCount > 0 && (  <><div className='dot'>
                        {reviews && ( <span>&#183;</span> )}
                    </div>
                    <div className='reviews'>
                        {reviews && ( <p>{reviewCount} reviews</p> )}
                    </div></> )}
                </div>
            </div>
            <ul>
                {reviews.map(review => (
                    <ReviewGalleryCard key={review.id} data=
                    {review} />
                ))}
            </ul>
        </div>
    )
}

export default ReviewGallery