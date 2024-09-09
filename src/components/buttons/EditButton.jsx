import Edit from "../../../public/assets/Edit-icon.svg";
import { useNavigate } from "react-router-dom";

function EditButton({ path, objectToModify }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path); 
  };

  return (
    <img
      src={Edit}
      className="h-[2.5rem] w-[2.5rem] cursor-pointer"
      alt={`Ir a la página de modificación del ${objectToModify}.`}
      onClick={handleClick}
    />
  );
}

export default EditButton;
