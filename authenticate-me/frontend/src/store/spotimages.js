// Necessary imports
import { csrfFetch } from "./csrf";
import { normalizeData } from "./spots";

// Create type strings
const CREATE_IMAGE = 'spotImage/createImage'
const DELETE_IMAGE = 'spotImage/deleteImage'

// Create action creators
    // CREATE_IMAGE
    export const createImage = (image) => {
        return {
            type: CREATE_IMAGE,
            image
        }
    }

    // DELETE_IMAGE
    export const deleteImage = (id) => {
        return {
            type: DELETE_IMAGE,
            id
        }
    }

// Create thunks
    // CREATE_IMAGE Thunk
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

    // DELETE_IMAGE Thunk
    export const deleteAnImage = (id) => async dispatch => {
        const res = await csrfFetch(`/api/spot-images/${id}`, {
            method: 'DELETE'
        })

        if(res.ok){
            dispatch(deleteImage(id))
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
        case DELETE_IMAGE:
            newState = {...state}
            return newState
        default:
            return state
    }
}

export default spotImageReducer