import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Search(){
    return (
        <div className="search-container">
            <div className="dropDown">
                <div className="dropdown-text">
                    <span>Everything</span>
                    <FontAwesomeIcon icon={faCaretDown}/>
                </div>
                    <ul className="dropdown-list">
                    <li className="dropdown-list-item">Everything</li>
                    <li className="dropdown-list-item">Other</li>
                    <li className="dropdown-list-item">Another</li>
                </ul>
            </div>
            
            <div className="search-box">
                <input type="text" id="search-input" placeholder="search company..."></input>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </div>
        </div>
    )
}

export default Search;