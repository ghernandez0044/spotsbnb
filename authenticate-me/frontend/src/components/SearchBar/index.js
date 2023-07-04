// Necessary imports
import React, { useState } from "react";
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
        <div className='border border-lightgray flex justify-center items-center w-8/12 h-10 mx-6 my-2.5 rounded-xl'>
            <div className="text-white w-9 h-full mx-1.5 p-2 rounded-3xl bg-main-color flex justify-center items-center">
                <i className="fas fa-solid fa-magnifying-glass text-white"></i>
            </div>
            <input className="w-11/12 border-none text-white bg-white placeholder:text-light-color placeholder:text-sm placeholder:ml-4 placeholder:italic" type='search' placeholder="Search By City" spellCheck={true} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => {
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