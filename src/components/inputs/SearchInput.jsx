
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Glass from "../../../public/assets/Glass-icon.svg";
import CommonInput from './CommonInput'
import GoBackButton from '../buttons/GoBackButton'
import AddButton from '../buttons/AddButton'

const SearchInput = ({path, objectToAdd, handleAddFunction, className}) => {

    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        //filter function
    };
    

    return (
    <div className={`w-[90%] m-auto flex justify-between ${className}`}>
        <div className="flex gap-3">
            <GoBackButton path={path}/>
            <AddButton objectToAdd={objectToAdd} onClick={handleAddFunction}/>
        </div>
        
        <CommonInput
            id="search"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            divInputClassName="w-[72%]"
            divSearchClassName="relative"
            imgSrc={Glass}
            imgClassName="absolute right-6 h-5 w-5"
        />
    </div>
    )
}

export default SearchInput