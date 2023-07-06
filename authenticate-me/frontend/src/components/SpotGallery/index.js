// Necessary imports
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getSpots } from '../../store/spots'
import SpotGalleryCard from '../SpotGalleryCard'
import './SpotGallery.css'
import LoadingScreen from '../LoadingScreen'

function SpotGallery(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create state variable to see if spots are loaded
    const [ isLoaded, setIsLoaded ] = useState(false)

    // Load spots into state on component render
    useEffect(() => {
        dispatch(getSpots()).then(res => setIsLoaded(true))
    }, [dispatch])

    // Create a reference to the spots state slice
    const spots = useSelector((state) => Object.values(state.spots.Spots))

    if(!isLoaded) return <LoadingScreen />

    return (
        <div>
            <ul className='flex flex-wrap justify-center'>
                {spots.map(spot => (
                        <SpotGalleryCard key={spot.id} spot={spot} />
                ))}
            </ul>
        </div>
    )
}

export default SpotGallery

