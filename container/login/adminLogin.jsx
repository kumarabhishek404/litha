import React, { useEffect, useState } from 'react'
import TextField from '../../components/input/index';
import Button from '../../components/buttons/index'
import CustomCheckbox from '../../components/checkbox';
import Link from 'next/link';
import Fade from "react-reveal/Fade";
// import * as service from '../../services/auth.service'
// import { setLocalStorage } from '../../lib/session';
import Route, { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { getCookie, setCookie } from '../../lib/session.js';
import { loginAdminApi } from '../../services/auth.service';
import { Toast } from '../../lib/global';

function LogIn() {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const auth = useSelector(state => state?.profile?.auth)
    const route = useRouter()
    const [emailAuthenticated, setEmailAuthenticated] = useState(null)
    const [passwordAuthenticated, setPasswordAuthenticated] = useState(null)
    // const [emptyState, setEmptyState] = useState(null)

    useEffect(() => {
        auth
            ? route.push('/admin/litha')
            : route.push('/admin/login')
    }, [auth])

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const authenticateEmail = (event) => {
        if ((event.target.value != '') && (event.target.value != undefined)) {
            if (event.target.value == "abhishek@gmail.com") {
                setEmailAuthenticated(true)
            } else {
                setEmailAuthenticated(false)
            }
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const authenticatePassword = (event) => {
        if ((event.target.value != '') && (event.target.value != undefined)) {
            if (event.target.value == "abhi123@") {
                setPasswordAuthenticated(true)
            } else {
                setPasswordAuthenticated(false)
            }
        }
    }

    const handleRememberChange = () => {
        setRemember(!remember)
    }

    const adminLoginHandler = (e) => {
        e.preventDefault();
        setLoading(true)
        dispatch({ type: "IS_LOADING", payload: true })
        const token = getCookie('token')
        const data = {
            userTypeCode: 1,
            userType: 'admin',
            email: email,
            password: password
        }
        loginAdminApi(data, token)
            .then(res => {
                let result = res.data
                console.log(res.data, "admin login")

                if (email && password) {
                    // if (emailAuthenticated && passwordAuthenticated) {
                    setCookie('token', result.token)
                    setCookie('refreshToken', result.refreshToken)
                    setCookie('userId', result.userId)
                    // setCookie('sessionId', result.sessionId)
                    setCookie('userType', result.userType);

                    dispatch({ type: "AUTH", payload: true })
                    setCookie('isAuthenticate', true)
                    setTimeout(() => {
                        dispatch({ type: "IS_LOADING", payload: false })
                        setLoading(false)
                        Route.push('/admin/litha')
                    }, 3000);
                    Toast('Login Success', 'Success');
                }
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
                dispatch({ type: "IS_LOADING", payload: false })
                Toast('Login Failed', 'error');
            })
    }

    return (
        <div className='login p-3 d-flex justify-content-center align-items-center'>
            <div className='login__container d-flex'>
                <div className='login__image'>
                    <img src="/images/bg-images/login__image.jpg" />
                </div>
                <div className='form__section  border d-flex flex-column align-items-center'>
                    <h2>Login </h2>
                    {/* {
                        (emptyState === false)
                            ? <p className='text-danger p-0 m-0 ml-2'>please fill all the inputs currectly</p>
                            : <></>
                    } */}
                    <Fade right distance='20%'>
                        <form className='form'>
                            <div className='input__box mb-3'>
                                <p>Email</p>
                                <TextField
                                    className="input__textField mt-2"
                                    value={email}
                                    onChange={handleEmailChange}
                                    // onBlur={authenticateEmail}
                                    name='email'
                                    type='email'
                                    id='email'
                                    placeholder='Email' />
                                {/* {
                                    (emailAuthenticated === false)
                                        ? <p className='error__msg text-danger p-0 m-0 ml-2'>this email is not exist here</p>
                                        : <></>
                                } */}
                            </div>
                            <div className='input__box mb-3'>
                                <p>Password</p>
                                <TextField
                                    className="input__textField mt-2"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    // onBlur={authenticatePassword}
                                    type='password'
                                    name='password'
                                    id='password'
                                    placeholder='Password' />
                                {/* {
                                    (passwordAuthenticated === false)
                                        ? <p className='error__msg text-danger p-0 m-0 ml-2'>may be your password is wrong</p>
                                        : <></>
                                } */}
                            </div>
                            <div className='remember__forgetPass d-flex justify-content-between px-2'>
                                <CustomCheckbox
                                    checked={remember}
                                    label="Remember Me"
                                    size='small'
                                    className='m-0 p-0'
                                    onChange={handleRememberChange}
                                />
                                <Link href='/account/forgot'>
                                    <a className='m-0 p-0'>Forgotten Password</a>
                                </Link>
                            </div>
                            <Button
                                type='submit'
                                onClick={adminLoginHandler}
                                disabled={!email || !password}
                                className='login_btn m-2'>
                                {loading ? "Loading..." : "LogIn"}
                            </Button>
                        </form>
                        <p className='error__msg text-danger p-0 m-0 ml-2'>
                            {error}
                        </p>
                    </Fade>
                </div>
            </div>
        </div>
    )
}

export default LogIn;
