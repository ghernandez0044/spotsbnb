import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import Calendar from "react-calendar"
import { updateABooking } from "../../store/bookings"
import '../CalendarComponent/CalendarComponent.css'


function UpdateBooking({ startDate, endDate, booking }){

    // Create state variables
    const [ startDateObject, setStartDateObject ] = useState(startDate)
    const [ endDateObject, setEndDateObject ] = useState(endDate)
    const [ defaultDate, setDefaultDate ] = useState([new Date(startDate), new Date(endDate)])
    const [bookingDateRange, setBookingDateRange ] = useState([])
    const [ backendErrors, setBackendErrors ] = useState({})
    const [ isSubmitted, setIsSubmitted ] = useState(false)

    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Consume Modal Context
    const { closeModal } = useModal()

    // Create function to update booking
    const updateBooking = () => {
        console.log('updateBooking')

        setIsSubmitted(true)

        const bookingStartDate = bookingDateRange[0]?.toISOString().split('T')[0]
        const bookingEndDate = bookingDateRange[1]?.toISOString().split('T')[0]

        const createdUpdateBooking = {
            startDate: bookingStartDate,
            endDate: bookingEndDate
        }

        dispatch(updateABooking(createdUpdateBooking, booking.id)).then(res => {
            setIsSubmitted(false)
            closeModal()
        }).catch(async error => {
            const errObj = {}
            const formattedError = await error.json()
            errObj.backendError = formattedError.message
            setBackendErrors(errObj)
        })

    }

    console.log('UpdateBooking dateRange: ', bookingDateRange)

    return (
        <div className="overall-container">
            <div className="label">
                <h1 style={{ textAlign: 'center' }}>Update Booking</h1>
            </div>
            {isSubmitted && backendErrors.backendError && (
                <div className='error-decoration'>{backendErrors.backendError}</div>
            )}
            <div className="message-container">
                <Calendar minDate={new Date()} defaultValue={defaultDate} selectRange={true} onChange={setBookingDateRange} />
            </div>
            <button onClick={updateBooking} className='reserve-button' style={{ margin: '10px auto' }}><p style={{ fontSize: '16px' }}>Update</p></button>
        </div>
    )
}

export default UpdateBooking