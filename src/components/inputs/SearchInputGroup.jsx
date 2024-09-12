import React, {useContext} from "react";

import { AuthContext } from '../../auth/AuthWrapper';

import Glass from "../../../public/assets/Glass-icon.svg";
import CommonInput from './CommonInput'
import GoBackButton from '../buttons/GoBackButton'
import AddButton from '../buttons/AddButton'

const SearchInputGroup = ({onClickBack, objectToAdd, onClickAdd, onSearchChange, className, searchQuery}) => {

    const { authToken } = useContext(AuthContext);
    const isAuthenticated = authToken !== null;

    const handleSearchChange = (e) => {
        const query = e.target.value;
        onSearchChange(query);
    };

    return (
        <div className={`w-[90%] m-auto flex justify-between ${className}`}>
            <div className="flex gap-[0.5em]">
                <GoBackButton onClick={onClickBack}/>
                {isAuthenticated &&  (
                    <>
                        <AddButton objectToAdd={objectToAdd} onClick={onClickAdd}/>
                    </>
                )}
            </div>
            
            <CommonInput
                id="search"
                type="text"
                onChange={handleSearchChange}
                value={searchQuery}
                placeholder="Buscar..."
                divInputClassName="w-[68%]"
                divSearchClassName="relative"
                imgSrc={Glass}
                imgClassName="absolute right-6 h-5 w-5"
            />
        </div>
    )
}

export default SearchInputGroup;
