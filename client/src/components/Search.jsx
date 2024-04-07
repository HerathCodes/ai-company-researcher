import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Search(){

    const [query, setQuery] = useState('');

    async function suggestCompanies(e) {
        e.preventDefault();
        setQuery(e.target.value);
        try {
            const response = await fetch(`http://localhost:3000/api/companies/search/${query}`);

            if (response.status === 500) {
                console.error("Error fetching data");
            } else if (response.status === 400) {
                // no such company, do ur thingy
            } else {
                const data = await response.json();
                console.log(data);
                // iterate through data, display suggestions
            }
        } catch (error) {
            console.error('GET Error: ' + error);
        }
    }

    async function searchCompany(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/companies/${query}`);

            if (response.status === 500) {
                console.error("Error fetching data");
            } else if (response.status === 400) {
                // no such company, do ur thingy
                
            } else {
                const data = await response.json();
                console.log(data);
                // display company
            }
        } catch (error) {
            console.error('GET Error: ' + error);
    }

        
    }
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
                <form action={searchCompany} >
                    <input 
                        value={query}
                        onChange={suggestCompanies}
                        type="text" 
                        placeholder="search company..."
                        
                    />
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </form>
            </div>
        </div>
    )
}

export default Search;