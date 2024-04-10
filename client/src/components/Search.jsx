import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchField from './SearchField';
import Modal from "./Modal";

function Search(props){
    const { isAuthenticated, callback } = props;
    return (
        <div className="search-container">
            <div className="search-box">
                <SearchField isAuthenticated={isAuthenticated} callback={callback}/>
                <Modal/>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </div>
        </div>
    )
}

export default Search;