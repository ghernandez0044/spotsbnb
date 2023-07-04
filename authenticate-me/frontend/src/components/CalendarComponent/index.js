import { useState } from 'react'
import Calendar from 'react-calendar'
import './CalendarComponent.css'

function CalendarComponent({ setBookingDateRange, bookingDateRange }){
    // Create state variables
    const [ date, setDate ] = useState(new Date())

    return (
        <div>
            <div>
                <Calendar minDate={new Date()} selectRange={true} onChange={setBookingDateRange} />
            </div>
        </div>
    )
}

export default CalendarComponent