import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { getCommentsByTopicUrl } from '../config/urls';
import { apiRequest } from '../services/apiRequest';

import Navbar from '../components/navbar/Navbar';
import SearchInputGroup from '../components/inputs/SearchInputGroup';
import ErrorModal from "../components/modals/ErrorModal";
import CommentCard from '../components/cards/CommentCard';

const TopicPage = () => {

    const navigate = useNavigate();

    const location = useLocation(); 
    const topicData = location.state?.topic;
    const topicId = topicData.id;

    const getCommentsUrl = getCommentsByTopicUrl(topicId);

    const [commentsData, setCommentsData] = useState([]);
    const [filteredComments, setFilteredComments] = useState([]);
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
    const [searchQuery, setSearchQuery] = useState("");

    const fetchComments = async () => {
        try {
            const data = await apiRequest(getCommentsUrl, 'GET');
            setCommentsData(data);
            setFilteredComments(data);
        } catch (error) {
            console.error("API Error:", error.message);
            setErrorModal({
                isOpen: true,
                message: `Error: ${error.message}`
            });
        }
    }

    useEffect(() => {
        fetchComments();
    }, []);

    useEffect(() => {
        const filtered = commentsData.filter(comment =>
            comment.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.userCommentDTO.nickname.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredComments(filtered);
    }, [searchQuery, commentsData]);


    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const handleGoBackClick = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/");  // Fallback to homepage if no history
        }
    };

    const handleAddClick = () => {
        navigate('/create_comment'); 
    }

    if (filteredComments.length === 0) {
        return (
            <div className="w-full h-auto">
                <Navbar />
                <main className="w-full h-auto my-6 flex flex-col justify-center items-center gap-5">
                    <div className="w-[65%]  h-[2.75em] flex justify-center border-b-custom">
                        <h2 className="jaldi-bold text-lg text-[color:var(--col-green)]">{topicData.title}</h2>
                    </div>

                    <SearchInputGroup 
                        onClickBack={handleGoBackClick}
                        onClickAdd={handleAddClick}
                        objectToAdd="un comentario nuevo"
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                    />

                    <h2 className="w-[80%] my-[2em] jaldi-bold text-lg text-[color:var(--col-red)] text-center">Todavía no hay ningún commentario creado en ese tema, puedes crear primer</h2>
                </main>
            </div>
        )
    }

    return (
        <div className="w-full h-auto">
            <Navbar />

            <main className="w-full h-auto my-6 flex flex-col justify-center items-center gap-5">

                    <div className="w-[65%]  h-[2.75em] flex justify-center border-b-custom">
                        <h2 className="jaldi-bold text-lg text-[color:var(--col-green)]">{topicData.title}</h2>
                    </div>

                    <SearchInputGroup 
                        onClickBack={handleGoBackClick}
                        onClickAdd={handleAddClick}
                        objectToAdd="un comentario nuevo"
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                    />

                    {filteredComments.map((comment) => (
                        <>
                            <CommentCard 
                                key={comment.id}
                                comment={comment}                                
                            />
                        </>
                    ))}
            </main>

            <ErrorModal 
                isOpen={errorModal.isOpen} 
                onClose={() => setErrorModal({ isOpen: false, message: "" })} 
                message={errorModal.message} 
            />
        </div>
    )
}

export default TopicPage
