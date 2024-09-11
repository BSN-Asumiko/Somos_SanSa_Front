import AcceptEditButton from "../buttons/AcceptEditButton";

const InputWithAcceptButton = ({label, id, placeholder, value, onChange, onAccept}) => {
    return (
        <div className="flex flex-col">
            <label
                htmlFor={id}
                className="jaldi-bold text-md text-[color:var(--col-blue)] leading-[2.063rem] w-full"
            >
                {label}
            </label>
            <div className="flex">
                <input
                    id={id}
                    className="custom-input rounded-[1.25rem] w-[11em] h-[2.5rem] m-auto jaldi-regular text-[color:var(--col-blue)] bg-[color:var(--col-yellow-light)] text-md pl-[1.063rem] shadow-inset-custom border-0 focus:border-2 focus:border-[color:var(--col-green)] outline-none"
                    placeholder={placeholder}
                    type="text"
                    value={value}
                    onChange={onChange} 
                />
                <AcceptEditButton onClick={() => onAccept()} />
            </div>
        </div>
    )
}

export default InputWithAcceptButton;
