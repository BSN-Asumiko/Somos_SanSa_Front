import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../../auth/AuthWrapper';
import { apiRequest } from "../../services/apiRequest";
import { ADD_NEW_TOPIC_URL } from "../../config/urls";

import CardSample from "../cards/CardSample";
import AcceptCancelButtons from '../buttons/AcceptCancelButtons';
import CommonInput from '../inputs/CommonInput';
import ConfirmModal from "../modals/ConfirmModal";
import ErrorModal from '../modals/ErrorModal';

const CreateTopicForm = ({branch}) => {

    const { authToken, user } = useContext(AuthContext);
    const userId = user?.id;
    const token = authToken;
    const navigate = useNavigate();

    const handleCancelButtonClick = () => {
        navigate(`/branch/${branch.id}`, {state: {branch}});
    };

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isModalOpen, setModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [topic, setTopic] = useState("");
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });

    const onSubmit = async (data) => {
        const { title } = data;
        
        const cleanedData = {
            title: title,
            user: {
                id: userId
            },
            branch: {
                id: branch.id
            }
        };
        
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await apiRequest(ADD_NEW_TOPIC_URL, "POST", cleanedData, headers);
            console.log("API Response:", response);
            setTopic(response);

            const successMessage = "¡Nuevo tema creado con éxito!";
            setSuccessMessage(successMessage);
            setModalOpen(true);

        } catch (error) {
            console.error("API Error:", error.message);
            setErrorModal({
                isOpen: true,
                message: `Error: ${error.message}`
            });
        }
    };


    const handleConfirm = () => {
        setModalOpen(false);
        navigate("/create_comment", {state: {topic}});
    };



    return (
        <>
            <CardSample 
                className="w-[19.38em] h-[auto] my-[5rem] flex flex-col items-center justify-center"
                headerText="Crear el tema">
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center'>

                    <div className='w-[17.50em]'>
                        <p className='jaldi-bold text-md'>Estás dentro de la sección</p>
                        <p className='text-md'>{branch.category}</p>
                    </div>

                    <CommonInput
                        label="Título"
                        id="title"
                        type="textarea"
                        placeholder="Escribe el título del tema..." 
                        divInputClassName="mt-4 w-full"
                        inputClassName="overflow-auto w-full" 
                        rows={5} 
                        error={errors.title?.message}
                        {...register("title", {
                            required: "Debes escribir un título",
                            maxLength: {
                                value: 50,
                                message: "El título no debe pasarse de más de 50 caracteres"
                            }
                        })}
                    />
                    <AcceptCancelButtons type="submit" onClickCancel={handleCancelButtonClick} className="mt-8" />
                </form>
            </CardSample>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirm}
                message={successMessage}
                showOnlyAccept={true}
            />
            <ErrorModal 
                isOpen={errorModal.isOpen} 
                onClose={() => setErrorModal({ isOpen: false, message: "" })} 
                message={errorModal.message} 
            />
        </>
    )
}

export default CreateTopicForm