import Edit from "/assets/Edit-icon.svg?url";


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
