import React from 'react'
const TextInput = (props) => {
    const {handleChange,classes, required, error, ...otherProps} = props;
    return (
        <input 
            className={`form-text-input mx-0 ${classes} ${error ? 'invalid' : ''}` } 
            onChange={(e)=>handleChange(e.target.value)}
            {...otherProps} />
    )
}

export default TextInput;
