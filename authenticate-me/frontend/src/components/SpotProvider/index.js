// Necessary imports
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { loadSpot } from '../../store/oneSpot'
import CreateASpot from '../CreateASpot'

function SpotProvider(){
    console.log('SpotProvider component render')
    // Create dispatch method
    const dispatch = useDispatch()

    // Deconstruct id from parameters object
    const { id } = useParams()
    console.log('SpotProvider Id: ', id)

    const data = useSelector(state => state.singleSpot?.singleSpot)

    // Load details of the spot found by the id
    useEffect(() => {
        console.log('dispatch')
       dispatch(loadSpot(id))
    }, [])


    const spot = data.id === Number(id) ? data : null

    // if(spot.id !== id) 

    console.log('spot from spot provider: ', spot)

    if(!spot || Object.keys(spot).length === 0) return <h2>No Spot Found</h2>

    return (
            <CreateASpot edit={true} spot={spot} />
    )
}

export default SpotProvider