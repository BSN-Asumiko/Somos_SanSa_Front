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
import ConfirmModal from "../modals/ConfirmModal";
import ErrorModal from '../modals/ErrorModal';
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
        district: '',
        avatarUrl: ''
    });
    
    const [isEditing, setIsEditing] = useState({ nickname: false, district: false });
    const [fileName, setFileName] = useState("Sube una imagen...");
    const [imageUrl, setImageUrl] = useState(ImagePlaceholder);
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
    const [isModalOpen, setModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    
    const updateProfileEndpoint = updateProfileUrl(userId);
    const getProfileEndpoint = getProfileDetailsUrl(userId);
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await apiRequest(getProfileEndpoint, "GET", null, headers);
                setFormData({
                    nickname: userData.nickname || '',
                    district: userData.district || '',
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
                console.log(uploadedImageUrl)
                setFormData((prev) => ({ ...prev, avatarUrl: uploadedImageUrl }));
            } catch (error) {
                setErrorModal({
                    isOpen: true,
                    message: error.message
                });
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

        setIsEditing((prev) => ({
            ...prev,
            [field]: false,  
        }));  
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
            setSuccessMessage("Perfil editado con éxito!");
            setModalOpen(true);
        } catch (error) {
            console.error("API Error:", error.message);
            setErrorModal({
                isOpen: true,
                message: `Error: ${error.response?.data?.message || error.message}`
            });
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
                className="w-[19.38em] h-auto mt-[4rem] flex flex-col items-center " 
                headerText="Perfil de usuario"
            >
                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                    <div className='size-[9.69em] m-auto relative mb-6'>
                        <UserAvatar 
                            imageSrc={imageUrl || ImagePlaceholder}
                        />
                    </div>
                    

                    <div className='flex rounded-[1.25rem] h-[2.5rem]  text-[color:var(--col-blue)] bg-[color:var(--col-yellow-light)] text-md pl-[1.063rem] shadow-inset-custom'>
                        <CommonInput
                            label="img"
                            labelClassName="outline-none cursor-pointer w-[3.63em] pl-[0.2em]"
                            id="image"
                            type="file"
                            placeholder="Sube una imagen..."
                            divInputClassName=" rounded-tl-[1.25rem] w-[3.2em] rounded-bl-[1.25rem] bg-[color:var(--col-blue)] ml-[-1rem] relative block"
                            imgSrc="/public/assets/File-icon.svg"
                            imgAlt="Seleccionar una imágen de tu dispositivo"
                            imgClassName='w-[1.876rem] h-[1.5rem] absolute top-[0.5rem] left-[1rem]'
                            inputClassName="hidden"
                            onInput={handleFileChange}
                        />
                        <p className='pl-[0.813rem] flex items-center profile-text'>
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
                                    <p className='jaldi-bold profile-text'>Nombre</p>
                                    <p className='profile-text'>{formData.nickname}</p>
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

                    {/* District */}
                    <div className='flex justify-between items-center mt-4'>
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
                                    <p className='jaldi-bold profile-text'>Barrio</p>
                                    <p className='profile-text'>{formData.district}</p>
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

                    <AcceptCancelButtons type="submit" onClickCancel={handleCancelButtonClick} className="mt-10" />
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
    );
};

export default EditProfileForm;
