import React from 'react'

import { useLocation } from "react-router-dom";

import Navbar from '../components/navbar/Navbar';
import CreateCommentForm from '../components/forms/CreateCommentForm';

const CreateCommentPage = () => {
    const location = useLocation(); 
    const topic = location.state?.topic;

    
    return (
    <div className="w-full h-auto">
        <Navbar />
        <main className="w-full h-auto my-6 flex flex-col justify-center items-center gap-5">

        <CreateCommentForm 
            topic={topic}
        />
        </main>
    </div>
    )
}

export default CreateCommentPage