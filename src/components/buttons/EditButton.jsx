import Edit from "../../../public/assets/Edit-icon.svg";
import { useNavigate } from "react-router-dom";

function EditButton({ path, objectToModify, className }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path); 
  };

  return (
    <img
      src={Edit}
      className={`cursor-pointer ${className}`}
      alt={`Ir a la página de modificación del ${objectToModify}.`}
      onClick={handleClick}
    />
  );
}

export default EditButton;
