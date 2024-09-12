import React from 'react'
import CardSample from "./CardSample";
import UserAvatar from '../images/UserAvatar';

const TopicCard = ({className, headerText, imageSrc, userName, commentsQuantity, creationDate, onClick}) => {
    return (
    <CardSample 
        headerText={headerText} 
        className={`w-[90%] ${className} cursor-pointer`}
        onClick={onClick}>
        <div className='flex justify-between'>
            <div className='size-[5.00em] m-auto relative'>
                <UserAvatar 
                    imageSrc={imageSrc}
                />
            </div>
            
            
            <div className='w-[50%] '>
                <p className='mb-[1.06em]'>Autor: <span className='jaldi-bold'>{userName}</span></p>
                <p>Hay <span className='jaldi-bold'>{commentsQuantity} </span> {commentsQuantity === 1 ? "comentario" : "comentarios"} </p>
                <p>Creado: <span className='jaldi-bold'>{creationDate}</span></p>
            </div>
        </div>
        
    </CardSample>
    )
}

export default TopicCard
