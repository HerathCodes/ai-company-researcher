import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchField from './SearchField';

function Search(){
    return (
        <div className="search-container">
            {/* <div className="dropDown">
                <div className="dropdown-text">
                    <span>Everything</span>
                    <FontAwesomeIcon icon={faCaretDown}/>
                </div>
                    <ul className="dropdown-list">
                    <li className="dropdown-list-item">Everything</li>
                    <li className="dropdown-list-item">Other</li>
                    <li className="dropdown-list-item">Another</li>
                </ul>
            </div> */}
            
            <div className="search-box">
                <SearchField/>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </div>
        </div>
    )
}

export default Search;