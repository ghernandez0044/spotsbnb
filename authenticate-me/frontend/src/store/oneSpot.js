// Necessary imports
import { csrfFetch } from "./csrf";

// Create type strings
const LOAD_SPOT = 'oneSpot/getSpot'

// Create action creators
    // LOAD_SPOT
    export const getSpot = (spot) => {
        return {
            type: LOAD_SPOT,
            spot
        }
    }

// Create thunks
    // LOAD_SPOT Thunk
    export const loadSpot = (id) => async dispatch => {
        const res = await csrfFetch(`/api/spots/${id}`)

        if(res.ok){
            const spot = await res.json()
            dispatch(getSpot(spot))
            return spot
        }
    }

// Create reducer
const initialState = {}


const singleSpotReducer = (state = initialState, action) => {
    let newState
    switch(action.type){
        case LOAD_SPOT:
            newState = {...state}
            newState.singleSpot = action.spot
            return newState
        default:
            return state
    }
}

export default singleSpotReducer