// Necessary imports
import { csrfFetch } from "./csrf"


// Function to flatten and normalize data
function normalizeData(array, object = {}){
    array.forEach(element => (
        object[element.id] = element
    ))

    return object
}

// Create type strings
const LOAD_SPOTS = 'spot/loadSpots'

// Create action creators
    // LOAD_SPOTS
    export const loadSpots = (spots) => {
        return {
            type: LOAD_SPOTS,
            spots
        }
    }

// Create thunks
    // LOAD SPOT Thunk
    export const getSpots = () => async dispatch => {
        const res = await csrfFetch('/api/spots')

        if(res.ok){
            const data = await res.json()
            dispatch(loadSpots(data.Spots))
        }
    }

// Create reducer
const initialState = {
    Spots: []
}

const spotReducer = (state = initialState, action) => {
    let newState
    switch(action.type){
        case LOAD_SPOTS:
            newState = {...state, Spots: action.spots}
            return newState
        default:
            return state
    }
}

export default spotReducer