import React, { useState } from 'react'
import TextField from '../../../components/input/index';
import { FormControlLabel, Radio } from '@material-ui/core';
import Fade from "react-reveal/Fade";

function RegisterScreen1(props) {

    const {
        fName,
        firstNameValidate,
        lName,
        LastNameValidate,
        handleFirstName,
        handleLastName,
        ...otherProps
    } = props


    return (
        <>
            <Fade right distance="20%">
                <div className='input__box mb-1'>
                    <p className='m-0 p-0 mt-3 required'>First Name</p>
                    <TextField
                        type={'text'}
                        className="input__textField mt-1"
                        value={fName}
                        onChange={handleFirstName}
                        type='text'
                        name="fname"
                        id='fname'
                        placeholder='First Name' />
                    {
                        (firstNameValidate === false)
                            ? <p className='error__msg text-danger p-0 m-0 ml-2'>please enter valid first name</p>
                            : <></>
                    }

                </div>
                <div className='input__box mb-1'>
                    <p className='m-0 p-0 mt-3 required'>Last Name</p>
                    <TextField
                        className="input__textField mt-1"
                        value={lName}
                        onChange={handleLastName}
                        type='text'
                        name="lname"
                        id='lname'
                        placeholder='Last Name' />
                    {
                        (LastNameValidate === false)
                            ? <p className='error__msg text-danger p-0 m-0 ml-2'>please enter valid last name</p>
                            : <></>
                    }
                </div>
            </Fade>
        </>
    )
}

export default RegisterScreen1;