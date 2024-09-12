import React from 'react'
import SignInForm from '../components/forms/SignInForm'
import Navbar from '../components/navbar/Navbar'

const SignInPage = () => {
    return (
    <div className="w-full h-auto">
        
        <Navbar />
        <main className="w-full h-auto flex justify-center items-center">
            <SignInForm />
        </main>
        
    </div>
    )
}

export default SignInPage