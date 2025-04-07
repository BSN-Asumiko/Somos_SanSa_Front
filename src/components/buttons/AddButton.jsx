import Create from "/assets/Create-icon.svg?url";

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