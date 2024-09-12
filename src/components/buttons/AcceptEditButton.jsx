import Accept from "../../../public/assets/Accept-icon.svg";

const AcceptEditButton = ({onClick}) => {
    return (
    <img
        src={Accept}
        className="cursor-pointer size-[2.50em] ml-[0.69em]" 
        alt="Aceptar cambios"
        onClick={onClick}
    />
    )
}

export default AcceptEditButton
