import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GET_ALL_BRANCHES_URL } from '../config/urls';
import { apiRequest } from '../services/apiRequest';

import BranchCard from '../components/cards/BranchCard';
import Navbar from '../components/navbar/Navbar';
import ErrorModal from '../components/modals/ErrorModal';

const HomePage = () => {
    const navigate = useNavigate();
    const [branchesData, setBranchesData] = useState([]); 
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });

    const fetchBranches = async () => {
        try {
            const data = await apiRequest(GET_ALL_BRANCHES_URL, 'GET');
            setBranchesData(data); 
        } catch (error) {
            console.error("API Error:", error.message);
            setErrorModal({
                isOpen: true,
                message: `Error: ${error.message}`
            });
        }
    };

    useEffect(() => {
        fetchBranches(); 
    }, []);

    const handleClick = (branchId) => {
        navigate(`/branch/${branchId}`);
    };

    return (
        <div className="w-full h-auto">
            <Navbar />
            <main className="w-full h-auto my-6 flex flex-col justify-center items-center gap-5">
                <h1 className="jaldi-bold text-lg text-[color:var(--col-red)]">¡Bienvenidos al foro Somos SanSa!</h1>
                {branchesData.map((branch) => (
                    <BranchCard 
                        key={branch.id} 
                        headerText={branch.category}
                        description={branch.description}
                        onClick={() => handleClick(branch.id)} 
                    />
                ))}
            </main>
            
            <ErrorModal 
                isOpen={errorModal.isOpen} 
                onClose={() => setErrorModal({ isOpen: false, message: "" })} 
                message={errorModal.message} 
            />
        </div>
    );
};

export default HomePage;
