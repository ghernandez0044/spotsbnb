import { useState } from 'react'
import Calendar from 'react-calendar'
import './CalendarComponent.css'

function CalendarComponent(){
    // Create state variables
    const [ date, setDate ] = useState(new Date())

    return (
        <div className="calendar-component-container">
            <div className='react-calendar-container'>
                <Calendar value={date} onChange={setDate} />
            </div>
        </div>
    )
}

export default CalendarComponent