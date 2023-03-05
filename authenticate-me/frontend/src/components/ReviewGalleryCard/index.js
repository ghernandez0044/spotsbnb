// Necessary imports
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './ReviewGalleryCard.css'

function ReviewGalleryCard({ data }){
    // Destructure desired properties from passed in review
    const { id, spotId, userId, review, stars, ReviewImages, User, createdAt } = data


    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'Octorber',
        'Novemeber',
        'December'
    ]

    const year = new Date(createdAt).getFullYear()
    const monthIdx = new Date(createdAt).getMonth()
    const month = months[monthIdx]
    const day = new Date(createdAt).getDay()

return (
    <div className='review-container'>
        <h3 style={{ margin: '2px' }}>{User.firstName}</h3>
        <h4 style={{ margin: '2px' }}>{month}, {day}, {year}</h4>
        <p>{review}</p>
    </div>
)
}

export default ReviewGalleryCard