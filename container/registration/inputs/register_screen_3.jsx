import React, { useState } from 'react'
import TextField from '../../../components/input/index';
import Fade from "react-reveal/Fade";
import CountryCode from '../../../components/countryCode/index';

function RegisterScreen3(props) {

    const {
        mobile,
        handleMobile,
        mobileValidate,
        ...otherProps
    } = props

    return (
        <>
            <Fade right distance="20%">
                <div className='input__box mb-1'>
                    <p className='m-0 p-0 mt-3'>Phone</p>
                    <div className='country__code__container'>
                        <CountryCode
                            className="input__textField__code mt-1"
                            defaultCountry="GB"
                            value={mobile}
                            onChange={handleMobile}
                            type='mobile'
                            name="mobile"
                            id='mobile'
                            placeholder='Phone Number' />
                    </div>
                    {/* <TextField
                        className="input__textField mt-1"
                        value={mobile}
                        onChange={handleMobile}
                        type='mobile'
                        name="mobile"
                        id='mobile'
                        placeholder='Phone Number' /> */}
                    {
                        (mobileValidate === false)
                            ? <p className='error__msg text-danger p-0 m-0 ml-2'>please enter valid mobile number</p>
                            : <></>
                    }
                </div>
            </Fade>
        </>
    )
}

export default RegisterScreen3;