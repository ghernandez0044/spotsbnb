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
    const reviews = useSelector(state => state.reviews.userReviews)
    console.log('currentUserReviews: ', reviews)

    if(!reviews) return null

    return (
        null
    )
}

export default ManageReviews