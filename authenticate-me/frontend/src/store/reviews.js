// Necessary imports
import { csrfFetch } from "./csrf";
import { normalizeData } from "./spots";

// Create type strings
const LOAD_REVIEWS = 'review/loadReviews'
const CREATE_REVIEW = 'review/createReview'
const DELETE_REVIEW = 'review/deleteReview'
const LOAD_CURRENT_REVIEWS = 'review/loadCurrentReviews'
const EDIT_REVIEW = 'review/editReview'

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

    // DELETE_REVIEW
    export const deleteReview = (review) => {
        return {
            type: DELETE_REVIEW,
            review
        }
    }

    // LOAD_CURRENT_REVIEWS
    export const loadCurrentReviews = (reviews) => {
        return {
            type: LOAD_CURRENT_REVIEWS,
            reviews
        }
    }

    // EDIT_REVIEW
    export const editReview = (review) => {
        return {
            type: EDIT_REVIEW,
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

    // DELETE_REVIEW Thunk
    export const deleteAReview = (review) => async dispatch => {
        const res = await csrfFetch(`/api/reviews/${review.id}`, {
            method: 'DELETE'
        })

        if(res.ok){
            const data = await res.json()
            dispatch(deleteReview(review))
        }
    }

    // LOAD_CURRENT_REVIEWS Thunk
    export const getCurrentUserReviews = () => async dispatch => {
        const res = await csrfFetch('/api/reviews/current')

        if(res.ok){
            const reviews = await res.json()
            console.log('thunk reviews: ', reviews)
            dispatch(loadCurrentReviews(reviews))
        }
    }

    // EDIT_REVIEW Thunk
    export const editAReview = (reviewObj, id) => async dispatch => {
        const res = await csrfFetch(`/api/reviews/${id}`, {
            method: 'PUT',
            body: JSON.stringify(reviewObj)
        })

        if(res.ok){
            const editedReview = await res.json()
            dispatch(editReview(editedReview))
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
        case DELETE_REVIEW:
            newState = {...state}
            delete newState.spotReviews[action.review.id]
            delete newState.userReviews[action.review.id]
            return newState
        case LOAD_CURRENT_REVIEWS:
            newState = {...state}
            console.log('reducer: ', action.reviews)
            newState.userReviews = normalizeData(action.reviews.Reviews)
            return newState
        case EDIT_REVIEW:
            newState = {...state}
            // newState.spotReviews[action.review.id] = action.review
            newState.userReviews[action.review.id] = action.review
            return newState
        default:
            return state
    }
}

export default reviewsReducer