import React, { useState } from 'react'
import TextField from '../../../components/input/index';
import Fade from "react-reveal/Fade";
import Loader from '../../../components/loader/clipLoader';

function RegisterScreen2(props) {

    const {
        email,
        emailValidate,
        emailChecking,
        emailChecked,
        checkEmailExistance,
        password,
        passwordValidate,
        confirmPassword,
        confirmPasswordValidate,
        handleEmail,
        validateEmail,
        handlePassword,
        handleConfirmPassword,
        validateConfirmPassword,
        ...otherProps
    } = props

    return (
        <>
            <Fade right distance="20%">
                <div className='input__box mb-1'>
                    <p className='m-0 p-0 mt-3 required'>Email</p>
                    <div className='email__input__box'>
                        <div className='email__input__box__loader' style={{ display: emailChecking ? "block" : 'none' }}>
                            <Loader />
                        </div>
                        <TextField
                            className="input__textField mt-1"
                            value={email}
                            onChange={handleEmail}
                            onBlur={checkEmailExistance}
                            type='email'
                            name="email"
                            id='email'
                            placeholder='Email' />
                    </div>
                    {
                        (emailValidate === false)
                            ? <p className='error__msg text-danger p-0 m-0 ml-2'>please enter valid email address</p>
                            : <></>
                    }
                    {
                        (emailChecked === false)
                            ? <p className='error__msg text-danger p-0 m-0 ml-2'>this email is already exist...</p>
                            : <></>
                    }
                </div>
                <div className='input__box mb-1'>
                    <p className='m-0 p-0 mt-3 required'>Password</p>
                    <TextField
                        className="input__textField mt-1"
                        value={password}
                        onChange={handlePassword}
                        type='password'
                        name="password"
                        id='password'
                        placeholder='Password' />
                    {
                        (passwordValidate === false)
                            ? <p className='error__msg text-danger p-0 m-0 ml-2'>please enter valid password</p>
                            : <></>
                    }
                </div>
                <div className='input__box mb-1'>
                    <p className='m-0 p-0 mt-3 required'>Confirm Password</p>
                    <TextField
                        className="input__textField mt-1"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        type='password'
                        name="confirmPassword"
                        id='confirmPassword'
                        placeholder='Confirm Password' />
                    {
                        (confirmPasswordValidate === false)
                            ? <p className='error__msg text-danger p-0 m-0 ml-2'>it should be matched with password</p>
                            : <></>
                    }
                </div>
            </Fade>
        </>
    )
}

export default RegisterScreen2;