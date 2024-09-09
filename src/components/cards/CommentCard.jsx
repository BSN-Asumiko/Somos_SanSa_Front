import CardSample from "./CardSample";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";


const CommentCard = ({commentText, imageSrc, userName, district, creationDate, commentId, onDelete}) => {
    return (
        <CardSample showHeader={false}>
            <div>
                <p className="px-[1.13em]">{commentText}</p>
            </div>
            <div>
                <div>
                    <img
                        src={imageSrc}
                        alt="imágen de perfil de usuario"
                        className="w-[2.81em] rounded-full"
                    />
                    <div>
                        <p>{userName}</p>
                        <p>{district}</p>
                    </div>

                </div>
                <div>
                    <p>{creationDate}</p>
                    <div>
                        <EditButton path={`edit_comment/${commentId}`} objectToModify="comentario"/>
                        <DeleteButton commentId={commentId} onDelete={onDelete}/>
                    </div>
                </div>
            </div>
        </CardSample>
    )
}

export default CommentCard