import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"


function SpotSearchResults(){
    // Consume desired properties from params object
    const { searchQuery } = useParams()

    // Subscribe to searched spots slice of state
    const searchedSpots = useSelector(state => state.spots.searchedSpots)

    console.log('searchedSpots: ', searchedSpots)

    if(!searchedSpots || searchedSpots.length === 0) return null

    return (
        <div className="spot-search-results-container">
            <div>Results</div>
            {searchQuery}
        </div>
    )
}

export default SpotSearchResults