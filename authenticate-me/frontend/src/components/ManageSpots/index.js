// Necessary imports
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCurrentUserSpots } from '../../store/spots'
import SpotGalleryCard from '../SpotGalleryCard'
import LoadingScreen from '../LoadingScreen'


function ManageSpots(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Create state variable to see if user spots are loaded
    const [ isLoaded, setIsLoaded ] = useState(false)

    // Upon component render, load all current user spots into Redux store
   useEffect(() => {
        dispatch(getCurrentUserSpots()).then(res => setIsLoaded(true))
   }, [])

    const spots = useSelector((state) => state.spots?.currentUserSpots?.Spots)
    
    // if(spots.length === 0 || !spots) return ( <h2>You Currently Have No Spots</h2> )

    // Create onClick function
    const onClick = () => {
        history.push('/spots/new')
    }

    if(!isLoaded) return <LoadingScreen />

    return spots && (
        <div className='manage-spot-container'>
            <div className='flex flex-col'>
                <h1 className='text-left' style={{ marginLeft: '5%' }}>Manage Your Spots</h1>
                <button onClick={onClick} className='create-spot-button'>Create A Spot</button>
            </div>
            {!spots || Object.keys(spots).length === 0 ? <h2 style={{ textAlign: 'center' }}>You Have No Spots Yet!</h2> : ''}
            <ul className='flex flex-wrap justify-center'>
                {spots.map(spot => (
                    <SpotGalleryCard key={spot.id} spot={spot} manage={true} />
                ))}
            </ul>
        </div>
    )
}

export default ManageSpots