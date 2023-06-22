// Necessary imports
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './SearchBar.css'

function SearchBar(){


    return (
        <div className='search-bar-container'>
            <div className="search-icon-container">
                <i className="fas fa-solid fa-magnifying-glass"></i>
            </div>
            <input type='search' placeholder="Search" spellCheck={true} required  />
        </div>
    )
}

export default SearchBar