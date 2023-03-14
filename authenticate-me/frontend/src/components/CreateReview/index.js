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
        console.log('rerender')
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
        console.log('submit')
        e.preventDefault()
        setIsSubmitted(true)
        setErrors({})
        const errorsObj = {}

        if(Object.keys(errors).length === 0){
            const newReviewObj = {
                review,
                stars
            }

            console.log('createdReview: ', newReviewObj)

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
                        console.log("database errors: ", data.message)
                        setErrors(errorsObj)
                    }
                })
                
                if(!newReview) return
    
                console.log('newReview: ', newReview)
            }


            setIsSubmitted(false)
            reset()
            reRenderReviews()
            closeModal()
        } else {
            console.log('errors: ', errors)
            console.log('isSubmitted: ', isSubmitted)
        }
    }


    return (
        <div className='main-container'>
            <h2 style={{ textAlign: 'center' }}>How was your stay?</h2>
            {isSubmitted && errors.databaseErrors && ( 
                <p>{`${errors.databaseErrors.split(': ')[1]}`}</p>
             )}
            <form onSubmit={handleSubmit} className='create-review-form'>
                <div className='review-content-container'>
                    <input type='text' style={{ height: '150px', width: '300px' }} placeholder='Just a quick review' value={review} onChange={(e) => setReview(e.target.value)} />
                </div>
                {<RatingInput rating={stars} onChange={onChange} />}
                {/* <div className="rate">
                    <input type="radio" id="star5" name="rate" value="5" onChange={(e) => {
                        let num = Number(e.target.value)
                        setStars(num)}
                    }  />
                    <label htmlFor="star5" title="5 stars">5 stars</label>
                    <input type="radio" id="star4" name="rate" value='4' onChange={(e) => {
                        let num = Number(e.target.value)
                        setStars(num)}
                    }  />
                    <label htmlFor="star4" title="4 stars">4 stars</label>
                    <input type="radio" id="star3" name="rate" value="3" onChange={(e) => {
                        let num = Number(e.target.value)
                        setStars(num)}
                    }  />
                    <label htmlFor="star3" title="3 stars">3 stars</label>
                    <input type="radio" id="star2" name="rate" value="2" onChange={(e) => {
                        let num = Number(e.target.value)
                        setStars(num)}
                    }  />
                    <label htmlFor="star2" title="2 stars">2 stars</label>
                    <input type="radio" id="star1" name="rate" value="1" onChange={(e) => {
                        let num = Number(e.target.value)
                        setStars(num)}
                    }  />
                    <label htmlFor="star1" title="1 star">1 star</label>
                </div> */}
                <button disabled={review.length < 10 || stars < 1}>Submit Your Review</button>
            </form>
        </div>
    )
}

export default CreateReview