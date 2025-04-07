import Arrows from "/assets/Arrows-icon.svg?url";
import { useNavigate } from "react-router-dom";

const GoBackButton = ({onClick}) => {

    return (
        <button
        className="rounded-full size-[2.50em] text-[color:var(--col-yellow-light)] bg-[color:var(--col-blue)] flex items-center  justify-center"
        onClick={onClick}
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