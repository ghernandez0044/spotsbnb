import { useState } from 'react'
import Calendar from 'react-calendar'
import './CalendarComponent.css'

function CalendarComponent({ setBookingDateRange, bookingDateRange }){
    // Create state variables
    const [ date, setDate ] = useState(new Date())

    console.log('dateRange: ', bookingDateRange)

    return (
        <div className="calendar-component-container">
            <div className='react-calendar-container'>
                <Calendar value={date} minDate={new Date()} selectRange={true} onChange={setBookingDateRange} />
            </div>
        </div>
    )
}

export default CalendarComponent