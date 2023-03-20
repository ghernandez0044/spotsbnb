// Necessary imports
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAReview, getCurrentUserReviews } from '../../store/reviews'
import { useModal } from '../../context/Modal'
import { getReviews } from '../../store/reviews'
import { loadSpot } from '../../store/oneSpot'
import { getSpots } from '../../store/spots'
import { editAReview } from '../../store/reviews'
import RatingInput from '../RatingInput'
import './CreateReview.css'

function CreateReview({ id, renderObj, edit, data }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Destructure desired properties from renderObj
    // const { render, setRender } = renderObj
    const spot = useSelector(state => state.spots.Spots[id])

    // Consume ModalContext
    const { closeModal } = useModal()

    // Create state variables
    const [ review, setReview ] = useState(data?.review || '')
    const [ stars, setStars ] = useState(data?.stars || 0)
    const [ errors, setErrors ] = useState({})
    const [ isSubmitted, setIsSubmitted ] = useState(false)

    // Function to reset all fields on form
    const reset = () => {
        setReview('')
        setStars(0)
    }

    // Checking for validation errors on form inputs
    useEffect(() => {

    }, [review, stars])

    // Function to re-render reviews upon review submission
    const reRenderReviews = () => {
        dispatch(getSpots())
        dispatch(loadSpot(id))
        // setRender(!render)
        dispatch(getReviews(id))
    }

    // onChange function
    const onChange = (e) => {
        setStars(e)
    }

    // Handle submission event
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitted(true)
        setErrors({})
        const errorsObj = {}

        if(Object.keys(errors).length === 0){
            const newReviewObj = {
                review,
                stars
            }

            if(edit && data){
                const editedReview = await dispatch(editAReview(newReviewObj, data.id)).catch(async (res) => {
                    console.log('res: ', res)
                    const data = await res.json()
                    if(data && data.errors) errorsObj.databaseErrors = data.errors
                })
                reset()
                dispatch(getCurrentUserReviews())
                closeModal()
            } else {
                const newReview = await dispatch(createAReview(newReviewObj, id)).catch(async (res) => {
                    const data = await res.json()
                    if(data && data.message){
                        errorsObj.databaseErrors = data.message
                        setErrors(errorsObj)
                    }
                })
                
                if(!newReview) return
            }


            setIsSubmitted(false)
            reset()
            reRenderReviews()
            closeModal()
        } else {
            return
        }
    }


    return (
        <div className='main-container'>
            <h2 style={{ textAlign: 'center' }}>How was your stay at {spot.name}?</h2>
            {isSubmitted && errors.databaseErrors && ( 
                <p>{`${errors.databaseErrors.split(': ')[1]}`}</p>
             )}
            <form onSubmit={handleSubmit} className='create-review-form'>
                <div className='review-content-container'>
                    <input type='text' style={{ height: '150px', width: '300px' }} placeholder='Quick review' value={review} onChange={(e) => setReview(e.target.value)} />
                </div>
                <div className='rating-input-container'>
                    {<RatingInput rating={stars} onChange={onChange} />}
                </div>
                <button className='review-button' disabled={review.length < 10 || stars < 1}><p>{!edit ? 'Submit Your Review' : 'Update Your Review' }</p></button>
            </form>
        </div>
    )
}

export default CreateReview