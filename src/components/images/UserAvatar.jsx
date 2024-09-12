import React from 'react'

const UserAvatar = ({imageSrc, className}) => {
    return (
        <>
            <img
                src={imageSrc}
                alt="imágen de perfil de usuario"
                className={`rounded-full ${className}`}
            />
        </>
    )
}

export default UserAvatar