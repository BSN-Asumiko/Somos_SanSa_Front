import React from 'react'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { ADD_NEW_TOPIC_URL } from '../config/urls';
import { apiRequest } from '../services/apiRequest';

import Navbar from '../components/navbar/Navbar';
import CreateTopicForm from '../components/forms/CreateTopicForm';
import ErrorModal from "../components/modals/ErrorModal";
import ConfirmModal from '../components/modals/ConfirmModal';

const CreateTopicPage = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const branchData = location.state?.branchData;

    return (
    <div  className="w-full h-auto">
        <Navbar />

        <main className="w-full h-auto my-6 flex flex-col justify-center items-center gap-5">
            <CreateTopicForm 
                branchName={branchData.category}
                branchId={branchData.id}
            />

        </main>
    </div>
    )
}

export default CreateTopicPage