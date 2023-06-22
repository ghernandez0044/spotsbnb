import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import SpotGalleryCard from "../SpotGalleryCard"


function SpotSearchResults(){
    // Consume desired properties from params object
    const { searchQuery } = useParams()

    // Subscribe to searched spots slice of state
    const searchedSpots = useSelector(state => Object.values(state.spots.searchedSpots))

    console.log('searchedSpots: ', searchedSpots)

    if(!searchedSpots || searchedSpots.length === 0) return null

    return (
        <div className="spot-search-results-container">
            <ul className="spot-card-container">
                {searchedSpots.map(spot => (
                    <SpotGalleryCard key={spot.id} spot={spot} />
                ))}
            </ul>
        </div>
    )
}

export default SpotSearchResults