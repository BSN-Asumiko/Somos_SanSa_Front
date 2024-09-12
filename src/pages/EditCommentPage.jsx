import React from 'react'
import { useLocation } from "react-router-dom";

import Navbar from '../components/navbar/Navbar';
import EditCommentForm from "../components/forms/EditCommentForm"

const EditCommentPage = () => {

    const location = useLocation(); 
    const topic = location.state?.topic;
    const comment = location.state?.comment;

    return (
        <div className="w-full h-auto">
            <Navbar />
            <main className="w-full h-auto my-6 flex flex-col justify-center items-center gap-5">

            <EditCommentForm
                comment={comment} 
                topic={topic}
            />
            </main>
        </div>
    )
}

export default EditCommentPage