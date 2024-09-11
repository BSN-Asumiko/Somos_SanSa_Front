import React from 'react'
import CreateTopicForm from '../components/forms/CreateTopicForm'

const HomePage = () => {
    return (
    <div>
        < CreateTopicForm />
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