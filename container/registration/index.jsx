import React, { useState } from 'react'
import TextField from '../../components/input/index';
import Button from '../../components/buttons/index'
// import CustomCheckbox from '../../components/checkbox';
import RegisterScreen1 from './inputs/register_screen_1';
import RegisterScreen2 from './inputs/register_screen_2';
import RegisterScreen3 from './inputs/register_screen_3';
import { nameValidator, emailValidator, passwordValidator, basicMobNumValidator } from '../../lib/config';
import Link from 'next/link';
import { getCookie } from '../../lib/session';
import { registerUserApi, isEmailExist } from '../../services/auth.service';
import Route from 'next/router'
import { setCookie } from '../../lib/session';
import { useDispatch } from 'react-redux';
import { Toast } from '../../lib/global';
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import { getCountryCallingCode } from 'react-phone-number-input'
import { isPossiblePhoneNumber } from 'react-phone-number-input'

function SignUp() {

    const [count, setCount] = useState(0)
    const [showButton, setShowButton] = useState(false)
    const [showSecondButton, setShowSecondButton] = useState(false)
    // const [showBackButton, setShowBackButton] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [firstNameValidate, setFirstNameValidate] = useState(null)
    const [lastName, setLastName] = useState('')
    const [LastNameValidate, setLastNameValidate] = useState(null)
    const [email, setEmail] = useState('')
    const [emailValidate, setEmailValidate] = useState(null)
    const [emailChecked, setEmailChecked] = useState(null)
    const [emailChecking, setEmailChecking] = useState(null)
    const [emailExist, setEmailExist] = useState(null)
    const [mobile, setMobile] = useState('')
    const [mobileValidate, setMobileValidate] = useState(true)
    const [password, setPassword] = useState('')
    const [passwordValidate, setPasswordValidate] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordValidate, setConfirmPasswordValidate] = useState(null)
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    const token = getCookie('token')


    const handleNextButton = () => {
        if ((!firstName == " " || !firstName == undefined) && (!lastName == ' ' || lastName != undefined)) {
            if (firstNameValidate && LastNameValidate) {
                setCount(prevCount => prevCount + 1)
                setShowSecondButton(true)
                console.log(showSecondButton, "ShowSecondButton");
            }
        }
        else {
            Toast('Please fill all the inputs', 'error');
        }
    }

    const handleSecondNextButton = () => {
        if ((!email == " " || !email == undefined) && (!password == ' ' || password != undefined) && (!confirmPassword == " ")) {
            if (emailValidate && passwordValidate) {
                if (emailExist) {
                    setCount(prevCount => prevCount + 1)
                    setShowButton(true)
                }
                else {
                    Toast('Try with different email', 'error');
                }
            }
        }
        else {
            Toast('Please fill all the inputs', 'error');
        }
    }

    const decrementCountHandler = () => {
        setCount(prevCount => prevCount - 1)
        setShowButton(false)
    }

    const decrementSecondCountHandler = () => {
        setCount(prevCount => prevCount - 1)
        setShowSecondButton(false)
    }

    const validateFirstName = (event) => {
        console.log(typeof event.target.value);
        if (nameValidator(event.target.value)) {
            setFirstNameValidate(true)
        } else {
            setFirstNameValidate(false)
        }
    }

    const validateLastName = (event) => {
        if (nameValidator(event.target.value)) {
            setLastNameValidate(true)
        } else {
            setLastNameValidate(false)
        }
    }

    const validateEmail = (event) => {
        if (emailValidator(event.target.value)) {
            setEmailValidate(true)
        } else {
            setEmailValidate(false)
        }
    }

    const validatePassword = (event) => {
        if (passwordValidator(event.target.value)) {
            setPasswordValidate(true)
        } else {
            setPasswordValidate(false)
        }
    }

    const validateConfirmPassword = () => {
        if (password == confirmPassword) {
            setConfirmPasswordValidate(true)
        }
        else {
            setConfirmPasswordValidate(false)
        }
    }

    const validateMobile = (event) => {
        if (basicMobNumValidator(event)) {
            setMobileValidate(true)
            console.log('true mobile');
        } else {
            setMobileValidate(false)
            console.log('false mobile');
        }
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
        validateFirstName(event)
    }


    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
        validateLastName(event)
    }

    const handleEmailChange = (event) => {
        if (event.target.value != ' ' || event.target.value != undefined) {
            console.log('ja rha hai');
            setEmail(event.target.value)
            validateEmail(event)
        }
    }

    const checkEmailExistance = (event) => {
        if (email != '') {
            setEmailChecking(true)
            isEmailExist(email, token)
                .then((res) => {
                    setEmailChecked(true)
                    setEmailExist(true)
                    setEmailChecking(false)
                    console.log(res, "validate");
                })
                .catch((err) => {
                    setEmailChecked(false)
                    setEmailExist(false)
                    setEmailChecking(false)
                    console.error(err, "error");
                })
        }
    }


    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
        validatePassword(event)
    }


    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
        // validateConfirmPassword(event)
    }


    const handleMobileChange = (event) => {
        if (event != undefined) {
            const isMobilevalid = isPossiblePhoneNumber(event)
            if ((mobile != '' || mobile != undefined) && isMobilevalid) {
                setMobile(event)
                setMobileValidate(true)
                console.log(mobile, "mobile");
            }
            else {
                setMobileValidate(false)
            }
        }
    }


    const registerHandler = (e) => {
        e.preventDefault()
        console.log('clicked');

        const token = getCookie('token')
        setLoading(true)
        dispatch({ type: "IS_LOADING", payload: true })

        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phoneNumber: mobile || '',
            role: 'user'
        }

        registerUserApi(data, token)
            .then(res => {
                console.log(res)
                setCookie()

                if (email && password) {
                    setCookie('firstName', data.firstName)
                    setCookie('lastName', data.lastName)
                    setCookie('email', data.email)
                    setCookie('password', data.password);
                    setCookie('phoneNumber', data.phoneNumber);

                    dispatch({ type: "AUTH", payload: true })
                    Toast('Registered Successfully', 'Success');
                    setTimeout(() => {
                        Route.push('/account/login')
                        dispatch({ type: "IS_LOADING", payload: false })
                        setLoading(false)
                    }, 500);
                }
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
                dispatch({ type: "IS_LOADING", payload: false })
                // setShowSecondButton(true)
                setShowButton(false)
                Toast('Registration failed', 'error');
            })
    }


    const renderComp = (count) => {
        switch (count) {
            case 0:
                return <RegisterScreen1
                    fName={firstName}
                    firstNameValidate={firstNameValidate}
                    lName={lastName}
                    LastNameValidate={LastNameValidate}
                    handleFirstName={handleFirstNameChange}
                    handleLastName={handleLastNameChange} />;
            case 1:
                return <RegisterScreen2
                    email={email}
                    emailChecking={emailChecking}
                    emailValidate={emailValidate}
                    emailChecked={emailChecked}
                    checkEmailExistance={checkEmailExistance}
                    password={password}
                    passwordValidate={passwordValidate}
                    confirmPassword={confirmPassword}
                    confirmPasswordValidate={confirmPasswordValidate}
                    handleEmail={handleEmailChange}
                    handlePassword={handlePasswordChange}
                    handleConfirmPassword={handleConfirmPassword}
                    validateConfirmPassword={validateConfirmPassword} />;
            case 2:
                return <RegisterScreen3
                    mobile={mobile}
                    mobileValidate={mobileValidate}
                    handleMobile={handleMobileChange} />;
            default:
                return;
        }
    };

    return (
        <div className='login p-3 d-flex justify-content-center align-items-center'>
            <div className='login__container d-flex'>
                <div className='login__image'>
                    <img src="/images/bg-images/login__image.jpg" />
                </div>
                <div className='form__section d-flex flex-column align-items-center'>
                    {(count != '0')
                        ?
                        (count == '1')
                            ? <i className="fa fa-arrow-left back__arrow" onClick={decrementSecondCountHandler} aria-hidden="true"></i>
                            : <i className="fa fa-arrow-left back__arrow" onClick={decrementCountHandler} aria-hidden="true"></i>
                        : <></>
                    }
                    <h2>Register</h2>
                    <div className='other_links text-right d-flex'>
                        <p className='p-0 m-0 mx-1'>already have an acount</p>
                        <Link href='/account/login'>
                            <a className=''>login</a>
                        </Link>
                    </div>
                    <form className='form'>
                        {renderComp(count)}
                    </form>

                    {!showButton
                        ?
                        !showSecondButton
                            ? <Button
                                type='submit'
                                onClick={handleNextButton}
                                className='register__btn button'>
                                Next
                            </Button>
                            : <Button
                                type='submit'
                                onClick={handleSecondNextButton}
                                className='register__btn button'>
                                Next
                            </Button>
                        : <Button
                            type='submit'
                            onClick={registerHandler}
                            className='register__btn button'>
                            Register
                        </Button>}
                </div>
            </div>
        </div>
    )
}

export default SignUp;

