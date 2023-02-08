import React from 'react';
import '../css/Search.css';
import { BsSearch } from 'react-icons/bs';

const Search = ({setSearchTerm}) => {

    return (
        <form className="Search">
            <input type="text" name="searchTerm" placeholder="Enter search term" onChange={(e) => setSearchTerm(e.target.value)}></input>
            <button onClick={(e) => e.preventDefault()}> <BsSearch /> </button>
        </form>
    )
}

export default Search;