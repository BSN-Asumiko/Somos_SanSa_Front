import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { apiRequest } from "../../services/apiRequest";
import { ADD_NEW_COMMENT_URL } from "../../config/urls";

import CardSample from "../cards/CardSample";
import AcceptCancelButtons from '../buttons/AcceptCancelButtons';
import CommonInput from '../inputs/CommonInput';
import ConfirmModal from "../modals/ConfirmModal";

const CreateCommentForm = ({topicName, topicId}) => {

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    const handleCancelButtonClick = () => {
        navigate(`/topic/${topicId}`);
    };

    const handleConfirm = () => {
        setModalOpen(false);
        navigate(`/topic/${topicId}`);
    };

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isModalOpen, setModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit = async (data) => {
        const { text } = data;
        
        const cleanedData = {
            text: text,
            user: {
                id: userId
            },
            topic: {
                id: topicId
            }
        };
        
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await apiRequest(ADD_NEW_COMMENT_URL, POST, cleanedData, headers);
            console.log("API Response:", response);
        
        const successMessage = "¡Nuevo comentario creado con éxito!";
        setSuccessMessage(successMessage);
        setModalOpen(true);

        } catch (error) {
            console.error("API Error:", error);
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };


    return (
        <>
            <CardSample 
                className="w-[19.38em] h-[auto] my-[5rem] flex flex-col items-center justify-center"
                headerText="Crear el comentario">
                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center'>

                    <div className='w-[17.50em]'>
                        <p className='jaldi-bold text-md'>Estás dentro del tema</p>
                        <p className='text-md'>{topicName}Vendo libros de 6</p>
                    </div>
                    <CommonInput
                        label="Texto"
                        id="text"
                        type="textarea"
                        placeholder="Escribe el título del tema..." 
                        divInputClassName="mt-4"
                        inputClassName="overflow-auto" 
                        rows={10} 
                        error={errors.text?.message}
                        {...register("text", {
                            required: "El comentario no puede estar vacio",
                            maxLength: {
                                value: 2000,
                                message: "El comentario no debe pasarse de más de 2000 caracteres"
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
        </>
    )
}

export default CreateCommentForm