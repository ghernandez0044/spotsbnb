// Necessary imports
import { csrfFetch } from "./csrf"


// Type Variables
const SET_USER = 'session/setUser'
const REMOVE_USER = 'session/removeUser'


// Action Creators
    // SET_USER
    export const setUser = (user) => {
        return {
            type: SET_USER,
            user
        }
    }

    // REMOVE_USER
    export const removeUser = () => {
        return {
            type: REMOVE_USER
        }
    }

// Thunks
    // Call API to login
    export const login = (user) => async dispatch => {
        const { credential, password } = user
        const response = await csrfFetch('/api/session', {
          method: 'POST',
          body: JSON.stringify({
            credential,
            password
          })
        })
    
        if(response.ok){
          const data = await response.json()
          dispatch(setUser(data.user))
          return response
        }
      }

// Create initial state
const initialState = { user: null }

// Create a session reducer
const sessionReducer = (state = initialState, action) => {
    let newState
    switch(action.type){
        case SET_USER:
            newState = {...state}
            newState.user = action.user
            return newState
        case REMOVE_USER:
            newState = {...state}
            newState.user = null
            return newState
        default:
            return state
    }
}

export default sessionReducer