import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { getTopicsByBranchUrl } from '../config/urls';
import { apiRequest } from '../services/apiRequest';

import Navbar from '../components/navbar/Navbar';
import SearchInputGroup from '../components/inputs/SearchInputGroup';
import ErrorModal from "../components/modals/ErrorModal";
import TopicCard from "../components/cards/TopicCard";
import ImagePlaceholder from "../../public/assets/Image-placeholder.png"

const BranchPage = () => {

    const navigate = useNavigate();

    const location = useLocation(); 
    const branchData = location.state?.branch; 
    const branchId = branchData.id;

    const getTopicsUrl = getTopicsByBranchUrl(branchId);

    const [topicsData, setTopicsData] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
    const [searchQuery, setSearchQuery] = useState("");

    const fetchTopics = async () => {
        try {
            const data = await apiRequest(getTopicsUrl, 'GET');
            setTopicsData(data);
            setFilteredTopics(data);
        } catch (error) {
            console.error("API Error:", error.message);
            setErrorModal({
                isOpen: true,
                message: `Error: ${error.message}`
            });
        }
    }

    useEffect(() => {
        fetchTopics();
    }, []);

    useEffect(() => {
        const filtered = topicsData.filter(topic =>
            topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.userTopicDTO.nickname.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTopics(filtered);
    }, [searchQuery, topicsData]);

    const handleClick = (topic) => {
        navigate(`/topic/${topic.id}`, { state: { topic } });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const handleGoBackClick = () => {
        navigate('/'); 
    }; 
    const handleAddClick = () => {
        navigate('/create_topic'); 
    }

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    return (
    <div className="w-full h-auto">
        <Navbar />
        <main className="w-full h-auto my-6 flex flex-col justify-center items-center gap-5">
            <div className="w-full flex flex-col items-center">
                <div className="w-[65%]  h-[2.75em] flex justify-center border-b-custom">
                    <h2 className="jaldi-bold text-lg text-[color:var(--col-green)]">{branchData.category}</h2>
                </div>
                <p className="w-[85%]  mt-3 jaldi-regular text-sm text-[color:var(--col-blue)] text-center">{branchData.description}</p>
            </div>
            

            <SearchInputGroup 
                onClickBack={handleGoBackClick}
                onClickAdd={handleAddClick}
                objectToAdd="un tema nuevo"
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
            />

            {filteredTopics.map((topic) => (
                <TopicCard 
                    key={topic.id}
                    headerText={topic.title}
                    imageSrc={topic.userTopicDTO.avatarUrl ? topic.userTopicDTO.avatarUrl : ImagePlaceholder}
                    userName={topic.userTopicDTO.nickname}
                    commentsQuantity={topicsData.length}
                    creationDate={formatDate(topic.createdAt)}
                    onClick={() => handleClick(topic)}
                />
            ))

            }
        </main>

        <ErrorModal 
                isOpen={errorModal.isOpen} 
                onClose={() => setErrorModal({ isOpen: false, message: "" })} 
                message={errorModal.message} 
        />
    </div>
    )
}

export default BranchPage
