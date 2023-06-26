import { useState } from "react"
import Calendar from "react-calendar"
import '../CalendarComponent/CalendarComponent.css'


function UpdateBooking({ startDate, endDate }){

    // Create state variables
    const [ startDateObject, setStartDateObject ] = useState(startDate)
    const [ endDateObject, setEndDateObject ] = useState(endDate)
    const [ defaultDate, setDefaultDate ] = useState([new Date(startDate), new Date(endDate)])
    const [bookingDateRange, setBookingDateRange ] = useState([])

    console.log('UpdateBooking dateRange: ', bookingDateRange)

    return (
        <div className="overall-container">
            <div className="label">
                <h1 style={{ textAlign: 'center' }}>Update Booking</h1>
            </div>
            <div className="message-container">
                <Calendar defaultValue={defaultDate} selectRange={true} onChange={setBookingDateRange} />
            </div>
        </div>
    )
}

export default UpdateBooking