import Create from "../../../public/assets/Create-icon.svg";

const AddButton = ({onClick, objectToAdd}) => {
    return (
        <img
            src={Create}
            className="cursor-pointer w-[2.50em]"
            alt={`Añadir ${objectToAdd}.`}
            onClick={onClick}
        />
    )
}

export default AddButton