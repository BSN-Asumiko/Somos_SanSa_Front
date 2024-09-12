import CardSample from "./CardSample";

import React from 'react'

const BranchCard = ({headerText, className, description, onClick}) => {
    return (
    <CardSample 
        headerText={headerText}
        className={`w-[85%] cursor-pointer ${className} `}
        onClick={onClick}>
        <p className="text-justify mt-[-1em]">{description}</p>
    </CardSample>
    )
}

export default BranchCard