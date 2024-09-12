import { useNavigate } from "react-router-dom";

import CardSample from "./CardSample";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import UserAvatar from "../images/UserAvatar";


const CommentCard = ({commentText, imageSrc, userName, district, creationDate, commentId, onDelete, className}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`edit_comment/${commentId}`); 
    };

    return (
        <CardSample showHeader={false} className={`w-[90%] flex flex-col gap-4 ${className}`}>
            <div>
                <p className="jaldi-regular text-sm text-justify">{commentText}</p>
            </div>
            <div className="flex gap-4">
                <div className="flex w-[50%]">
                    <UserAvatar 
                    className="size-[2.81em]"
                    imageSrc={imageSrc}/>
                    <div className="ml-[1.44em]">
                        <p className="jaldi-bold">{userName}</p>
                        <p>{district}</p>
                    </div>

                </div>
                <div className="flex flex-col flex w-[50%] items-end">
                    <p>{creationDate}</p>
                    <div className="flex gap-2 mt-2">
                        <EditButton
                            onClick = {handleClick}
                            objectToModify="comentario"
                            className="size-[1.67em]"/>
                        <DeleteButton 
                        commentId={commentId} onDelete={onDelete}
                        className="h-[1.67em]"/>
                    </div>
                </div>
            </div>
        </CardSample>
    )
}

export default CommentCard

