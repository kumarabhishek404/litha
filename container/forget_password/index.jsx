import React, { useState } from 'react'
import TextField from '../../components/input/index';
import Button from '../../components/buttons/index'
import Link from 'next/link';
import Fade from "react-reveal/Fade";
import Route from 'next/router';

function LogIn() {
    const [email, setEmail] = useState('')
    const [emailChecked, setEmailChecked] = useState(true)

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const checkedEmail = (event) => {
        if ((event.target.value != '') && (event.target.value != undefined)) {
            console.log(typeof event.target.value, 'value');
            if (event.target.value == "abhishek@gmail.com") {
                setEmailChecked(true)
            } else {
                setEmailChecked(false)
            }
        }
    }



    const resetPasswordHandler = (e) => {
        e.preventDefault()
        if (emailChecked) {
            Route.push('/account/login')
            // window.location.href = '/account/login'
        }
    }

    return (
        <div className='login p-3 d-flex justify-content-center align-items-center'>
            <div className='login__container d-flex'>
                <div className='login__image'>
                    <img src="/images/bg-images/login__image.jpg" />
                </div>
                <div className='form__section  border d-flex flex-column align-items-center'>
                    <h2>Forgotten Password </h2>
                    <Fade right distance='20%'>
                        <form className='form'>
                            <div className='input__box mb-3'>
                                <p>Recovery Email</p>
                                <TextField
                                    className="input__textField mt-2"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={checkedEmail}
                                    type='email'
                                    id='email'
                                    placeholder='Email' />
                                {
                                    !emailChecked
                                        ? <p className='error__msg text-danger p-0 m-0 ml-2'>this email is not exist here</p>
                                        : <></>
                                }
                            </div>

                            <Button
                                type='submit'
                                onClick={resetPasswordHandler}
                                className='login_btn'>
                                Password Reset
                        </Button>
                            <div className='other_links text-right'>
                                <Link href='/account/login'>
                                    <a className='p-0 m-0 mx-1'>go to login</a>
                                </Link>
                            </div>
                        </form>
                    </Fade>
                </div>
            </div>
        </div>
    )
}

export default LogIn;
