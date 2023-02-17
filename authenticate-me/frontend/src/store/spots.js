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
const CREATE_SPOT = 'spot/createSpot'
const CURRENT_SPOTS = 'spot/getCurrentSpots'
const DELETE_SPOT = 'spot/deleteSpot'

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

    // CREATE_SPOT
    export const createSpot = (spot) => {
        return {
            type: CREATE_SPOT,
            spot
        }
    }

    // CURRENT_SPOTS
    export const getCurrentSpots = (spots) => {
        return {
            type: CURRENT_SPOTS,
            spots
        }
    }

    // DELETE_SPOT
    export const deleteSpot = (id) => {
        return {
            type: DELETE_SPOT,
            id
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
            return data
        }
    }

    // CREATE_SPOT Thunk
    export const createASpot = (spot) => async dispatch => {
        const { address, city, state, country, lat, lng, name, description, price } = spot
        const res = await csrfFetch('/api/spots', {
            method: 'POST',
            body: JSON.stringify({
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            })
        })

    if(res.ok){
        const data = await res.json()
        dispatch(createSpot(data))
        return data
    }
    }

    // CURRENT_SPOTS Thunk
    export const getCurrentUserSpots = () => async dispatch => {
        const res = await csrfFetch(`/api/spots/current`)

        if(res.ok){
            const data = await res.json()
            dispatch(getCurrentSpots(data))
            return data
        }
    }

    // DELETE_SPOT Thunk
    export const deleteASpot = (id) => async dispatch => {
        const res = await csrfFetch(`/api/spots/${id}`, {
            method: 'DELETE'
        })

        if(res.ok){
            const data = await res.json()
            await dispatch(deleteSpot(id))
            await dispatch(getCurrentUserSpots())
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
            newState.Spots = normalizeData(newState.Spots)
            return newState
        case LOAD_SPOT:
            newState = {...state}
            newState.Spots[action.spot.id] = action.spot
            return newState
        case CREATE_SPOT:
            newState = {...state}
            newState.Spots[action.spot.id] = action.spot
            return newState
        case CURRENT_SPOTS:
            newState = {...state}
            newState.currentUserSpots = action.spots
            return newState
        case DELETE_SPOT:
            newState = {...state}
            delete newState.Spots[action.id]
            return newState
        default:
            return state
    }
}

export default spotReducer