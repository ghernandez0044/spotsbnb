// Necessary imports
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { getCurrentUserSpots } from '../../store/spots'
import SpotGalleryCard from '../SpotGalleryCard'


function ManageSpots(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Upon component render, load all current user spots into Redux store
   useEffect(() => {
        dispatch(getCurrentUserSpots())
   }, [])

    const spots = useSelector((state) => state.spots?.currentUserSpots?.Spots)
    
    // if(spots.length === 0 || !spots) return ( <h2>You Currently Have No Spots</h2> )

    // Create onClick function
    const onClick = () => {
        history.push('/spots/new')
    }

    return spots && (
        <div className='manage-spot-container'>
            <div className='header-container'>
                <h1 style={{ textAlign: 'left', marginLeft: '5%' }}>Manage Your Spots</h1>
                <button onClick={onClick} className='create-spot-button'>Create A Spot</button>
            </div>
            {!spots || Object.keys(spots).length === 0 ? <h2 style={{ textAlign: 'center' }}>You Have No Spots Yet!</h2> : ''}
            <ul className='spot-card-container'>
                {spots.map(spot => (
                    <SpotGalleryCard key={spot.id} spot={spot} manage={true} />
                ))}
            </ul>
        </div>
    )
}

export default ManageSpots