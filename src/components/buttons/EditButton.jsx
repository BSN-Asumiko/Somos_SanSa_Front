import Edit from "../../../public/assets/Edit-icon.svg";


function EditButton({ objectToModify, className, onClick }) {
  
  return (
    <img
      src={Edit}
      className={`cursor-pointer ${className}`}
      alt={`Modificar ${objectToModify}.`}
      onClick={onClick}
    />
  );
}

export default EditButton;
