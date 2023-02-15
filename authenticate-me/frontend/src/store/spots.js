// Necessary imports
import { csrfFetch } from "./csrf"


// Function to flatten and normalize data
export const normalizeData = (array, object = {}) => {
    array.forEach(element => (
        object[element.id] = element
    ))

    return object
}

// Create type strings
const LOAD_SPOTS = 'spot/loadSpots'
const LOAD_SPOT = 'spot/loadSpot'

// Create action creators
    // LOAD_SPOTS
    export const loadSpots = (spots) => {
        return {
            type: LOAD_SPOTS,
            spots
        }
    }

    // LOAD_SPOT
    export const loadSpot = (spot) => {
        return {
            type: LOAD_SPOT,
            spot
        }
    }

// Create thunks
    // LOAD_SPOTS Thunk
    export const getSpots = () => async dispatch => {
        const res = await csrfFetch('/api/spots')

        if(res.ok){
            const data = await res.json()
            dispatch(loadSpots(data.Spots))
        }
    }

    // LOAD_SPOT Thunk
    export const getSpot = (id) => async dispatch => {
        const res = await csrfFetch(`/api/spots/${id}`)

        if(res.ok){
            const data = await res.json()
            console.log('data: ', data)
            dispatch(loadSpot(data))
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
        case LOAD_SPOT:
            newState = {...state}
            newState.Spots.push(action.spot)
            return newState
        default:
            return state
    }
}

export default spotReducer