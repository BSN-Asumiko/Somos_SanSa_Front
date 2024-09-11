const CardSample = ({ className, headerText, children, showHeader = true }) => {
    return (
        <div className={`border-[color:var(--col-yellow)] border-4 border-solid bg-transparent rounded-[1.25rem]  m-auto text-[color:var(--col-blue)] py-[1.19em] px-[1.13em] ${className}`}>
            {showHeader && (
                <div className="w-[90%] flex justify-center mt-[-0.8em] mb-[1.375rem] m-auto border-b-[color:var(--col-red)] border-b border-solid">
                    <h4 className="jaldi-bold text-lg [color:var(--col-red)] leading-[2.625rem] pb-[0.313rem]">
                        {headerText}
                    </h4>
                </div>
            )}
            {children}
        </div>
    );
};

export default CardSample;
