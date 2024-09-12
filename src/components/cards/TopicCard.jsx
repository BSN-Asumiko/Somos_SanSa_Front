import React from 'react'
import CardSample from "./CardSample";
import UserAvatar from '../images/UserAvatar';

const TopicCard = ({className, headerText, imageSrc, userName, commentsQuantity, creationDate}) => {
    return (
    <CardSample 
        headerText={headerText} 
        className={`w-[90%] ${className}`}>
        <div className='flex justify-between'>
            <UserAvatar 
                className="size-[5.00em]"
                imageSrc={imageSrc}
            />
            
            <div className='w-[50%] '>
                <p className='mb-[1.06em]'>Autor: <span className='jaldi-bold'>{userName}</span></p>
                <p>Hay <span className='jaldi-bold'>{commentsQuantity}</span> comentarios</p>
                <p>Creado: <span className='jaldi-bold'>{creationDate}</span></p>
            </div>
        </div>
        
    </CardSample>
    )
}

export default TopicCard
//ml-[1.44em]