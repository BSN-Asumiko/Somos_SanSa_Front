import React, { useEffect, useState, useContext} from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../../auth/AuthWrapper';
import { apiRequest } from "../../services/apiRequest";
import { updateCommentUrl, getCommentByIdUrl } from "../../config/urls";

import CardSample from "../cards/CardSample";
import AcceptCancelButtons from '../buttons/AcceptCancelButtons';
import CommonInput from '../inputs/CommonInput';
import ConfirmModal from "../modals/ConfirmModal";

const EditCommentForm = ({ topic, comment }) => {

    const { authToken, user } = useContext(AuthContext);
    const userId = user.id;
    const token = authToken;
    const getCommentEndpoint = getCommentByIdUrl(comment.id);
    const updateCommentEndpoint = updateCommentUrl(comment.id);
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [isModalOpen, setModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Fetch existing comment data and set it in the form
    useEffect(() => {
        const fetchCommentText = async () => {
            try {
                const commentData = await apiRequest(getCommentEndpoint, "GET", null, {
                    'Authorization': `Bearer ${token}`
                });
                // Use setValue to set the fetched text in the form
                setValue('text', commentData.text);
            } catch (error) {
                console.error("Failed to load comment data:", error.message);
            }
        };
        fetchCommentText();
    }, [getCommentEndpoint, token, setValue]);

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
            const response = await apiRequest(updateCommentEndpoint, "PUT", cleanedData, headers);
            console.log("API Response:", response);
        
            const successMessage = "¡El comentario editado con éxito!";
            setSuccessMessage(successMessage);
            setModalOpen(true);

        } catch (error) {
            console.error("API Error:", error);
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleCancelButtonClick = () => {
        navigate(`/topic/${topic.id}`, {state: {topic}});
    };

    const handleConfirm = () => {
        setModalOpen(false);
        navigate(`/topic/${topic.id}`, {state: {topic}});
    };

    return (
        <>
            <CardSample 
                className="w-[19.38em] h-[auto] my-[5rem] flex flex-col items-center justify-center"
                headerText="Editar el comentario">
                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center'>

                    <div className='w-[17.50em]'>
                        <p className='jaldi-bold text-md'>Estás dentro del tema</p>
                        <p className='text-md'>{topic.title}</p>
                    </div>

                    <CommonInput
                        label="Texto"
                        id="text"
                        type="textarea"
                        divInputClassName="mt-4 w-full"
                        inputClassName="overflow-auto w-full h-auto" 
                        rows={8}
                        error={errors.text?.message}
                        {...register("text", {
                            required: "El comentario no puede estar vacío",
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

export default EditCommentForm;
