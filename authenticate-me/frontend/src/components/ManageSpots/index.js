// Necessary imports
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCurrentUserSpots } from '../../store/spots'


function ManageSpots(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Upon component render, load all current user spots into Redux store
    useEffect(() => {
        dispatch(getCurrentUserSpots())
    }, [dispatch])

    const spots = useSelector((state) => state.spots.currentUserSpots.Spots)
    console.log('currentUserSpots: ', spots)


    return (
        <h1>Manage Your Spots</h1>
    )
}

export default ManageSpots