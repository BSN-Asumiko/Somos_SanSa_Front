import CardSample from "./CardSample";

import React from 'react'

const BranchCard = ({headerText, className, description}) => {
    return (
    <CardSample 
        headerText={headerText}
        className={className}>
        <p className="text-justify mt-[-1em]">Espacio dedicado a todo lo relacionado con la vida cultural y social de SanSa, ideal para encontrar y compartir eventos, actividades y hacer nuevas amistades.</p>
    </CardSample>
    )
}

export default BranchCard