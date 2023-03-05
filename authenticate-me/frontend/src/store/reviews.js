// Necessary imports
import { csrfFetch } from "./csrf";
import { normalizeData } from "./spots";

// Create type strings
const LOAD_REVIEWS = 'review/loadReviews'

// Create action creators
    // LOAD_REVIEWS
    export const loadReviews = (reviews) => {
        return {
            type: LOAD_REVIEWS,
            reviews
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

// Create Reducer
const initialState = {
    Reviews: []
}

const reviewsReducer = (state = initialState, action) => {
    let newState
    switch(action.type){
        case LOAD_REVIEWS:
            newState = {...state}
            newState.Reviews = action.reviews
            return newState
        default:
            return state
    }
}

export default reviewsReducer