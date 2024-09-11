import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import uploadImageToCloudinary from "../../services/cloudinaryService";
import { apiRequest } from "../../services/apiRequest";
import { updateProfileUrl, getProfileDetailsUrl } from "../../config/urls";

import CardSample from "../cards/CardSample";
import AcceptCancelButtons from '../buttons/AcceptCancelButtons';
import EditButton from "../buttons/EditButton";
import CommonInput from '../inputs/CommonInput';
import ConfirmModal from "../modal/ConfirmModal";
import UserAvatar from '../images/UserAvatar';
import InputWithAcceptButton from '../inputs/InputWithAcceptButton';

import ImagePlaceholder from "../../../public/assets/Image-placeholder.png";

const EditProfileForm = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        district: '',
        avatarUrl: ''
    });
    
    const [isEditing, setIsEditing] = useState({ nickname: false, district: false });
    const [fileName, setFileName] = useState("Sube una imagen...");
    const [imageUrl, setImageUrl] = useState(ImagePlaceholder);
    const [isModalOpen, setModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    
    const updateProfileEndpoint = updateProfileUrl(userId);
    const getProfileEndpoint = getProfileDetailsUrl(userId);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await apiRequest(getProfileEndpoint, "GET", null, {
                    'Authorization': `Bearer ${token}`
                });
                setFormData({
                    nickname: userData.nickname,
                    email: userData.email,
                    district: userData.district,
                    avatarUrl: userData.avatarUrl || ImagePlaceholder,
                });
                setImageUrl(userData.avatarUrl || ImagePlaceholder);
            } catch (error) {
                console.error("Failed to load profile data:", error.message);
            }
        };
        fetchUserProfile();
    }, [getProfileEndpoint, token]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
    
        if (file) {
            try {
                const uploadedImageUrl = await uploadImageToCloudinary(file);
                setFileName(file.name);
                setImageUrl(uploadedImageUrl); 
                setFormData((prev) => ({ ...prev, avatarUrl: uploadedImageUrl }));
            } catch (error) {
                alert(error.message);
                setFileName("Sube una imagen...");
                e.target.value = '';
            }
        }
    };

    const handleEditClick = (field) => {
        setIsEditing((prev) => ({
            ...prev,
            [field]: true
        }));
    };

    const handleAccept = (field) => {
        // Update the formData state with the current value
        setIsEditing((prev) => ({
            ...prev,
            [field]: false,  // Exit edit mode
        }));
    
        console.log("Saved data:", formData);  // Save formData if needed
    }

    const onSubmit = async (data) => {
        const cleanedData = {
            nickname: formData.nickname.trim(),
            district: formData.district.trim(),
            avatarUrl: imageUrl,
            user: { id: userId },
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        try {
            const response = await apiRequest(updateProfileEndpoint, 'PUT', cleanedData, headers);
            console.log("API Response:", response);
            setSuccessMessage("Perfil editado con éxito!");
            setModalOpen(true);
        } catch (error) {
            console.error("API Error:", error.message);
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleCancelButtonClick = () => {
        navigate('/');
    };

    const handleConfirm = () => {
        setModalOpen(false);
        navigate('/');
    };

    return (
        <>
            <CardSample 
                className="w-[19.38em] h-[39.25em] my-[5rem] flex flex-col items-center justify-center" 
                headerText="Perfil de usuario"
            >
                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                    <UserAvatar 
                        className="size-[9.69em] m-auto mb-6"
                        imageSrc={imageUrl || ImagePlaceholder}
                    />

                    <div className='flex rounded-[1.25rem] h-[2.5rem] text-[color:var(--col-blue)] bg-[color:var(--col-yellow-light)] text-md pl-[1.063rem] shadow-inset-custom'>
                        <CommonInput
                            label="Imagen"
                            labelClassName="outline-none cursor-pointer"
                            id="image"
                            type="file"
                            placeholder="Sube una imagen..."
                            divInputClassName="w-[3.875rem] rounded-tl-[1.25rem] rounded-bl-[1.25rem] bg-[color:var(--col-blue)] ml-[-1rem] relative block"
                            imgSrc="/public/assets/File-icon.svg"
                            imgClassName='w-[1.876rem] h-[1.5rem] absolute top-[0.5rem] left-[1rem]'
                            inputClassName="hidden"
                            onInput={handleFileChange}
                            error={errors.avatarUrl?.message}
                            {...register("avatarUrl", { required: "Imagen requerida" })}
                        />
                        <p className='pl-[0.813rem] flex items-center'>
                            {fileName}
                        </p>
                    </div>

                    {/* Nickname */}
                    <div className='flex justify-between items-center mt-4'>
                        <div>
                            {isEditing.nickname ? (
                                <InputWithAcceptButton
                                    label="Nombre"
                                    id="nickname"
                                    placeholder="Escribe tu nombre.."
                                    value={formData.nickname}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, nickname: e.target.value }))} 
                                    onAccept={() => handleAccept('nickname')}
                                />
                            ) : (
                                <div className='text-md'>
                                    <p className='jaldi-bold'>Nombre</p>
                                    <p>{formData.nickname}</p>
                                </div>
                            )}
                        </div>
                        {!isEditing.nickname && (
                            <EditButton
                                onClick={() => handleEditClick('nickname')}
                                objectToModify="nombre"
                                className="size-[2.50em]"
                            />
                        )}
                    </div>

                    {/* Email (Non-editable) */}
                    <div className='mt-2 text-md'>
                        <p className='jaldi-bold'>E-mail</p>
                        <p>{formData.email}</p>
                    </div>

                    {/* District */}
                    <div className='flex justify-between items-center mt-2'>
                        <div>
                            {isEditing.district ? (
                                <InputWithAcceptButton
                                    label="Barrio"
                                    id="district"
                                    placeholder="Escribe tu barrio.."
                                    value={formData.district}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, district: e.target.value }))} 
                                    onAccept={() => handleAccept('district')} 
                                />
                            ) : (
                                <div className='text-md'>
                                    <p className='jaldi-bold'>Barrio</p>
                                    <p>{formData.district}</p>
                                </div>
                            )}
                        </div>
                        {!isEditing.district && (
                            <EditButton
                                onClick={() => handleEditClick('district')}
                                objectToModify="barrio"
                                className="size-[2.50em]"
                            />
                        )}
                    </div>

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
    );
};

export default EditProfileForm;
