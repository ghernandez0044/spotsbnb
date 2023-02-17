// Necessary imports
import { csrfFetch } from "./csrf";
import { normalizeData } from "./spots";

// Create type strings
const CREATE_IMAGE = 'spotImage/createImage'

// Create action creators
    // CREATE_IMAGE
    export const createImage = (image) => {
        return {
            type: CREATE_IMAGE,
            image
        }
    }

// Create thunks
    // CREATE_IMAGE thunk
    export const createAnImage = (image, spotId) => async dispatch => {
        const { url, preview } = image
        const res = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            body: JSON.stringify({
                url,
                preview
            })
        })

        if(res.ok){
            const data = await res.json()
            dispatch(createImage(data))
            return data
        }
    }

// Create reducer
const initialState = {
    spotImages: []
}

const spotImageReducer = (state = initialState, action) => {
    let newState
    switch(action.type){
        case CREATE_IMAGE:
            newState = {...state}
            newState.spotImages.push(action.image)
            return newState
        default:
            return state
    }
}

export default spotImageReducer