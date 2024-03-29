import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal"
import Calendar from "react-calendar"
import { DateRange } from "react-date-range"
import { addDays } from 'date-fns';
import { updateABooking, getUserBookings } from "../../store/bookings"
import '../CalendarComponent/CalendarComponent.css'


function UpdateBooking({ startDate, endDate, booking }){
    // Create state variables
    const [ bookingDateRange, setBookingDateRange ] = useState([{
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        key: 'selection'
    }])
    const [ backendErrors, setBackendErrors ] = useState({})
    const [ isSubmitted, setIsSubmitted ] = useState(false)

    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Consume Modal Context
    const { closeModal } = useModal()

    // Check for validations on input
    useEffect(() => {
        const errObj = {}
        if(new Date(bookingDateRange[0].startDate) < new Date()){
            errObj.startDateErr = 'Cannot cancel bookings that are currently underway'
        }
        setBackendErrors(errObj)
    }, [bookingDateRange])

    // Create function to update booking
    const updateBooking = () => {
        setIsSubmitted(true)
        const objectCreatedUpdateBooking = {
            startDate: bookingDateRange[0].startDate,
            endDate: bookingDateRange[0].endDate
        }

        dispatch(updateABooking(objectCreatedUpdateBooking, booking.id)).then(res => {
            dispatch(getUserBookings())
        }).then(res => {
            setIsSubmitted(false)
            closeModal()
        }).catch(async error => {
            const errObj = {}
            const formattedError = await error.json()
            errObj.backendError = formattedError.message
            setBackendErrors(errObj)
        })
        
    }

    return (
        <div style={{ width: '400px', padding: '15px' }} className="h-fit flex flex-col">
            <div className="label">
                <h1 className="text-center bold text-3xl">Update Booking</h1>
            </div>
            {isSubmitted && backendErrors.backendError && (
                <div className='error-decoration'>{backendErrors.backendError}</div>
            )}
            {isSubmitted && backendErrors.startDateErr && (
                <div className='error-decoration'>{backendErrors.startDateErr}</div>
            )}
            <div className="message-container">
                <DateRange minDate={addDays(new Date(), 1)} rangeColors={['#FF5A5F', '#3ecf8e', '#fed14c']} editableDateInputs={true}
                    onChange={item => setBookingDateRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={bookingDateRange} />
            </div>
            <button onClick={updateBooking} className='reserve-button animate-bounce' style={{ margin: '10px auto', fontSize: '24px' }}>Update</button>
        </div>
    )
}

export default UpdateBooking