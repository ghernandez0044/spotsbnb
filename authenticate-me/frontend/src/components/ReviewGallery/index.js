// Necessary imports
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getReviews } from '../../store/reviews'
import ReviewGalleryCard from '../ReviewGalleryCard'
import OpenModalButton from '../OpenModalButton'
import CreateReview from '../CreateReview'
import './ReviewGallery.css'

function ReviewGallery({ id, reviewCount, avgRating, spot }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Load reviews into state on component render
    useEffect(() => {
        dispatch(getReviews(id))
    }, [])

    // Create a reference to the reviews state slice
    const data = useSelector(state => state.reviews.spotReviews)

    // Create a reference to current user reviews state slice
    const currentUserReviews = useSelector(state => state.reviews.userReviews)

    // Create a reference to the current user
    const currentUser = useSelector(state => state.session.user)
    const belongsToCurrentUser = currentUser?.id === spot?.ownerId

    let reviews
    if(data){
        // reviews = data.filter(review => review.spotId === +id)
        reviews = Object.values(data).filter(object => object.spotId === Number(id)) 
    }

    if(!data || !reviews || reviews.length === 0) return (
        <>
            <div style={{ minWidth: '60px' }} className='flex center justify-start'>
                <div style={{ minWidth: '50px' }} className='flex flex-col justify-around items-center p-1.5'>
                    <div style={{ minWidth: '80px' }} className='flex items-center justify-around'>
                        <i className='fa-solid fa-star' />
                        <h2>New</h2>
                    </div>
                    {currentUser && !belongsToCurrentUser ? ( <><p>Be the first to post a review!</p><OpenModalButton modalComponent={<CreateReview id={id} />} buttonText='Post Your Review' /></> ) : ( <p></p> )}
                </div>
            </div>
        </>
    )

    // Check to see if current user has already posted a review
    const posted = reviews.find(review => review.userId === currentUser?.id) ? true : false

    return (
        <div>
            <div className='flex flex-col justify-between items-start p-2.5'>
                <div style={{ minWidth: '60px' }} className='flex justify-start items-center'>
                    <div style={{ minWidth: '50px' }} className='flex items-center justify-around flex-row p-1.5'>
                        <i className='fa-solid fa-star' />
                        {reviews && reviewCount > 0 ? ( <p>{avgRating}</p> ) : ( <p>New</p> )}
                    </div>
                    {reviews && reviewCount > 0 && (  <><div className='dot'>
                        {reviews && ( <span>&#183;</span> )}
                    </div>
                    <div style={{ minWidth: '80px' }} className='text-center'>
                        {reviews && ( <p>{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</p> )}
                    </div></> )}
                </div>
                {currentUser && !belongsToCurrentUser && !posted ? ( <OpenModalButton modalComponent={<CreateReview id={id} />} buttonText='Post Your Review' /> ) : ( <p></p> )}
            </div>
            <ul className='flex flex-col-reverse justify-between items-start max-h-fit'>
                {reviews.map(review => (
                    <ReviewGalleryCard key={review.id} data=
                    {review} />
                ))}
            </ul>
        </div>
    )
}

export default ReviewGallery