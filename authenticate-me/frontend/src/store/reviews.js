// Necessary imports
import { csrfFetch } from "./csrf";
import { normalizeData } from "./spots";

// Create type strings
const LOAD_REVIEWS = 'review/loadReviews'
const CREATE_REVIEW = 'review/createReview'

// Create action creators
    // LOAD_REVIEWS
    export const loadReviews = (reviews) => {
        return {
            type: LOAD_REVIEWS,
            reviews
        }
    }

    // CREATE_REVIEW 
    export const createReview = (review) => {
        return {
            type: CREATE_REVIEW,
            review
        }
    }

// Create Thunks
    // LOAD_REVIEWS Thunk
    export const getReviews = (id) => async dispatch => {
        const res = await csrfFetch(`/api/spots/${id}/reviews`)

        if(res.ok){
            const data = await res.json()
            dispatch(loadReviews(data))
            return data
        }
    }

    // CREATE_REVIEW Thunk
    export const createAReview = (reviewObj, spotId) => async dispatch => {
        const { review, stars } = reviewObj
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            body: JSON.stringify({
                review,
                stars
            })
        })

        if(res.ok){
            const createdReview = await res.json()
            dispatch(createReview(createdReview))
            return createdReview
        }
    }

// Create Reducer
const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState
    switch(action.type){
        case LOAD_REVIEWS:
            newState = {...state}
            console.log('newState: ', newState)
            newState.spotReviews = normalizeData(action.reviews.Reviews)
            return newState
        case CREATE_REVIEW:
            newState = {...state}
            newState.spotReviews[action.review.id] = action.review
            return newState
        default:
            return state
    }
}

export default reviewsReducer