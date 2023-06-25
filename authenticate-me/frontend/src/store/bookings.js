// Necessary Imports
import { csrfFetch } from "./csrf";
import { normalizeData } from "./spots";

// Create Type Strings
const LOAD_BOOKINGS = 'bookings/loadBookings'
const LOAD_BOOKING = 'bookings/loadBooking'
const CREATE_BOOKING = 'bookings/createBooking'
const DELETE_BOOKING = 'bookings/deleteBooking'

// Create Action Creators
    // LOAD_BOOKINGS
    export const actionLoadBookings = (bookings) => {
        return {
            type: LOAD_BOOKINGS,
            bookings
        }
    }

    // LOAD_BOOKING
    export const actionLoadBooking = (booking) => {
        return {
            type: LOAD_BOOKING,
            booking
        }
    }

    // CREATE_BOOKING
    export const actionCreateBooking = (booking) => {
        return {
            type: CREATE_BOOKING,
            booking
        }
    }

    // DELETE_BOOKING
    export const actionDeleteBooking = (id) => {
        return {
            type: DELETE_BOOKING,
            id
        }
    }

// Create Thunks
    // LOAD_BOOKINGS Thunk
    export const getUserBookings = () => async dispatch => {
        const res = await csrfFetch('/api/bookings/current')
        if(res.ok){
            const bookings = await res.json()
            dispatch(actionLoadBookings(bookings))
            return bookings
        }
        return res
    }

    // LOAD_BOOKING Thunk
    export const getBooking = (id) => async dispatch => {
        const res = await csrfFetch(`/api/bookings/${id}`)
        if(res.ok){
            const booking = await res.json()
            dispatch(actionLoadBooking(booking))
            return booking
        }
        return res
    }

    // CREATE_BOOKING Thunk
    export const createABooking = (booking, spotId) => async dispatch => {
        const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
            method: 'POST',
            body: JSON.stringify(booking)
        })
        if(res.ok){
            const createdBooking = await res.json()
            dispatch(actionCreateBooking(createdBooking))
            return createABooking
        }
        return res
    }

    // DELETE_BOOKING Thunk
    export const deleteABooking = (id) => async dispatch => {
        const res = await csrfFetch(`/api/bookings/${id}`, {
            method: 'DELETE'
        })
        if(res.ok){
            const data = await res.json()
            await dispatch(deleteABooking(id))
            await dispatch(getUserBookings())
        }
        return res
    }

    // Initial State
    const initialState = {
        userBookings: {},
        singleBooking: {}
    }

    // Reducer
    const bookingsReducer = (state = initialState, action) => {
        let newState = {...state}
        switch(action.type){
            case LOAD_BOOKINGS:
                const userBookings = normalizeData(action.bookings.Bookings)
                newState.userBookings = {...userBookings}
                return newState
            case LOAD_BOOKING:
                return {...state, singleBooking: {...action.booking}}
            case CREATE_BOOKING:
                return {...state, userBookings: {...state.userBookings, [action.booking.id]: action.booking}}
            default:
                return state
        }
    }

    export default bookingsReducer