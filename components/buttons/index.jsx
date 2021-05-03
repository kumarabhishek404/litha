import React from 'react';
import Button from '@material-ui/core/Button';

function index(props) {
    const {
        type = "button",
        className = '',
        id = '',
        style = {},
        children,
        onClick,
        ...otherProps
    } = props;

    return (
        <React.Fragment>
            <button
                type={type}
                className={`btn btn-default ${className}`}
                id={id || Math.random.toString()}
                onClick={onClick}
            >
                {children}
            </button>
        </React.Fragment>
    )
}

export default index
