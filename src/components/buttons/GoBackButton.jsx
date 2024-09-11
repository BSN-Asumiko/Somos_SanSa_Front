import Arrows from "../../../public/assets/Arrows-icon.svg";
import { useNavigate } from "react-router-dom";

const GoBackButton = ({path}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(path); 
    };

    return (
        <button
        className="rounded-full w-[2.50em] h-[2.50em] text-[color:var(--col-yellow-light)] bg-[color:var(--col-blue)] flex items-center  justify-center"
        onClick={handleClick}
        
        >
        <img
        src={Arrows}
        alt="Volver a la página anterior"
        className="w-[1.563rem] h-[1.563rem] rotate-180 mr-[0.3em]"
    />
    </button>
    )
}

export default GoBackButton