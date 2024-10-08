import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { SIGN_IN_URL } from "../../config/urls";
import { apiRequest } from "../../services/apiRequest";
import CardSample from "../../components/cards/CardSample";
import CommonInput from "../inputs/CommonInput";
import AcceptCancelButtons from "../buttons/AcceptCancelButtons"
import ErrorModal from "../modals/ErrorModal";
import ConfirmModal from "../modals/ConfirmModal";


const SignInForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
    const [isModalOpen, setModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleCancelButtonClick = () => {
        navigate('/'); 
    };

    const handleLoginClick = () => {
        navigate('/login'); 
    };


    const onSubmit = async (data) => {
        const { nickname, email, password } = data;
        
        const cleanedData = {
            nickname: nickname.trim(),
            email: email.trim().toLowerCase(), 
            password: password.trim()
        };

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        try {
            const response = await apiRequest(SIGN_IN_URL, "POST", cleanedData, headers);
            setSuccessMessage("Usuario registrado con éxito!");
            setModalOpen(true);
        } catch (error) {
            setErrorModal({
                isOpen: true,
                message: error.message
            });
        }
    };

    const handleConfirm = () => {
        setModalOpen(false);
        navigate('/login');
    };

    return (
        <>
            <CardSample className="w-[19.38em] h-[32.69em] mt-[4rem] flex flex-col items-center justify-center" headerText="Registro de usuario">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-1 flex flex-col gap-6 items-center">
                        <CommonInput
                            label="Nombre"
                            id="nickname"
                            type="text"
                            placeholder="Escribe tu nombre..."
                            error={errors.nickname?.message}
                            {...register("nickname", { required: "Debes escribir un nombre" })}
                        />

                        <CommonInput
                            label="E-Mail"
                            id="signin_email"
                            type="text"
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
                            id="signin_password"
                            type="password"
                            placeholder="Escribe tu contraseña..."
                            error={errors.password?.message}
                            {...register("password", {
                                required: "Debes escribir una contraseña",
                                minLength: {
                                    value: 8,
                                    message: "La contraseña debe tener al menos 8 caracteres"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: "La contraseña debe incluir al menos una letra mayúscula, una letra minúscula y un número"
                                }
                            })}
                        />

                        <AcceptCancelButtons    type="submit" 
                                                onClickCancel={handleCancelButtonClick}
                                                className="mt-[1.5em]"/>

                        
                    </div>

                    <p className="mt-6 text-center jaldi-bold text-md text-[color:var(--col-blue)]">
                        ¿Ya tienes cuenta? Accede{" "}
                        <span 
                            onClick={handleLoginClick} 
                            className="text-[color:var(--col-green)] cursor-pointer underline">
                                aquí
                        </span>
                    </p>
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

export default SignInForm