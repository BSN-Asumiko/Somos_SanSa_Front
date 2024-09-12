import { forwardRef } from 'react';

const CommonInput = forwardRef(({
    onClick,
    label,
    labelClassName,
    id,
    placeholder,
    type = 'text', 
    divInputClassName,
    divSearchClassName,
    inputClassName,
    imgSrc,
    imgAlt,
    imgClassName,
    error,
    rows,
    onInput, 
    onChange,
    value,
    ...rest
}, ref) => {
    return (
        <div className={`w-full flex flex-col ${divInputClassName}`}>
            <label
                htmlFor={id}
                className={`jaldi-bold text-md text-[color:var(--col-blue)] leading-[2.063rem] w-full ${labelClassName}`}
            >
                {label}
            </label>
            <div className={`rounded-[1.25rem] w-full bg-[color:var(--col-yellow-light)] jaldi-regular flex items-center ${divSearchClassName}`}>
                {type === 'textarea' ? (
                    <textarea
                        id={id}
                        className={`custom-input rounded-[1.25rem] h-[5.94em] text-[color:var(--col-blue)] bg-[color:var(--col-yellow-light)] text-md p-[1.063rem] shadow-inset-custom border-0 focus:border-2 focus:border-[color:var(--col-green)] outline-none ${inputClassName}`}
                        placeholder={placeholder}
                        rows={rows}
                        ref={ref}
                        value={value}
                        onChange={onChange}
                        {...rest}
                    />
                ) : (
                    <input
                        id={id}
                        className={`custom-input rounded-[1.25rem] w-full h-[2.5rem] text-[color:var(--col-blue)] bg-[color:var(--col-yellow-light)] text-md pl-[1.063rem] shadow-inset-custom border-0 focus:border-2 focus:border-[color:var(--col-green)] outline-none ${inputClassName}`}
                        placeholder={placeholder}
                        type={type}
                        ref={ref}
                        value={value}
                        onInput={onInput} 
                        onChange={onChange}
                        {...rest}
                    />
                )}
                {imgSrc && (
                    <img
                        src={imgSrc}
                        alt={imgAlt}
                        className={imgClassName}
                        onClick={onClick}
                        style={{ pointerEvents: 'none' }}
                    />
                )}
            </div>

            {error && (
                <p className="text-[color:var(--col-red)] jaldi-regular text-sm mb-[-1.25rem]">{error}</p>
            )}
        </div>
    );
});

export default CommonInput;
