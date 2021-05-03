import React from 'react';
const Input = (props) => {
    const {
        type="text",
        value="",
        onClick,
        onBlur,
        className="",
        style={},
        name,
        id,
        placeholder,
        ...otherProps
     } = props;
    return (
        <input 
            type={type || 'text'} 
            name={name || "text-input"} 
            id={id || Math.random.toString()}
            value={value}
            onClick={onClick}
            onBlur={onBlur}
            className={`cus_class ${className || ""}`}
            placeholder={placeholder || 'Enter something'}
            {...otherProps}
            />
    )
}

export default Input
