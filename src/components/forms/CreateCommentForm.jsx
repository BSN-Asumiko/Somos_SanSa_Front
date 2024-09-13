import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { AuthContext } from '../../auth/AuthWrapper';
import { apiRequest } from "../../services/apiRequest";
import { ADD_NEW_COMMENT_URL } from "../../config/urls";

import CardSample from "../cards/CardSample";
import AcceptCancelButtons from '../buttons/AcceptCancelButtons';
import CommonInput from '../inputs/CommonInput';
import ConfirmModal from "../modals/ConfirmModal";
import ErrorModal from '../modals/ErrorModal';

const CreateCommentForm = ({topic}) => {

    const { authToken, user } = useContext(AuthContext);
    const userId = user.id;
    const token = authToken;
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isModalOpen, setModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });

    const onSubmit = async (data) => {
        const { text } = data;
        
        const cleanedData = {
            text: text,
            user: {
                id: userId
            },
            topic: {
                id: topic.id
            }
        };
        
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await apiRequest(ADD_NEW_COMMENT_URL, "POST", cleanedData, headers);
        
        const successMessage = "¡Nuevo comentario creado con éxito!";
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

    const handleCancelButtonClick = () => {
        navigate(`/topic/${topic.id}`, {state: {topic}});
    };

    const handleConfirm = () => {
        setModalOpen(false);
        console.log(topic.id)
        navigate(`/topic/${topic.id}`, {state: {topic}});
    };

    return (
        <>
            <CardSample 
                className="w-[19.38em] h-[auto] my-[5rem] flex flex-col items-center justify-center"
                headerText="Crear el comentario">
                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center'>

                    <div className='w-[17.50em] m-auto'>
                        <p className='jaldi-bold text-md'>Estás dentro del tema</p>
                        <p className='text-md'>{topic.title}</p>
                    </div>
                    <CommonInput
                        label="Texto"
                        id="text"
                        type="textarea"
                        placeholder="Escribe el texto del comentario..." 
                        divInputClassName="mt-4 w-full"
                        inputClassName="w-full h-auto overflow-auto" 
                        rows={8} 
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
            <ErrorModal 
                isOpen={errorModal.isOpen} 
                onClose={() => setErrorModal({ isOpen: false, message: "" })} 
                message={errorModal.message} 
            />
        </>
    )
}

export default CreateCommentForm