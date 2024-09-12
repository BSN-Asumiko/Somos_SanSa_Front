import React, { useState } from 'react';
import Delete from "../../../public/assets/Delete-icon.svg";
import ConfirmModal from '../modal/ConfirmModal'; 

function DeleteButton({ commentId, onDelete, className }) {

  const [isModalOpen, setModalOpen] = useState(false);
  
  const handleDelete = () => {
    setModalOpen(true); 
  };

  const handleConfirm = async () => {
    setModalOpen(false);

    try {

      onDelete(commentId);

    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };

  const handleCancel = () => {
    setModalOpen(false); 
  };

  return (
    <>
      <img
        src={Delete}
        className={`cursor-pointer ${className}`}
        onClick={handleDelete} 
        alt="Eliminar el comentario"
      />
      <ConfirmModal 
        isOpen={isModalOpen} 
        message={"¿Quieres eliminar este destino?"}
        onConfirm={handleConfirm}  
        onClose={handleCancel}  
      />
    </>
  );
}

export default DeleteButton;

//h-[2.5rem] w-[1.917rem]