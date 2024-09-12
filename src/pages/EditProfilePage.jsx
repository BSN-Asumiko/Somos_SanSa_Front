import React from 'react'
import EditProfileForm from '../components/forms/EditProfileForm'
import Navbar from '../components/navbar/Navbar'

const EditProfilePage = () => {
    return (
        <div className="w-full h-auto">
        <Navbar />
        <main className="w-full h-auto flex justify-center items-center">
            <EditProfileForm />
        </main>
        
    </div>
    )
}

export default EditProfilePage