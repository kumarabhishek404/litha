import React, { useEffect, useState } from 'react'
import TextField from '../../components/input/index';
import Button from '../../components/buttons/index'
import CustomCheckbox from '../../components/checkbox';
import Link from 'next/link';
import Fade from "react-reveal/Fade";
import * as service from '../../services/auth.service'
import { getCookie } from '../../lib/session';
import Route, { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { setCookie } from '../../lib/session';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/loader/loader'
import Notification from '../../components/notification/index'
import { Toast } from '../../lib/global';


function LogIn() {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('')
    const auth = useSelector(state => state?.profile?.auth)
    const [loading, setLoading] = useState(false);
    const route = useRouter()
    const [isErrorLogin, setIsErrorLogin] = useState(false);
    const [isSuccessLogin, setIsSuccessLogin] = useState(false);
    const [open, setOpen] = useState(true);
    // const [emailAuthenticated, setEmailAuthenticated] = useState(null)
    // const [passwordAuthenticated, setPasswordAuthenticated] = useState(null)
    // const [emptyState, setEmptyState] = useState(null)

    // useSelector(state => {
    //     console.log(state)
    // })

    const notify = (<Notification isNoti={true} />)

    function notification() {
        return notify
    }


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

    const handleClose = (event) => {
        setOpen(false);
    };


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

    // const custAlert = () => {
    //     return (
    //         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    //             <Alert onClose={handleClose} severity="success">
    //                 This is a success message!
    //         </Alert>
    //         </Snackbar>
    //     )
    // }

    const loginHandler = (e) => {
        e.preventDefault();
        if (email && password) {

            setLoading(true)
            dispatch({ type: "IS_LOADING", payload: true })
            const token = getCookie('token')
            const userId = getCookie('userId')
            const userType = getCookie('userType')

            const dataPath = `userId=${userId}&userTypeCode=${userType}`

            const data = {
                email: email,
                password: password
                // password: "admin@3embed",
                // email: "akash@appscrip.co"
            }

            service.loginUserApi(data, token)
                .then(res => {
                    let result = res.data;
                    console.log(res.data);
                    if (email && password) {
                        setCookie('token', result.token)
                        setCookie('refreshToken', result.refreshToken)
                        setCookie('userId', result.userId)
                        setCookie('sessionId', result.sessionId)
                        setCookie('username', result.username);
                        setCookie('userType', 2);
                        setCookie('isAuthenticate', true)

                        dispatch({ type: "AUTH", payload: true })
                        dispatch({ type: "IS_LOADING", payload: false })

                        setLoading(false)
                        Route.push('/')
                        Toast('Login Success', 'Success');
                    }
                })
                .then(() => {
                    // setIsSuccessLogin(true)
                    service.getProfileData(dataPath, token)
                        .then((res) => {
                            console.log(res.data.data);
                            const data = res.data.data
                            setCookie('firstName', data.firstName)
                            setCookie('lastName', data.lastName)
                            setCookie('email', data.email)
                            setCookie('userType', data.userType)
                            setCookie('number', data.number)

                            const time = new Data()
                        })
                        .catch((err) => {
                            console.error(err);
                        })
                })
                .catch(err => {
                    setLoading(false)
                    console.error(err)
                    dispatch({ type: "IS_LOADING", payload: false })
                    Toast('Login failed', 'error');


                })
        }
        else {

            Toast('Please fill all the inputs', 'error');
        }
    }


    return (
        <div className='login p-3 d-flex justify-content-center align-items-center'>
            <div className='login__container d-flex'>
                <div className='login__image'>
                    <img src="/images/bg-images/login__image.jpg" />
                </div>
                <div className='form__section  border d-flex flex-column align-items-center'>
                    <h2>Login </h2>
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
                                onClick={loginHandler}
                                disabled={!email || !password}
                                className='login_btn my-2'>
                                {loading ? "Loading..." : "LogIn"}
                            </Button>


                            <div className='other_links text-right'>
                                <Link href='/account/registration'>
                                    <a className='p-0 m-0 mx-1'>create an account</a>
                                </Link>
                            </div>
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
