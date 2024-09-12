import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../auth/AuthWrapper"; 
import { LOG_IN_URL } from "../../config/urls";
import { apiRequest } from "../../services/apiRequest";

import CardSample from "../cards/CardSample";
import CommonInput from "../inputs/CommonInput";
import AcceptCancelButtons from "../buttons/AcceptCancelButtons"
import ErrorModal from "../modals/ErrorModal";
import ConfirmModal from "../modals/ConfirmModal";


const  LogInForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
    const [isModalOpen, setModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [userDTO, setUserDTO] = useState(null);


    const handleCancelButtonClick = () => {
        navigate('/'); 
    };

    const onSubmit = async (data) => {
        const { email, password } = data;
        const userData = { email, password };
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    
        try {
            const response = await apiRequest(LOG_IN_URL, "POST", userData, headers);
    
            const { token, userDTO } = response;
            console.log("API Response:", response);
    
            if (token) {
                const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token;
                login(userDTO, cleanedToken);
                setUserDTO(userDTO);

                setSuccessMessage("¡Inicio de sesión con éxito!");
                setModalOpen(true);
    
            } else {
                setErrorModal({
                    isOpen: true,
                    message: "Inicio de sesión fallido: no se recibió token."
                });
            }
        } catch (error) {
            console.error("API Error:", error);
            setErrorModal({
                isOpen: true,
                message: "El inicio de sesión fallido: el e-mail o contraseña no son válidos"
            });
        }
    };

    const handleConfirm = () => {
        setModalOpen(false);
        navigate(`/edit_profile/${userDTO.id}`);
    };
    

    return (
        <>
            <CardSample 
                className="w-[19.38em] h-[22.50em] mt-[4rem] flex flex-col items-center justify-center" 
                headerText="Acceso de usuario">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-1 flex flex-col gap-6 items-center">
                        
                        <CommonInput
                            label="E-Mail"
                            id="login_email"
                            type="email"
                            placeholder="Escribe tu e-mail..."
                            error={errors.email?.message}
                            {...register("email", {
                                required: "Debes escribir un e-mail",
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: "Correo electrónico no válido"
                                }
                            })}
                        />
                        
                        <CommonInput
                            label="Contraseña"
                            id="login_password"
                            type="password"
                            placeholder="Escribe tu contraseña..."
                            error={errors.password?.message}
                            {...register("password", {
                                required: "Debes escribir una contraseña",
                                minLength: {
                                    value: 8,
                                    message: "La contraseña debe tener al menos 8 caracteres"
                                }
                            })}
                        />
                        
                        <AcceptCancelButtons    type="submit" 
                                                onClickCancel={handleCancelButtonClick}
                                                className="mt-[1em]"/>
                    </div>
                </form>
            </CardSample>
            <ErrorModal 
                isOpen={errorModal.isOpen} 
                onClose={() => setErrorModal({ isOpen: false, message: "" })} 
                message={errorModal.message} 
            />
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleConfirm}
                message={successMessage}
                showOnlyAccept={true}
            />
        </>
        
    );
}

export default LogInForm