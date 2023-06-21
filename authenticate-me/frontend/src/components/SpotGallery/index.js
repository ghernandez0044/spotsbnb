// Necessary imports
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getSpots } from '../../store/spots'
import SpotGalleryCard from '../SpotGalleryCard'
import './SpotGallery.css'

function SpotGallery(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Load spots into state on component render
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    // Create a reference to the spots state slice
    const spots = useSelector((state) => Object.values(state.spots.Spots))

    return (
        <div>
            <ul className='spot-card-container'>
                {spots.map(spot => (
                        <SpotGalleryCard key={spot.id} spot={spot} />
                ))}
            </ul>
        </div>
    )
}

export default SpotGallery

