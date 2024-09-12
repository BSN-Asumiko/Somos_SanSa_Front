import React from 'react'
import LogInForm from '../components/forms/LogInForm'
import Navbar from '../components/navbar/Navbar'

const LoginPage = () => {
    return (
        <div className="w-full h-auto">
        <Navbar />
        <main className="w-full h-auto flex justify-center items-center">
            <LogInForm />
        </main>
        
    </div>
    )
}

export default LoginPage