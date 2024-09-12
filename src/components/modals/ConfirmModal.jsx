import React from "react";
import AcceptButton from "../buttons/AcceptButton";
import CancelButton from "../buttons/CancelButton";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message, showOnlyAccept = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="bg-black bg-opacity-50 absolute inset-0"
                onClick={onClose}
            ></div>
            <div className="bg-[color:var(--col-yellow-light)] rounded-[1.25rem] w-[20em] p-8 z-10 shadow-lg">
                <p className="text-[color:var(--col-blue)] text-md mb-6 text-center">{message}</p>
                <div className="flex justify-center">
                {showOnlyAccept ? (
            <AcceptButton onClick={onConfirm} />
            ) : (
                <>
                <AcceptButton onClick={onConfirm} />
                <CancelButton onClick={onClose} />
                </>
            )}
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
