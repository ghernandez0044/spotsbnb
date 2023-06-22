// Necessary imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSearchedSpots } from "../../store/spots";
import './SearchBar.css'

function SearchBar(){

    // Create state variables
    const [ searchQuery, setSearchQuery ] = useState('')

    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()


    return (
        <div className='search-bar-container'>
            <div className="search-icon-container">
                <i className="fas fa-solid fa-magnifying-glass"></i>
            </div>
            <input type='search' placeholder="Search By City" spellCheck={true} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setSearchQuery(e.target.value);
                if (searchQuery.length > 0) {
                  dispatch(getSearchedSpots(searchQuery)).then(res => {
                      history.push(`/spots/results/${searchQuery}`);
                      setSearchQuery('')
                  })  
                }
              }
            }} required  />
        </div>
    )
}

export default SearchBar