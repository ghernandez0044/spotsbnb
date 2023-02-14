// Necessary imports
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Route, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getSpots } from '../../store/spots'

function SpotGallery(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Load spots into state on component render
    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    // Create a reference to the spots state slice
    const spots = useSelector((state) => state.spots.Spots)

    console.log('Spots: ', spots)

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Spot Gallery</h2>
            <ul>
                {spots.map(spot => (
                    <li key={spot.id}>
                        <NavLink exact to={`/spots/${spot.id}`}>
                            {spot.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SpotGallery

