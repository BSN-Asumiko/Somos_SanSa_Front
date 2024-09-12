import React from 'react'

const UserAvatar = ({imageSrc, className}) => {
    return (
        <>
            <img
                src={imageSrc}
                alt="imágen de perfil de usuario"
                className="absolute inset-0 w-full h-full object-cover rounded-full"
            />
        </>
    )
}

export default UserAvatar