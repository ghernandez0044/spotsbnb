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
    // Call API to login thunk
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

      // Restore the Session User thunk
      export const restoreUser = () => async dispatch => {
        const response = await csrfFetch('api/session')

        if(response.ok){
            const data = await response.json()
            dispatch(setUser(data.user))
            return response
        }
      }

      // Signup User thunk
      export const signup = (user) => async dispatch => {
        const { firstName, lastName, username, email, password } = user
        const response = await csrfFetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                firstName,
                lastName,
                username,
                email,
                password
            })
        })

        if(response.ok){
            const data = await response.json()
            dispatch(setUser(data.user))
            return response
        }
      }

      // Logout User thunk
      export const logout = () => async dispatch => {
        const response = await csrfFetch('/api/session', {
            method: 'DELETE'
        })

        if(response.ok){
            dispatch(removeUser())
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