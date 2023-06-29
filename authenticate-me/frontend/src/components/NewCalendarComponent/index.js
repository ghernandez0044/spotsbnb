import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import './NewCalendarComponent.css'

function NewCalendarComponent({ bookingDateRange, setBookingDateRange }){

    return (
        <div className='new-calendar-component-contanier'>
            <div className='new-react-calendar-container'>
                <DateRange minDate={new Date()} rangeColors={['#FF5A5F', '#3ecf8e', '#fed14c']} editableDateInputs={true}
                    onChange={item => setBookingDateRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={bookingDateRange} />
            </div>
        </div>
    )
}

export default NewCalendarComponent