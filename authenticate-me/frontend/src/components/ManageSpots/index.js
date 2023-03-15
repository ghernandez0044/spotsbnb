// Necessary imports
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCurrentUserSpots } from '../../store/spots'
import SpotGalleryCard from '../SpotGalleryCard'


function ManageSpots(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Upon component render, load all current user spots into Redux store
   useEffect(() => {
        dispatch(getCurrentUserSpots())
   }, [])

    const spots = useSelector((state) => state.spots?.currentUserSpots?.Spots)
    
    // if(spots.length === 0 || !spots) return ( <h2>You Currently Have No Spots</h2> )


    return spots && (
        <>
            <h1 style={{ textAlign: 'center' }}>Manage Your Spots</h1>
            <ul className='spot-card-container'>
                {spots.map(spot => (
                    <SpotGalleryCard key={spot.id} spot={spot} manage={true} />
                ))}
            </ul>
        </>
    )
}

export default ManageSpots