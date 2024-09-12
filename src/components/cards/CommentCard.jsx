import React, {useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../../auth/AuthWrapper';
import { apiRequest } from "../../services/apiRequest";
import { deleteCommentUrl } from '../../config/urls'

import CardSample from "./CardSample";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import UserAvatar from "../images/UserAvatar";
import ImagePlaceholder from "../../../public/assets/Image-placeholder.png"
import ConfirmModal from "../modals/ConfirmModal";
import ErrorModal from "../modals/ErrorModal";

const CommentCard = ({comment, className, onDeleteComment }) => {
    const navigate = useNavigate();
    const { authToken, user } = useContext(AuthContext);
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
    const [isModalOpen, setModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const topic = comment.topicDTO;
    const commentId = comment.id; 

    const currentUserId = user?.id ?? ''; 
    const creatorId = comment.userCommentDTO.id ?? '';

    const isAuthenticated = Boolean(authToken);
    const isCreator = currentUserId.toString() === creatorId.toString();
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
    
        const hours = date.getHours().toString().padStart(2, '0');  
        const minutes = date.getMinutes().toString().padStart(2, '0');  
        const day = date.getDate().toString().padStart(2, '0');  
        const month = (date.getMonth() + 1).toString().padStart(2, '0');  
        const year = date.getFullYear();  
    
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    }

    const handleEditClick = () => {
        navigate(`/edit_comment/${comment.id}`, {state: {comment, topic}}); 
    };

    const handleDeleteClick = async (commentId) => {
        try {
            const headers = {
                'Authorization': `Bearer ${authToken}`,  
                'Content-Type': 'application/json'
            };
            await apiRequest(deleteCommentUrl(commentId), "DELETE",  null, headers);
            setSuccessMessage("¡Comentario eliminado con éxito!");
                setModalOpen(true);
                onDeleteComment(commentId);
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
        navigate(`/topic/${comment.topicDTO.id}`, {state: {topic}});
    };

    return (
        <>
            <CardSample showHeader={false} className={`w-[90%] flex flex-col gap-4 ${className}`}>
                <div>
                    <p className="jaldi-regular text-md text-justify">{comment.text}</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex w-[50%]">
                        <div className="size-[2.81em] relative">
                            <UserAvatar 
                            imageSrc={comment.userCommentDTO.avatarUrl ? comment.userCommentDTO.avatarUrl : ImagePlaceholder}/>
                        </div>
                        
                        <div className="ml-[1.44em]">
                            <p className="jaldi-bold">{comment.userCommentDTO.nickname}</p>
                            <p>{comment.userCommentDTO.district}</p>
                        </div>

                    </div>
                    <div className="flex flex-col flex w-[50%] items-end">
                        <p>{formatDate(comment.createdAt)}</p>

                        {isAuthenticated && isCreator && (
                            <>
                                <div className="flex gap-2 mt-2">
                                    <EditButton
                                        onClick = {handleEditClick}
                                        objectToModify="comentario"
                                        className="size-[1.67em]"/>
                                    <DeleteButton 
                                        commentId={comment.id} onDelete={handleDeleteClick}
                                        className="h-[1.67em]"/>
                                </div>
                            </>
                        )}

                        
                    </div>
                </div>
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

export default CommentCard

