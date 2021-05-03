import React, { useState } from "react";
import ReactDOM from "react-dom";
// import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

// import "./styles.css";

function CountryCode(props) {

    const {
        className,
        defaultCountry,
        value,
        onChange,
        type,
        name,
        id,
        placeholder,
        ...otherProps
    } = props;

    const [inputValue, setInputValue] = useState("");

    return (
        <div className="">
            <PhoneInput
                placeholder={placeholder}
                defaultCountry={defaultCountry}
                className={className}
                value={value}
                // value={inputValue}
                // onChange={inputValue => setInputValue(inputValue)}
                onChange={onChange}
            />
        </div>
    );
}

export default CountryCode;