import React, { useEffect, useState } from 'react'
import Button from '../buttons/index'
import { editProfileData, getProfileData } from '../../services/auth.service';
import { getCookie } from '../../lib/session';
import { useSelector } from 'react-redux';

function Profile(props) {

    const userId = getCookie('userId')
    const userType = getCookie('userType')
    const token = getCookie('token')
    const profile = useSelector(state => state?.profile?.profileData)
    console.log(profile, "data is coming");
    const [edit, setEdit] = useState(false)
    const [firstNameState, setFirstNameState] = useState('')
    const [lastNameState, setLastNameState] = useState('')
    const [emailState, setEmailState] = useState('')
    const [roleState, setRoleState] = useState('')
    const [mobileState, setMobileState] = useState('')

    const data = `userId=${userId}&userTypeCode=${userType}`

    const handleEditProfile = () => {
        setEdit(true)
    }

    const handleSaveProfile = () => {
        setEdit(false)
        const data = `userId=${userId}&userTypeCode=${userType}`
        console.log(data, 'edit click');

        const bodyData = {
            userId: "60893fd76d56eedc75b5a200",
            userType: "user",
            userTypeCode: 2,
            firstName: firstName,
            middleName: "",
            lastName: lastName,
            phoneNumber: mobile,
            profilePic: ""
        }

        editProfileData(data, bodyData, token)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const handleFirstName = (event) => {
        setFirstNameState(event.target.value)
    }

    const handleLastName = (event) => {
        setLastNameState(event.target.value)
    }

    const handleEmail = (event) => {
        setEmailState(event.target.value)
    }

    const handleMobile = (event) => {
        setMobileState(event.target.value)
    }


    useEffect(() => {
        setFirstNameState(profile.firstName)
        setLastNameState(profile.lastName)
        setEmailState(profile.email)
        setRoleState(profile.role)
        setMobileState(profile.mobile || "not added")
        // console.log(token, data, "token");
        // getProfileData(data, token)
        //     .then((res) => {
        //         console.log(res.data.data);
        //         const data = res.data.data
        // setFirstName(data.firstName)
        // setLastName(data.lastName)
        // setEmail(data.email)
        // setRole(data.userType)
        // setMobile(data.number || "not added")

        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     })
    }, [profile, edit])

    return (
        <div className='d-flex justify-content-center profile__page__section'>
            <div className='profile__img__container d-flex flex-column justify-content-center '>
                <h3>Profile</h3>
                <div className='profile__img__box'>
                    <figure className='profile__img'>
                        {/* <img src='https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg' /> */}
                        <img src='/img/home.png' />
                    </figure>
                    <div className='introduction__section d-flex flex-column'>
                        <div className='introduction__box d-flex'>
                            <p className='p-0 m-0 mr-1'>Name:</p>
                            <span>{firstNameState} {lastNameState}</span>
                        </div>
                        <div className='introduction__box d-flex'>
                            <p className='p-0 m-0 mr-1'>Role:</p>
                            <span>{roleState}</span>
                        </div>
                        <div className='introduction__box d-flex'>
                            <p className='p-0 m-0 mr-1'>Mobile:</p>
                            <span>{mobileState}</span>
                        </div>
                        <div className='introduction__box d-flex'>
                            <p className='p-0 m-0 mr-1'>Email:</p>
                            <span>{emailState}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile__page__body p-4'>
                <div className='profile__section'>
                    <div className='text-right'>
                        {
                            !edit
                                ? <Button className='mr-3' onClick={handleEditProfile} children="Edit" />
                                : <Button className='mr-3' onClick={handleSaveProfile} children="Save" />
                        }
                    </div>

                    <div className='profile__section__box d-flex align-items-center justify-content-between my-5'>
                        <div className='profile__box'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <p className='p-0 m-0'>FirstName</p>
                                {
                                    edit
                                        ? <input type="text" onChange={handleFirstName} value={firstNameState} />
                                        : <span>{firstNameState}</span>
                                }
                            </div>
                        </div>
                        <div className='profile__box'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <p className='p-0 m-0'>LastName</p>
                                {
                                    edit
                                        ? <input type="text" onChange={handleLastName} value={lastNameState} />
                                        : <span>{lastNameState}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='profile__section__box d-flex align-items-center justify-content-between my-5'>
                        <div className='profile__box'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <p className='p-0 m-0'>Role</p>
                                <span>{roleState}</span>
                                {/* {
                                edit
                                ? <input type="text" value={role} />
                                : <span>{role}</span>
                            } */}
                            </div>
                        </div>
                        <div className='profile__box'>
                            <div className=' d-flex align-items-center justify-content-between'>
                                <p className='p-0 m-0'>Mobile</p>
                                {
                                    edit
                                        ? <input type="text" onChange={handleMobile} value={mobileState} />
                                        : <span>{mobileState}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='profile__section__box my-5'>
                        <div className='d-flex align-items-center justify-content-between' style={{ width: '405px' }}>
                            <p className='p-0 m-0'>Email</p>
                            <span>{emailState}</span>
                            {/* {
                            edit
                            ? <input type="text" onChange={handleEmail} value={email} />
                            : <span>{email}</span>
                    } */}
                        </div>
                        {/* <div className=' d-flex align-items-center justify-content-between'>
                </div> */}
                    </div>
                    <hr />
                    <div className='about__container'>
                        <h2>About</h2>
                        <p>Bhagat Singh, (born September 27, 1907, Lyallpur, western Punjab, India [now in Pakistan]—died March 23, 1931, Lahore [now in Pakistan]), revolutionary hero of the Indian independence movement.</p>
                        <p>Bhagat Singh attended Dayanand Anglo Vedic High School, which was operated by Arya Samaj (a reform sect of modern Hinduism), and then National College, both located in Lahore. He began to protest British rule in India while still a youth and soon fought for national independence. He also worked as a writer and editor in Amritsar for Punjabi- and Urdu-language newspapers espousing Marxist theories.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
