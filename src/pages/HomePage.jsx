import React from 'react'
import EditProfileForm from '../components/forms/EditProfileForm';
import CommentCard from '../components/cards/CommentCard'
import ImagePlaceholder from "../../public/assets/Image-placeholder.png";
import TopicCard from '../components/cards/TopicCard';
import BranchCard from '../components/cards/BranchCard';

const HomePage = () => {
    return (
    <div>
        <EditProfileForm />
    </div>
    )
}

export default HomePage

/* 
<div>HomePage
        <CommentCard 
            commentText="Vendo lote de libros para  el 6 de Primaria, 
están escritos a lápiz, en algunos lugares hay 
marcas del boli de profe" 
            imageSrc={ImagePlaceholder} userName="Montse" district="Esglesia" creationDate="13:12 06.09.2024" commentId="2" 
            onDelete="{}" />

        <TopicCard 
            headerText="Vendo libros del 6"
            imageSrc={ImagePlaceholder}
            userName="Montse"
            commentsQuantity="2"
            creationDate="01.09.2024"
        />
        <BranchCard 
            headerText="Ocio"
        />
    </div> */