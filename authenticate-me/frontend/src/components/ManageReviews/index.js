// Necessary imports
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getCurrentUserReviews } from '../../store/reviews'
import ReviewGalleryCard from '../ReviewGalleryCard'
import LoadingScreen from '../LoadingScreen'

function ManageReviews(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create state variable to see if user reviews are loaded
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ backendErrors, setBackendErrors ] = useState({})

    // Upon component render, load all current user reviews into Redux store
    useEffect(() => {
        dispatch(getCurrentUserReviews()).then(res => setIsLoaded(true)).catch(async error => {
            const errObj = {}
            const formattedError = await error.json()
            errObj.backendError = formattedError.message
            setBackendErrors(errObj)
        })
    }, [dispatch])

    // Reference current user reviews
    const data = useSelector(state => state.reviews.userReviews)

    // Reference reviews state slice
    const reviewsState = useSelector(state => state.reviews)
    
    let reviews
    if(data){
        reviews = Object.values(data)
    }

    if(backendErrors.backendError) return ( 
        <div>
            <h1 style={{ textAlign: 'left', marginLeft: '5%' }}>Manage Your Reviews</h1>
            <h2 style={{ textAlign: 'center' }}>No Reviews Posted Yet!</h2>
        </div>
     )
     
     if(!isLoaded) return <LoadingScreen />

    return (
        <div>
            <h1 className='bold text-3xl' style={{ textAlign: 'left', marginLeft: '5%', marginBottom: '1%' }}>Manage Your Reviews</h1>
            <ul className='review-card-container'>
                {reviews.map(review => (
                    <ReviewGalleryCard key={review.id} data={review} manage={true} />
                ))}
            </ul>
        </div>
    )
}

export default ManageReviews