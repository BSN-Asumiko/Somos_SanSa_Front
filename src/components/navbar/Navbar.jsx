
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../auth/AuthWrapper';

import Logo from "../../../public/assets/logo.png";
import Home from "../../../public/assets/Home-icon.svg";
import Logout from "../../../public/assets/Logout-icon.svg";
import Avatar from "../../../public/assets/Avatar-icon.svg";
import Login from "../../../public/assets/Login-icon.svg";

const Navbar = () => {
    const navigate = useNavigate();
    const { authToken, logout } = useContext(AuthContext);
    const userId = localStorage.getItem('userId');

    const isAuthenticated = authToken !== null;

    const gotToHome = () => navigate('/');
    const goToProfile = () => navigate(`edit_profile/${userId}`);
    const goToLogout = () => {
        logout();
        navigate('/');
    };
    const goToSignIn = () => navigate('/signin');

    return (
        <header className="w-full flex justify-between pr-[1em] border-b-[color:var(--col-blue)] border-b-2 border-solid">
            <img 
                src={Logo} 
                alt="Logo image" 
                className='w-[8.06em]'/>
            <nav className="flex">
                <img src={Home} alt="Ir a la página principal" className="w-[2.50em] cursor-pointer" onClick={gotToHome} />
                <img src={Avatar} alt="Ir a la página de perfil" className="w-[2.50em]  cursor-pointer ml-[0.4em] mr-[0.2em]" onClick={goToProfile} />
                {!isAuthenticated && (
                    <>
                        <img src={Login} alt="Ir a la página de registro" className="w-[3.1em]  cursor-pointer" onClick={goToSignIn} />
                    </>
                )}
                {isAuthenticated && (
                    <>
                        <img src={Logout} alt="Cerrar sesión de usuario" className="w-[3.1em]  cursor-pointer" onClick={goToLogout} />
                    </>
                )}

                
                
            </nav>
        </header>
    )
}

export default Navbar