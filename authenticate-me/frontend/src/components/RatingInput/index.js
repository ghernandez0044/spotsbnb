// Necessary imports
import { useState, useEffect } from 'react'
import './RatingInput.css'

function RatingInput({ rating, disabled, onChange }){

    // Create state variables
    const [ activeRating, setActiveRating ] = useState(rating)

    useEffect(() => {
        setActiveRating(rating)
      }, [rating])

    return (
        <div className='flex mr-1'>
            <div className={activeRating < 1 ? 'empty' : 'filled'} onClick={() => onChange(1)}>
            <i className='fa-solid fa-star' onMouseEnter={disabled ? '' : () => setActiveRating(1)} onMouseLeave={disabled ? '' : () => setActiveRating(rating)}></i>
            </div>
            <div className={activeRating < 2 ? 'empty' : 'filled'} onClick={() => onChange(2)}>
            <i className='fa-solid fa-star' onMouseEnter={disabled ? '' : () => setActiveRating(2)} onMouseLeave={disabled ? '' : () => setActiveRating(rating)}></i>
            </div>
            <div className={activeRating < 3 ? 'empty' : 'filled'} onClick={() => onChange(3)}>
            <i className='fa-solid fa-star' onMouseEnter={disabled ? '' : () => setActiveRating(3)} onMouseLeave={disabled ? '' : () => setActiveRating(rating)}></i>
            </div>
            <div className={activeRating < 4 ? 'empty' : 'filled'} onClick={() => onChange(4)}>
            <i className='fa-solid fa-star' onMouseEnter={disabled ? '' : () => setActiveRating(4)} onMouseLeave={disabled ? '' : () => setActiveRating(rating)}></i>
            </div>
            <div className={activeRating < 5 ? 'empty' : 'filled'} onClick={() => onChange(5)}>
            <i className='fa-solid fa-star' onMouseEnter={disabled ? '' : () => setActiveRating(5)} onMouseLeave={disabled ? '' : () => setActiveRating(rating)}></i>
            </div>
        </div>
    )
}

export default RatingInput