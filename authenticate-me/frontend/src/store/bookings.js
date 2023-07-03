// Necessary Imports
import { csrfFetch } from "./csrf";
import { normalizeData } from "./spots";

// Create Type Strings
const LOAD_BOOKINGS = 'bookings/loadBookings'
const LOAD_BOOKING = 'bookings/loadBooking'
const CREATE_BOOKING = 'bookings/createBooking'
const DELETE_BOOKING = 'bookings/deleteBooking'
const UPDATE_BOOKING = 'bookings/updateBooking'

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

    // UPDATE_BOOKING
    export const actionUpdateBooking = (booking) => {
        return {
            type: UPDATE_BOOKING,
            booking
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
        } else {
            return res
        }
    }

    // DELETE_BOOKING Thunk
    export const deleteABooking = (bookingId) => async dispatch => {
        const res = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: 'DELETE'
        })
        if(res.ok){
            const data = await res.json()
            dispatch(actionDeleteBooking(bookingId))
        }
        return res
    }

    // UPDATE_BOOKING Thunk
    export const updateABooking = (updatedBooking, bookingId) => async dispatch => {
        const res = await csrfFetch(`/api/bookings/${bookingId}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBooking)
        })
        if(res.ok){
            const updatedBooking = res.json()
            dispatch(actionUpdateBooking(updatedBooking))
            return updatedBooking
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
            case DELETE_BOOKING:
                delete newState.userBookings[action.id]
                return newState
            case UPDATE_BOOKING:
                // return {...state, userBookings: {...state.userBookings, [action.booking.id]: action.booking}}
                return newState
            default:
                return state
        }
    }

    export default bookingsReducer