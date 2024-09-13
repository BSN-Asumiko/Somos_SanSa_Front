import React from 'react'
import { useLocation } from "react-router-dom";

import Navbar from '../components/navbar/Navbar';
import CreateTopicForm from '../components/forms/CreateTopicForm';


const CreateTopicPage = () => {
    const location = useLocation(); 
    const branchData = location.state?.branchData;

    return (
    <div  className="w-full h-auto">
        <Navbar />

        <main className="w-full h-auto my-6 flex flex-col justify-center items-center gap-5">
            <CreateTopicForm 
                branch={branchData}
            />

        </main>
    </div>
    )
}

export default CreateTopicPage