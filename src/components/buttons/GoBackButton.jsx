import Arrows from "../../../public/assets/Arrows-icon.svg";
import { useNavigate } from "react-router-dom";

const GoBackButton = ({path}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(path); 
    };

    return (
        <button
        className="rounded-[1.25rem] w-[40px] h-[40px] text-[color:var(--col-yellow-light)] bg-[color:var(--col-blue)] flex items-center pl-[1.063rem] focus:opacity-[0.85] active:opacity-[0.85]"
        onClick={handleClick}
        
        >
        <img
        src={Arrows}
        alt="Volver a la página anterior"
        className="w-[1.563rem] h-[1.563rem]"
    />
    </button>
    )
}

export default GoBackButton